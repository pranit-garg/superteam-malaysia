export interface LumaEvent {
  api_id: string;
  name: string;
  description: string | null;
  cover_url: string | null;
  start_at: string;
  end_at: string | null;
  timezone: string;
  geo_address_json: { city?: string; full_address?: string } | null;
  meeting_url: string | null;
  url: string;
  event_type: string;
}

export interface LumaResponse {
  entries: { api_id: string; event: LumaEvent }[];
  next_cursor: string | null;
}
