import { NextResponse } from "next/server";
import { fetchLumaEvents } from "@/lib/luma/client";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const lumaEvents = await fetchLumaEvents();
    const supabase = createAdminClient();

    for (const event of lumaEvents) {
      const { error } = await supabase.from("events").upsert(
        {
          luma_id: event.api_id,
          title: event.name,
          description: event.description,
          cover_url: event.cover_url,
          start_at: event.start_at,
          end_at: event.end_at,
          timezone: event.timezone,
          location_name: event.geo_address_json?.city ?? null,
          location_address: event.geo_address_json?.full_address ?? null,
          meeting_url: event.meeting_url,
          luma_url: event.url,
          event_type: event.event_type,
          status: "published" as const,
          synced_at: new Date().toISOString(),
        },
        { onConflict: "luma_id" }
      );

      if (error) {
        console.error(`Failed to upsert event ${event.api_id}:`, error);
      }
    }

    return NextResponse.json({ synced: lumaEvents.length });
  } catch (err) {
    console.error("Luma sync failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Sync failed" },
      { status: 500 }
    );
  }
}
