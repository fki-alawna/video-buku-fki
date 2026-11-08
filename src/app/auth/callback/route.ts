import { NextResponse, type NextRequest } from 'next/server';
import { isAllowedAdminEmail } from '@/lib/auth-config';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');

  const forwardedHost = request.headers.get('x-forwarded-host');
  const isLocalEnv = process.env.NODE_ENV === 'development';
  const redirectBase =
    !isLocalEnv && forwardedHost ? `https://${forwardedHost}` : origin;

  if (!code) {
    return NextResponse.redirect(`${redirectBase}/admin/login?error=auth_failed`);
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${redirectBase}/admin/login?error=auth_failed`
      );
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !isAllowedAdminEmail(user.email)) {
      await supabase.auth.signOut();
      return NextResponse.redirect(`${redirectBase}/admin/login?error=forbidden`);
    }

    return NextResponse.redirect(`${redirectBase}/admin`);
  } catch {
    return NextResponse.redirect(`${redirectBase}/admin/login?error=auth_failed`);
  }
}
