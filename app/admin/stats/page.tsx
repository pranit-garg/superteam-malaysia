import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Stat } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const supabase = await createClient();
  const { data: stats, error } = await supabase
    .from("stats")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return <p className="text-red-400">Failed to load stats: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
          Stats
        </h2>
        <Link
          href="/admin/stats/new"
          className="px-4 py-2 bg-primary text-bg text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Add Stat
        </Link>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left text-text-muted">
                <th className="px-4 py-3 font-medium">Label</th>
                <th className="px-4 py-3 font-medium">Value</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Key</th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {(stats as Stat[]).map((stat) => (
                <tr key={stat.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <span className="text-text font-medium">{stat.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-text">
                      {stat.prefix ?? ""}{stat.value}{stat.suffix ?? ""}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted hidden md:table-cell">
                    <span className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold">
                      {stat.stat_key}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {stat.display_order}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/stats/${stat.id}/edit`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {(stats as Stat[]).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-text-muted">
                    No stats yet. Click &quot;Add Stat&quot; to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
