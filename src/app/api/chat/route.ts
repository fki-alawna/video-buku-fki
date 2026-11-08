import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Format pesan tidak valid' },
        { status: 400 }
      );
    }

    const rawApiKey = process.env.CLOUVIA_API_KEY || '';
    const apiKey = rawApiKey
      .replace(/['"]/g, '')
      .replace(/^Bearer\s+/i, '')
      .trim();

    if (!apiKey) {
      console.error('Chat API Error: CLOUVIA_API_KEY is not defined in environment variables.');
      return NextResponse.json(
        { error: 'CLOUVIA_API_KEY belum dikonfigurasi' },
        { status: 500 }
      );
    }

    const endpoint = 'https://router.clouvia.id/v1/chat/completions';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-4.1-flash-1017',
        messages: [
          {
            role: 'system',
            content:
              "Anda adalah A'lawna Intelligent, asisten AI ramah, islami, dan sopan untuk keluarga besar A'lawna. Bantu pengguna dengan ramah, penuh adab, dan doa-doa kebaikan.",
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Clouvia API returned error (${response.status}):`, errorText);
      return NextResponse.json(
        { error: `Clouvia API error (${response.status})`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Chat API Route Error:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
