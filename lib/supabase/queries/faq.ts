import { createClient } from "@/lib/supabase/server";

export interface FAQItem {
  question: string;
  answer: string;
}

export async function fetchFAQ(): Promise<FAQItem[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("value")
      .eq("section_key", "faq")
      .eq("content_type", "json")
      .single();

    if (error || !data) return null;

    return JSON.parse(data.value) as FAQItem[];
  } catch (err) {
    console.error("FAQ query error:", err);
    return null;
  }
}
