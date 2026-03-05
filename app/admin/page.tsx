import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [members, events, partners, announcements] = await Promise.all([
    supabase.from("members").select("id", { count: "exact", head: true }),
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("partners").select("id", { count: "exact", head: true }),
    supabase.from("announcements").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Members", count: members.count ?? 0, href: "/admin/members", color: "text-primary" },
    { label: "Events", count: events.count ?? 0, href: "/admin/events", color: "text-secondary" },
    { label: "Partners", count: partners.count ?? 0, href: "/admin/partners", color: "text-gold" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-card border border-card-border rounded-xl p-6 hover:border-white/20 transition-colors"
          >
            <p className="text-text-muted text-sm">{stat.label}</p>
            <p className={`text-4xl font-bold mt-2 ${stat.color} font-[family-name:var(--font-display)]`}>
              {stat.count}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Announcements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
            Recent Announcements
          </h2>
          <Link href="/admin/announcements" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="bg-card border border-card-border rounded-xl divide-y divide-card-border">
          {(announcements.data ?? []).length === 0 ? (
            <p className="p-6 text-text-muted text-sm">No announcements yet.</p>
          ) : (
            (announcements.data ?? []).map((a) => (
              <div key={a.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-text font-medium">{a.title}</p>
                  <p className="text-text-muted text-xs mt-1">
                    {new Date(a.created_at).toLocaleDateString()}
                    {a.is_pinned && (
                      <span className="ml-2 text-gold">Pinned</span>
                    )}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    a.status === "published"
                      ? "bg-primary/10 text-primary"
                      : "bg-white/5 text-text-muted"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
