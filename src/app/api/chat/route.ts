import { NextResponse } from 'next/server';

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
    const apiKey = rawApiKey.replace(/['"]/g, '').trim();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'CLOUVIA_API_KEY belum dikonfigurasi' },
        { status: 500 }
      );
    }

    const response = await fetch('https://router.clouvia.id/v1/chat/completions', {
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
            content: "Anda adalah A'lawna Intelligent, asisten AI ramah, islami, dan sopan untuk keluarga besar A'lawna.",
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Clouvia API error (${response.status})`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const err = error as Error;
    console.error('Chat API Route Error:', err);
    return NextResponse.json(
      { error: err?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
