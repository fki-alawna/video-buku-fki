import { NextResponse, type NextRequest } from 'next/server';
import QRCode from 'qrcode';
import { createServiceClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

interface QrRouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, context: QrRouteContext) {
  const { slug: rawSlug } = await context.params;
  const slug = rawSlug.endsWith('.png') ? rawSlug.slice(0, -4) : rawSlug;

  if (!slug) {
    return new NextResponse('Slug video tidak valid', { status: 404 });
  }

  const service = createServiceClient();
  const { data, error } = await service
    .from('videos')
    .select('slug')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    return new NextResponse('Gagal memeriksa data video', { status: 500 });
  }

  if (!data) {
    return new NextResponse('Video tidak ditemukan', { status: 404 });
  }

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin
  ).replace(/\/+$/, '');
  const targetUrl = `${siteUrl}/v/${data.slug as string}`;

  const pngBuffer = await QRCode.toBuffer(targetUrl, {
    type: 'png',
    width: 512,
    margin: 2,
  });

  return new NextResponse(new Uint8Array(pngBuffer), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
