import { createClient } from "@/lib/supabase/server";
import type { Partner } from "@/lib/supabase/types";

export async function fetchPartners(): Promise<Partner[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("status", "published")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch partners:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Partners query error:", err);
    return null;
  }
}
