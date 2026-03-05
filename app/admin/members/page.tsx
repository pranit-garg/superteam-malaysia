import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Member } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const supabase = await createClient();
  const { data: members, error } = await supabase
    .from("members")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    return <p className="text-red-400">Failed to load members: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
          Members
        </h2>
        <Link
          href="/admin/members/new"
          className="px-4 py-2 bg-primary text-bg text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Add Member
        </Link>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left text-text-muted">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Skills</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {(members as Member[]).map((member) => (
                <tr key={member.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {member.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-text-muted text-xs">
                          {member.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-text font-medium">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{member.title ?? "-"}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(member.skills ?? []).slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {(member.skills ?? []).length > 3 && (
                        <span className="text-xs text-text-muted">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        member.status === "published"
                          ? "bg-primary/10 text-primary"
                          : "bg-white/5 text-text-muted"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/members/${member.id}/edit`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {(members as Member[]).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-text-muted">
                    No members yet. Click "Add Member" to get started.
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
