import AdminShell from '@/components/AdminShell';
import { requireAdminUser } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdminUser();

  return (
    <AdminShell userEmail={user.email ?? ''}>{children}</AdminShell>
  );
}
