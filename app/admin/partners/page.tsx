import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Partner } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const supabase = await createClient();
  const { data: partners, error } = await supabase
    .from("partners")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return <p className="text-red-400">Failed to load partners: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
          Partners
        </h2>
        <Link
          href="/admin/partners/new"
          className="px-4 py-2 bg-primary text-bg text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Add Partner
        </Link>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left text-text-muted">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Website</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {(partners as Partner[]).map((partner) => (
                <tr key={partner.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {partner.logo_url ? (
                        <img
                          src={partner.logo_url}
                          alt={partner.name}
                          className="w-8 h-8 rounded object-contain bg-white/10 p-1"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-text-muted text-xs">
                          {partner.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-text font-medium">{partner.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-gold/10 text-gold">
                      {partner.partner_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted hidden md:table-cell">
                    {partner.website_url ? (
                      <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {new URL(partner.website_url).hostname}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        partner.status === "published"
                          ? "bg-primary/10 text-primary"
                          : "bg-white/5 text-text-muted"
                      }`}
                    >
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/partners/${partner.id}/edit`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {(partners as Partner[]).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-text-muted">
                    No partners yet. Click "Add Partner" to get started.
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
