import type { LumaEvent, LumaResponse } from "./types";

const LUMA_API_URL =
  "https://api.lu.ma/public/v2/event/get-events-hosting";

export async function fetchLumaEvents(): Promise<LumaEvent[]> {
  const apiKey = process.env.LUMA_API_KEY;
  if (!apiKey) throw new Error("LUMA_API_KEY is not set");

  const allEvents: LumaEvent[] = [];
  let cursor: string | null = null;

  do {
    const url = new URL(LUMA_API_URL);
    if (cursor) url.searchParams.set("pagination_cursor", cursor);

    const res = await fetch(url.toString(), {
      headers: { "x-luma-api-key": apiKey },
    });

    if (!res.ok) {
      throw new Error(`Luma API error: ${res.status} ${res.statusText}`);
    }

    const data: LumaResponse = await res.json();

    for (const entry of data.entries) {
      allEvents.push(entry.event);
    }

    cursor = data.next_cursor;
  } while (cursor);

  return allEvents;
}
