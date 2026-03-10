"use client";

import { useAdminRole } from "@/lib/admin-context";

export default function DeleteButton({
  onDelete,
  label = "Delete",
}: {
  onDelete: () => void;
  label?: string;
}) {
  const role = useAdminRole();

  if (role !== "admin") {
    return null;
  }

  return (
    <button
      onClick={onDelete}
      className="px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
    >
      {label}
    </button>
  );
}
