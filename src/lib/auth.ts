import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function isAuthenticated() {
  const cookieStore = cookies();
  return cookieStore.get("admin_auth")?.value === "true";
}

export function requireAuth() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }
}