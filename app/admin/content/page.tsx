"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PageContent } from "@/lib/supabase/types";

export default function ContentPage() {
  const [entries, setEntries] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("*")
      .order("section_key", { ascending: true });

    if (error) {
      setError(error.message);
    } else {
      setEntries((data ?? []) as PageContent[]);
    }
    setLoading(false);
  }

  function startEdit(entry: PageContent) {
    setEditingId(entry.id);
    setEditValue(entry.value);
  }

  async function saveEdit(id: string) {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("page_content")
      .update({ value: editValue })
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, value: editValue } : e))
      );
      setEditingId(null);
      await fetch("/api/revalidate", { method: "POST" });
    }
    setSaving(false);
  }

  if (loading) {
    return <p className="text-text-muted">Loading content...</p>;
  }

  const grouped = entries.reduce<Record<string, PageContent[]>>((acc, entry) => {
    const section = entry.section_key.split(".")[0] || "general";
    if (!acc[section]) acc[section] = [];
    acc[section].push(entry);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
        Page Content
      </h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {entries.length === 0 ? (
        <div className="bg-card border border-card-border rounded-xl p-8 text-center text-text-muted">
          No content entries yet. Add them via the database.
        </div>
      ) : (
        Object.entries(grouped).map(([section, items]) => (
          <div key={section} className="bg-card border border-card-border rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-white/[0.02] border-b border-card-border">
              <h3 className="text-sm font-semibold text-text uppercase tracking-wider">
                {section}
              </h3>
            </div>
            <div className="divide-y divide-card-border">
              {items.map((entry) => (
                <div key={entry.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-muted mb-1 font-mono">
                        {entry.section_key}
                        <span className="ml-2 text-secondary">{entry.content_type}</span>
                      </p>
                      {editingId === entry.id ? (
                        <div className="space-y-2">
                          {entry.content_type === "text" ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-full px-3 py-2 bg-bg border border-card-border rounded-lg text-text text-sm focus:outline-none focus:border-primary transition-colors"
                            />
                          ) : (
                            <textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              rows={4}
                              className="w-full px-3 py-2 bg-bg border border-card-border rounded-lg text-text text-sm focus:outline-none focus:border-primary transition-colors resize-none font-mono"
                            />
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveEdit(entry.id)}
                              disabled={saving}
                              className="px-3 py-1.5 bg-primary text-bg text-xs font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50"
                            >
                              {saving ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1.5 border border-card-border text-text-muted text-xs rounded-lg hover:bg-white/5"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-text text-sm break-words">
                          {entry.value.length > 200
                            ? entry.value.slice(0, 200) + "..."
                            : entry.value}
                        </p>
                      )}
                    </div>
                    {editingId !== entry.id && (
                      <button
                        onClick={() => startEdit(entry)}
                        className="text-xs text-primary hover:underline shrink-0"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
