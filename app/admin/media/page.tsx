"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface MediaFile {
  name: string;
  id: string;
  created_at: string;
  metadata: { size?: number; mimetype?: string } | null;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    const supabase = createClient();
    const { data, error } = await supabase.storage.from("media").list("uploads", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
      setError(error.message);
    } else {
      setFiles((data ?? []) as MediaFile[]);
    }
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList?.length) return;

    setUploading(true);
    setError(null);

    const supabase = createClient();

    for (const file of Array.from(fileList)) {
      const ext = file.name.split(".").pop();
      const path = `uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

      const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
      if (uploadError) {
        setError(`Failed to upload ${file.name}: ${uploadError.message}`);
        break;
      }
    }

    setUploading(false);
    await loadFiles();
    e.target.value = "";
  }

  function getPublicUrl(name: string) {
    const supabase = createClient();
    const { data } = supabase.storage.from("media").getPublicUrl(`uploads/${name}`);
    return data.publicUrl;
  }

  async function handleDelete(name: string) {
    if (!confirm(`Delete ${name}?`)) return;

    const supabase = createClient();
    const { error } = await supabase.storage.from("media").remove([`uploads/${name}`]);
    if (error) {
      setError(error.message);
      return;
    }
    setFiles((prev) => prev.filter((f) => f.name !== name));
  }

  function copyUrl(name: string) {
    const url = getPublicUrl(name);
    navigator.clipboard.writeText(url);
  }

  function formatSize(bytes?: number) {
    if (!bytes) return "-";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (loading) {
    return <p className="text-text-muted">Loading media...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text font-[family-name:var(--font-display)]">
          Media Library
        </h2>
        <label className="px-4 py-2 bg-primary text-bg text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
          {uploading ? "Uploading..." : "Upload Files"}
          <input
            type="file"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {files.length === 0 ? (
        <div className="bg-card border border-card-border rounded-xl p-12 text-center">
          <p className="text-text-muted">No files uploaded yet.</p>
          <p className="text-text-muted text-sm mt-1">Click "Upload Files" to add media.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file) => {
            const isImage = file.metadata?.mimetype?.startsWith("image/") ?? file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
            const url = getPublicUrl(file.name);

            return (
              <div
                key={file.id}
                className="bg-card border border-card-border rounded-xl overflow-hidden group"
              >
                <div className="aspect-square bg-white/[0.02] flex items-center justify-center">
                  {isImage ? (
                    <img
                      src={url}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs text-text truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-text-muted">
                    {formatSize(file.metadata?.size)}
                  </p>
                  <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => copyUrl(file.name)}
                      className="text-[10px] px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20"
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(file.name)}
                      className="text-[10px] px-2 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
