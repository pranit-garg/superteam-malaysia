import { createClient } from "@/lib/supabase/server";

export async function fetchPageContent<T>(sectionKey: string): Promise<T | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("value")
      .eq("section_key", sectionKey)
      .eq("content_type", "json")
      .single();

    if (error || !data) {
      return null;
    }

    return JSON.parse(data.value) as T;
  } catch {
    return null;
  }
}
