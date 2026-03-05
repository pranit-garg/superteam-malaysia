"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const PARTNER_TYPES = ["ecosystem", "sponsor", "media", "infrastructure"] as const;

export default function NewPartnerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    website_url: "",
    description: "",
    partner_type: "ecosystem" as (typeof PARTNER_TYPES)[number],
    status: "draft" as "draft" | "published",
    logo_url: "",
  });

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `partners/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setForm((prev) => ({ ...prev, logo_url: data.publicUrl }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("partners").insert({
      name: form.name,
      website_url: form.website_url || null,
      description: form.description || null,
      partner_type: form.partner_type,
      status: form.status,
      logo_url: form.logo_url || null,
      display_order: 0,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/partners");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)] mb-6">
        Add Partner
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

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
          <label className="block text-sm font-medium text-text-muted mb-2">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full text-sm text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-medium hover:file:bg-primary/20"
          />
          {form.logo_url && (
            <img src={form.logo_url} alt="Preview" className="w-16 h-16 rounded object-contain bg-white/10 p-2 mt-3" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Website URL</label>
          <input
            type="url"
            value={form.website_url}
            onChange={(e) => setForm({ ...form, website_url: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Partner Type</label>
          <select
            value={form.partner_type}
            onChange={(e) => setForm({ ...form, partner_type: e.target.value as (typeof PARTNER_TYPES)[number] })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          >
            {PARTNER_TYPES.map((t) => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
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
            {loading ? "Saving..." : "Create Partner"}
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
