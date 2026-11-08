const FALLBACK_ADMIN_EMAIL = 'fkialawna@gmail.com';

export function getAdminEmail(): string {
  return (process.env.ADMIN_EMAIL || FALLBACK_ADMIN_EMAIL).trim().toLowerCase();
}

export function isAllowedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === getAdminEmail();
}
