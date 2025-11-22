// app/admin/layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import { isAdminEmail } from "@/lib/admin";

export const metadata = {
  title: "Admin – 4Dogs",
};

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Require a logged-in user
  const user = await stackServerApp.getUser({ or: "redirect" });

  // Check if their email is in ADMIN_EMAILS
  if (!isAdminEmail(user.primaryEmail)) {
    redirect("/"); // or "/not-authorized"
  }

  return <main>{children}</main>;
}
