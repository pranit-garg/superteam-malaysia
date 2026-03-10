import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/supabase/types";

export async function fetchTestimonials(): Promise<Testimonial[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("status", "published")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch testimonials:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Testimonials query error:", err);
    return null;
  }
}
