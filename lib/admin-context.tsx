"use client";

import { createContext, useContext } from "react";

type AdminRole = "admin" | "editor";

const AdminRoleContext = createContext<AdminRole>("editor");

export function AdminRoleProvider({
  role,
  children,
}: {
  role: AdminRole;
  children: React.ReactNode;
}) {
  return (
    <AdminRoleContext.Provider value={role}>
      {children}
    </AdminRoleContext.Provider>
  );
}

export function useAdminRole() {
  return useContext(AdminRoleContext);
}
