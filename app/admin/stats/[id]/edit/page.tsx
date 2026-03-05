"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Stat } from "@/lib/supabase/types";

export default function EditStatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [form, setForm] = useState({
    stat_key: "",
    label: "",
    value: 0,
    prefix: "",
    suffix: "",
    display_order: 0,
  });

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("stats")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Stat not found");
        setLoading(false);
        return;
      }

      const s = data as Stat;
      setForm({
        stat_key: s.stat_key,
        label: s.label,
        value: s.value,
        prefix: s.prefix ?? "",
        suffix: s.suffix ?? "",
        display_order: s.display_order,
      });
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("stats")
      .update({
        stat_key: form.stat_key,
        label: form.label,
        value: form.value,
        prefix: form.prefix || null,
        suffix: form.suffix || null,
        display_order: form.display_order,
      })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/stats");
  }

  async function handleDelete() {
    setSaving(true);
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("stats").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      setSaving(false);
      return;
    }
    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/stats");
  }

  if (loading) {
    return <p className="text-text-muted">Loading...</p>;
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
          Edit Stat
        </h2>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-sm text-red-400 hover:text-red-300"
        >
          Delete Stat
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
          <label className="block text-sm font-medium text-text-muted mb-2">Stat Key *</label>
          <input
            type="text"
            required
            value={form.stat_key}
            onChange={(e) => setForm({ ...form, stat_key: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Label *</label>
          <input
            type="text"
            required
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Value *</label>
          <input
            type="number"
            required
            value={form.value}
            onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Prefix</label>
          <input
            type="text"
            value={form.prefix}
            onChange={(e) => setForm({ ...form, prefix: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Suffix</label>
          <input
            type="text"
            value={form.suffix}
            onChange={(e) => setForm({ ...form, suffix: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Display Order</label>
          <input
            type="number"
            value={form.display_order}
            onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
          />
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
