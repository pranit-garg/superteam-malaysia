"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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

export default function NewMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    const sb = getSupabase();
    const { error: uploadError } = await sb.storage
      .from("media")
      .upload(path, file);

    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      return;
    }

    const { data } = sb.storage.from("media").getPublicUrl(path);
    setForm((prev) => ({ ...prev, photo_url: data.publicUrl }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: insertError } = await getSupabase().from("members").insert({
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
      display_order: 0,
      achievements: null,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/members");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)] mb-6">
        Add Member
      </h2>

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
              placeholder="e.g. Lead Developer"
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
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-bg font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Create Member"}
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
