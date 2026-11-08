import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { isAllowedAdminEmail } from '@/lib/auth-config';

function copyCookiesAndHeaders(source: NextResponse, target: NextResponse) {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie);
  });
  source.headers.forEach((value, key) => {
    if (
      key.toLowerCase() === 'cache-control' ||
      key.toLowerCase() === 'expires' ||
      key.toLowerCase() === 'pragma'
    ) {
      target.headers.set(key, value);
    }
  });
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;
  const isLoginRoute =
    pathname === '/admin/login' || pathname.startsWith('/admin/login/');
  const isProtectedAdminRoute =
    pathname.startsWith('/admin') && !isLoginRoute;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (isProtectedAdminRoute) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.search = '?error=config';
      return NextResponse.redirect(loginUrl);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
        Object.entries(headers).forEach(([key, value]) => {
          supabaseResponse.headers.set(key, value);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isProtectedAdminRoute) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      loginUrl.search = '';
      const redirectResponse = NextResponse.redirect(loginUrl);
      copyCookiesAndHeaders(supabaseResponse, redirectResponse);
      redirectResponse.headers.set('Cache-Control', 'private, no-store');
      return redirectResponse;
    }

    if (!isAllowedAdminEmail(user.email)) {
      await supabase.auth.signOut();
      const forbiddenUrl = request.nextUrl.clone();
      forbiddenUrl.pathname = '/admin/login';
      forbiddenUrl.search = '?error=forbidden';
      const redirectResponse = NextResponse.redirect(forbiddenUrl);
      copyCookiesAndHeaders(supabaseResponse, redirectResponse);
      redirectResponse.headers.set('Cache-Control', 'private, no-store');
      return redirectResponse;
    }

    supabaseResponse.headers.set('Cache-Control', 'private, no-store');
    return supabaseResponse;
  }

  if (isLoginRoute && user && !isAllowedAdminEmail(user.email)) {
    await supabase.auth.signOut();
    supabaseResponse.headers.set('Cache-Control', 'private, no-store');
  }

  return supabaseResponse;
}
