"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Event } from "@/lib/supabase/types";

const EVENT_TYPES = ["meetup", "hackathon", "workshop", "conference", "online", "social"];

function toLocalDatetime(iso: string) {
  const d = new Date(iso);
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 16);
}

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    start_at: "",
    end_at: "",
    timezone: "Asia/Kuala_Lumpur",
    location_name: "",
    location_address: "",
    meeting_url: "",
    luma_url: "",
    event_type: "meetup",
    is_featured: false,
    status: "draft" as "draft" | "published",
    cover_url: "",
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Event not found");
        setLoading(false);
        return;
      }

      const e = data as Event;
      setForm({
        title: e.title,
        description: e.description ?? "",
        start_at: toLocalDatetime(e.start_at),
        end_at: e.end_at ? toLocalDatetime(e.end_at) : "",
        timezone: e.timezone,
        location_name: e.location_name ?? "",
        location_address: e.location_address ?? "",
        meeting_url: e.meeting_url ?? "",
        luma_url: e.luma_url ?? "",
        event_type: e.event_type,
        is_featured: e.is_featured,
        status: e.status,
        cover_url: e.cover_url ?? "",
      });
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `events/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setForm((prev) => ({ ...prev, cover_url: data.publicUrl }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("events")
      .update({
        title: form.title,
        description: form.description || null,
        start_at: new Date(form.start_at).toISOString(),
        end_at: form.end_at ? new Date(form.end_at).toISOString() : null,
        timezone: form.timezone,
        location_name: form.location_name || null,
        location_address: form.location_address || null,
        meeting_url: form.meeting_url || null,
        luma_url: form.luma_url || null,
        event_type: form.event_type,
        is_featured: form.is_featured,
        status: form.status,
        cover_url: form.cover_url || null,
      })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/events");
  }

  async function handleDelete() {
    setSaving(true);
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("events").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      setSaving(false);
      return;
    }
    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/events");
  }

  if (loading) {
    return <p className="text-text-muted">Loading...</p>;
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
          Edit Event
        </h2>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Delete Event
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center justify-between">
          <p className="text-red-400 text-sm">Are you sure? This cannot be undone.</p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={saving}
              className="px-4 py-1.5 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 disabled:opacity-50"
            >
              Delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-1.5 border border-card-border text-text-muted text-sm rounded-lg hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Title *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20"
          />
          {form.cover_url && (
            <img src={form.cover_url} alt="Preview" className="w-full max-w-xs rounded-lg mt-3" />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Start Date/Time *</label>
            <input
              type="datetime-local"
              required
              value={form.start_at}
              onChange={(e) => setForm({ ...form, start_at: e.target.value })}
              className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">End Date/Time</label>
            <input
              type="datetime-local"
              value={form.end_at}
              onChange={(e) => setForm({ ...form, end_at: e.target.value })}
              className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Location Name</label>
            <input
              type="text"
              value={form.location_name}
              onChange={(e) => setForm({ ...form, location_name: e.target.value })}
              className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Event Type</label>
            <select
              value={form.event_type}
              onChange={(e) => setForm({ ...form, event_type: e.target.value })}
              className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
            >
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Location Address</label>
          <input
            type="text"
            value={form.location_address}
            onChange={(e) => setForm({ ...form, location_address: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Meeting URL</label>
            <input
              type="url"
              value={form.meeting_url}
              onChange={(e) => setForm({ ...form, meeting_url: e.target.value })}
              className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Luma URL</label>
            <input
              type="url"
              value={form.luma_url}
              onChange={(e) => setForm({ ...form, luma_url: e.target.value })}
              className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
              className="w-4 h-4 rounded border-card-border bg-bg accent-primary"
            />
            <span className="text-sm text-text">Featured</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-bg font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-card-border text-text-muted rounded-lg hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
