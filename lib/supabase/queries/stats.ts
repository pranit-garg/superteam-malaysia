import { createClient } from "@/lib/supabase/server";
import type { Stat } from "@/lib/supabase/types";

export async function fetchStats(): Promise<Stat[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch stats:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Stats query error:", err);
    return null;
  }
}
