import { NextResponse } from 'next/server';
import { ADMIN_TOOLS, executeAdminTool } from '@/lib/chat-tools';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

interface ChatRequestBody {
  messages: Array<{
    role: 'system' | 'user' | 'assistant' | 'tool';
    content: string;
    tool_call_id?: string;
    name?: string;
  }>;
  mode?: 'admin' | 'public';
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const { messages, mode } = body;

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
      console.error('Chat API Error: CLOUVIA_API_KEY is not defined.');
      return NextResponse.json(
        { error: 'CLOUVIA_API_KEY belum dikonfigurasi' },
        { status: 500 }
      );
    }

    const endpoint = 'https://router.clouvia.id/v1/chat/completions';
    const isAdmin = mode === 'admin';

    // Inject tanggal hari ini untuk mempermudah pemahaman konteks waktu ("besok", "lusa", dll)
    const todayFormatted = new Date().toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const todayIso = new Date().toISOString().split('T')[0];

    const adminSystemPrompt = `Anda adalah A'lawna Intelligence, Agen AI Panitia. Hari ini adalah ${todayFormatted} (${todayIso}).
Tugas Anda:
1. Jika panitia meminta laporan data, gunakan fungsi 'get_system_report'.
2. Jika panitia meminta membuat catatan agenda, ekstrak tanggal dan teksnya, lalu gunakan fungsi 'create_calendar_note'.
3. Jawab dengan sopan, santun, dan konfirmasi setiap tindakan yang telah berhasil dilakukan. Jangan gunakan karakter em dash (—), gunakan tanda hubung (-) atau titik dua (:).`;

    const publicSystemPrompt = `Anda adalah A'lawna Intelligence, asisten AI ramah dan islami untuk keluarga besar A'lawna.
ATURAN KETAT:
1. DILARANG BERHALUSINASI: Jangan pernah menebak atau mengarang jawaban jika informasinya tidak ada di dalam konteks.
2. JIKA PERTANYAAN AMBIGU: Anda WAJIB bertanya balik untuk meminta klarifikasi.
3. JIKA TIDAK TAHU: Katakan dengan jujur bahwa Anda tidak memiliki informasi tersebut.
4. GUNAKAN BAHASA: Sopan, santun, dan islami (gunakan sapaan seperti Afwan, Alhamdulillah, Insya Allah). Jangan gunakan karakter em dash (—).`;

    const systemMessage = {
      role: 'system' as const,
      content: isAdmin ? adminSystemPrompt : publicSystemPrompt,
    };

    const initialMessages = [systemMessage, ...messages];

    const requestPayload: Record<string, unknown> = {
      model: 'deepseek-4.1-flash-1017',
      messages: initialMessages,
    };

    if (isAdmin) {
      requestPayload.tools = ADMIN_TOOLS;
      requestPayload.tool_choice = 'auto';
    }

    const firstResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestPayload),
    });

    if (!firstResponse.ok) {
      const errorText = await firstResponse.text();
      console.error(`Clouvia API error (${firstResponse.status}):`, errorText);
      return NextResponse.json(
        { error: `Clouvia API error (${firstResponse.status})`, details: errorText },
        { status: firstResponse.status }
      );
    }

    const firstData = await firstResponse.json();
    const firstChoice = firstData.choices?.[0];
    const assistantMessage = firstChoice?.message;

    // Evaluasi tool_calls jika mode admin
    if (isAdmin && assistantMessage?.tool_calls && assistantMessage.tool_calls.length > 0) {
      const toolCall = assistantMessage.tool_calls[0];
      const functionName = toolCall.function?.name;
      let functionArgs: Record<string, unknown> = {};

      try {
        functionArgs = JSON.parse(toolCall.function?.arguments || '{}');
      } catch {
        functionArgs = {};
      }

      const toolResult = await executeAdminTool(functionName, functionArgs);

      // Kirim hasil tool ke Clouvia untuk sintesis jawaban akhir
      const secondMessages = [
        ...initialMessages,
        assistantMessage,
        {
          role: 'tool' as const,
          name: functionName,
          tool_call_id: toolCall.id,
          content: JSON.stringify(toolResult),
        },
      ];

      const secondResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-4.1-flash-1017',
          messages: secondMessages,
          tools: ADMIN_TOOLS,
        }),
      });

      if (!secondResponse.ok) {
        const errorText = await secondResponse.text();
        console.error(`Clouvia 2nd turn error (${secondResponse.status}):`, errorText);
        return NextResponse.json(
          { error: `Clouvia 2nd turn error (${secondResponse.status})`, details: errorText },
          { status: secondResponse.status }
        );
      }

      const secondData = await secondResponse.json();
      const finalReply =
        secondData.choices?.[0]?.message?.content ||
        'Alhamdulillah, tindakan telah selesai dieksekusi oleh sistem.';

      return NextResponse.json({
        choices: [
          {
            message: {
              role: 'assistant',
              content: finalReply,
            },
          },
        ],
        tool_executed: {
          name: functionName,
          result: toolResult,
        },
      });
    }

    return NextResponse.json(firstData);
  } catch (error) {
    console.error('Chat API Route Error:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
