"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Member } from "@/lib/supabase/types";

const SKILL_OPTIONS = [
  "Rust", "TypeScript", "Solidity", "Python", "React", "Next.js",
  "Anchor", "DeFi", "NFT", "DAO", "Smart Contracts", "Web3",
  "Design", "Marketing", "Community", "Content", "DevRel",
];

const BADGE_OPTIONS = [
  "Core Team", "Builder", "Designer", "Writer", "Organizer",
  "Mentor", "Speaker", "Ambassador",
];

function getSupabase() {
  return createClient();
}

export default function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    title: "",
    company: "",
    bio: "",
    skills: [] as string[],
    badges: [] as string[],
    is_core_team: false,
    is_featured: false,
    twitter_url: "",
    status: "draft" as "draft" | "published",
    photo_url: "",
  });

  useEffect(() => {
    async function load() {
      const { data, error } = await getSupabase()
        .from("members")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Member not found");
        setLoading(false);
        return;
      }

      const m = data as Member;
      setForm({
        name: m.name,
        title: m.title ?? "",
        company: m.company ?? "",
        bio: m.bio ?? "",
        skills: m.skills ?? [],
        badges: m.badges ?? [],
        is_core_team: m.is_core_team,
        is_featured: m.is_featured,
        twitter_url: m.twitter_url ?? "",
        status: m.status,
        photo_url: m.photo_url ?? "",
      });
      setLoading(false);
    }
    load();
  }, [id]);

  function toggleArrayItem(key: "skills" | "badges", value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop();
    const path = `members/${Date.now()}.${ext}`;

    const { error: uploadError } = await getSupabase().storage
      .from("media")
      .upload(path, file);

    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      return;
    }

    const { data } = getSupabase().storage.from("media").getPublicUrl(path);
    setForm((prev) => ({ ...prev, photo_url: data.publicUrl }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error: updateError } = await getSupabase()
      .from("members")
      .update({
        name: form.name,
        title: form.title || null,
        company: form.company || null,
        bio: form.bio || null,
        skills: form.skills,
        badges: form.badges,
        is_core_team: form.is_core_team,
        is_featured: form.is_featured,
        twitter_url: form.twitter_url || null,
        photo_url: form.photo_url || null,
        status: form.status,
      })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/members");
  }

  async function handleDelete() {
    setSaving(true);
    const { error: deleteError } = await getSupabase().from("members").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      setSaving(false);
      return;
    }
    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/members");
  }

  if (loading) {
    return <p className="text-text-muted">Loading...</p>;
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
          Edit Member
        </h2>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Delete Member
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Company</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20"
          />
          {form.photo_url && (
            <img src={form.photo_url} alt="Preview" className="w-16 h-16 rounded-full object-cover mt-3" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Skills</label>
          <div className="flex flex-wrap gap-2">
            {SKILL_OPTIONS.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleArrayItem("skills", skill)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  form.skills.includes(skill)
                    ? "bg-primary/20 border-primary/40 text-primary"
                    : "border-card-border text-text-muted hover:border-white/20"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Badges</label>
          <div className="flex flex-wrap gap-2">
            {BADGE_OPTIONS.map((badge) => (
              <button
                key={badge}
                type="button"
                onClick={() => toggleArrayItem("badges", badge)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  form.badges.includes(badge)
                    ? "bg-secondary/20 border-secondary/40 text-secondary"
                    : "border-card-border text-text-muted hover:border-white/20"
                }`}
              >
                {badge}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Twitter URL</label>
          <input
            type="url"
            value={form.twitter_url}
            onChange={(e) => setForm({ ...form, twitter_url: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
            placeholder="https://x.com/username"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_core_team}
              onChange={(e) => setForm({ ...form, is_core_team: e.target.checked })}
              className="w-4 h-4 rounded border-card-border bg-bg accent-primary"
            />
            <span className="text-sm text-text">Core Team</span>
          </label>
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
