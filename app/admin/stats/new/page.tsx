"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewStatPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    stat_key: "",
    label: "",
    value: 0,
    prefix: "",
    suffix: "",
    display_order: 0,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("stats").insert({
      stat_key: form.stat_key,
      label: form.label,
      value: form.value,
      prefix: form.prefix || null,
      suffix: form.suffix || null,
      display_order: form.display_order,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/stats");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)] mb-6">
        Add Stat
      </h2>

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
            placeholder="e.g. total_members"
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
            placeholder="e.g. Total Members"
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
            placeholder="e.g. $"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-muted mb-2">Suffix</label>
          <input
            type="text"
            value={form.suffix}
            onChange={(e) => setForm({ ...form, suffix: e.target.value })}
            className="w-full px-4 py-2.5 bg-bg border border-card-border rounded-lg text-text focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g. +"
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
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-bg font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Create Stat"}
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
