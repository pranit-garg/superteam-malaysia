import { createClient } from "@/lib/supabase/server";
import type { Event } from "@/lib/supabase/types";

export async function fetchUpcomingEvents(limit = 6): Promise<Event[] | null> {
  try {
    const supabase = await createClient();
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "published")
      .gte("start_at", now)
      .order("start_at", { ascending: true })
      .limit(limit);

    if (error) {
      console.error("Failed to fetch events:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Events query error:", err);
    return null;
  }
}
