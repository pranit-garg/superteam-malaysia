import { createClient } from "@/lib/supabase/server";
import type { Member } from "@/lib/supabase/types";

export async function fetchAllMembers(): Promise<Member[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("status", "published")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch members:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Members query error:", err);
    return null;
  }
}

export async function fetchFeaturedMembers(): Promise<Member[] | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("status", "published")
      .eq("is_featured", true)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Failed to fetch featured members:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Featured members query error:", err);
    return null;
  }
}
