import { createClient } from "@/lib/supabase/server";
import { AdminRoleProvider } from "@/lib/admin-context";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // No user: render children raw (login page works, other pages won't show data)
  if (!user) {
    return <>{children}</>;
  }

  // Fetch admin profile
  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-2">Not Authorized</h1>
          <p className="text-text-muted">Your account does not have admin access.</p>
        </div>
      </div>
    );
  }

  return (
    <AdminRoleProvider role={profile.role}>
      <AdminSidebar role={profile.role}>
        {children}
      </AdminSidebar>
    </AdminRoleProvider>
  );
}
