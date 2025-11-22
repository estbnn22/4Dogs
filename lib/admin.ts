export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;

  const adminEnv = process.env.ADMIN_EMAILS ?? "";
  const adminList = adminEnv
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return adminList.includes(email.toLowerCase());
}
