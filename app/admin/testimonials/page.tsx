import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Testimonial } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const supabase = await createClient();
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return <p className="text-red-400">Failed to load testimonials: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
          Testimonials
        </h2>
        <Link
          href="/admin/testimonials/new"
          className="px-4 py-2 bg-primary text-bg text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Add Testimonial
        </Link>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left text-text-muted">
                <th className="px-4 py-3 font-medium">Author</th>
                <th className="px-4 py-3 font-medium">Quote</th>
                <th className="px-4 py-3 font-medium">Tweet?</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {(testimonials as Testimonial[]).map((t) => (
                <tr key={t.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {t.author_photo_url ? (
                        <img
                          src={t.author_photo_url}
                          alt={t.author_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-text-muted text-xs">
                          {t.author_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <span className="text-text font-medium">{t.author_name}</span>
                        {t.author_title && (
                          <p className="text-text-muted text-xs">{t.author_title}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-muted max-w-xs truncate">
                    {t.content.length > 80 ? t.content.slice(0, 80) + "..." : t.content}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        t.is_tweet
                          ? "bg-primary/10 text-primary"
                          : "bg-white/5 text-text-muted"
                      }`}
                    >
                      {t.is_tweet ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        t.status === "published"
                          ? "bg-primary/10 text-primary"
                          : "bg-white/5 text-text-muted"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/testimonials/${t.id}/edit`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {(testimonials as Testimonial[]).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-text-muted">
                    No testimonials yet. Click &quot;Add Testimonial&quot; to get started.
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
