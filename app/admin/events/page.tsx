import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import type { Event } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("start_at", { ascending: false });

  if (error) {
    return <p className="text-red-400">Failed to load events: {error.message}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
          Events
        </h2>
        <Link
          href="/admin/events/new"
          className="px-4 py-2 bg-primary text-bg text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
        >
          Add Event
        </Link>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-card-border text-left text-text-muted">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Location</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {(events as Event[]).map((event) => (
                <tr key={event.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-text font-medium">{event.title}</td>
                  <td className="px-4 py-3 text-text-muted">
                    {new Date(event.start_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-text-muted hidden md:table-cell">
                    {event.location_name ?? "Online"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                      {event.event_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        event.status === "published"
                          ? "bg-primary/10 text-primary"
                          : "bg-white/5 text-text-muted"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="text-sm text-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {(events as Event[]).length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                    No events yet. Click "Add Event" to get started.
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
