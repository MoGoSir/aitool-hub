"use client";

import { AdminAuthCheck } from "@/components/AdminAuthCheck";
import AdminSidebar from "./AdminSidebar";

export function AdminPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </AdminAuthCheck>
  );
}