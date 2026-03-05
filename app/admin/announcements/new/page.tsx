"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewAnnouncementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    body: "",
    body_md: "",
    link_url: "",
    is_pinned: false,
    status: "draft" as "draft" | "published",
    image_url: "",
  });

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `announcements/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setForm((prev) => ({ ...prev, image_url: data.publicUrl }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("announcements").insert({
      title: form.title,
      body: form.body || null,
      body_md: form.body_md || null,
      link_url: form.link_url || null,
      is_pinned: form.is_pinned,
      status: form.status,
      image_url: form.image_url || null,
      published_at: form.status === "published" ? new Date().toISOString() : null,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/announcements");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)] mb-6">
        New Announcement
      </h2>

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
          <label className="block text-sm font-medium text-text-muted mb-2">Body (plain text)</label>
          <textarea
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Body (markdown)</label>
          <textarea
            value={form.body_md}
            onChange={(e) => setForm({ ...form, body_md: e.target.value })}
            rows={5}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors resize-none font-mono text-sm"
            placeholder="Supports markdown formatting"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20"
          />
          {form.image_url && (
            <img src={form.image_url} alt="Preview" className="w-full max-w-xs rounded-lg mt-3" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Link URL</label>
          <input
            type="url"
            value={form.link_url}
            onChange={(e) => setForm({ ...form, link_url: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_pinned}
              onChange={(e) => setForm({ ...form, is_pinned: e.target.checked })}
              className="w-4 h-4 rounded border-card-border bg-bg accent-primary"
            />
            <span className="text-sm text-text">Pin this announcement</span>
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
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-bg font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Create Announcement"}
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
