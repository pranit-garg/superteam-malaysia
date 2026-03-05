"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Testimonial } from "@/lib/supabase/types";

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [form, setForm] = useState({
    author_name: "",
    author_title: "",
    content: "",
    tweet_url: "",
    is_tweet: false,
    status: "draft" as "draft" | "published",
    author_photo_url: "",
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Testimonial not found");
        setLoading(false);
        return;
      }

      const t = data as Testimonial;
      setForm({
        author_name: t.author_name,
        author_title: t.author_title ?? "",
        content: t.content,
        tweet_url: t.tweet_url ?? "",
        is_tweet: t.is_tweet,
        status: t.status,
        author_photo_url: t.author_photo_url ?? "",
      });
      setLoading(false);
    }
    load();
  }, [id]);

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `testimonials/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setForm((prev) => ({ ...prev, author_photo_url: data.publicUrl }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("testimonials")
      .update({
        author_name: form.author_name,
        author_title: form.author_title || null,
        content: form.content,
        tweet_url: form.tweet_url || null,
        is_tweet: form.is_tweet,
        status: form.status,
        author_photo_url: form.author_photo_url || null,
      })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/testimonials");
  }

  async function handleDelete() {
    setSaving(true);
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("testimonials").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      setSaving(false);
      return;
    }
    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/testimonials");
  }

  if (loading) {
    return <p className="text-text-muted">Loading...</p>;
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
          Edit Testimonial
        </h2>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Delete Testimonial
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
          <label className="block text-sm font-medium text-text-muted mb-2">Author Name *</label>
          <input
            type="text"
            required
            value={form.author_name}
            onChange={(e) => setForm({ ...form, author_name: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Author Title</label>
          <input
            type="text"
            value={form.author_title}
            onChange={(e) => setForm({ ...form, author_title: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Author Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20"
          />
          {form.author_photo_url && (
            <img src={form.author_photo_url} alt="Preview" className="w-16 h-16 rounded-full object-cover mt-3" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Quote *</label>
          <textarea
            required
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={4}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Tweet URL</label>
          <input
            type="url"
            value={form.tweet_url}
            onChange={(e) => setForm({ ...form, tweet_url: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_tweet"
            checked={form.is_tweet}
            onChange={(e) => setForm({ ...form, is_tweet: e.target.checked })}
            className="w-4 h-4 rounded border-card-border bg-bg text-primary focus:ring-primary"
          />
          <label htmlFor="is_tweet" className="text-sm font-medium text-text-muted">
            This is a tweet
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
