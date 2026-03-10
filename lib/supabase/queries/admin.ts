import { createClient } from "@/lib/supabase/server";
import type { AdminProfile } from "@/lib/supabase/types";

export async function fetchAdminProfile(): Promise<AdminProfile | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from("admin_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Failed to fetch admin profile:", error);
      return null;
    }
    return data;
  } catch (err) {
    console.error("Admin profile query error:", err);
    return null;
  }
}
