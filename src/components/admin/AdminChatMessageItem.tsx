import { Calendar, Database } from 'lucide-react';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  toolExecuted?: {
    name?: string;
    result?: Record<string, unknown>;
  };
}

interface AdminChatMessageItemProps {
  message: ChatMessage;
}

export default function AdminChatMessageItem({ message }: AdminChatMessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      {/* Badge Indikator Tool Execution */}
      {!isUser && message.toolExecuted?.name && (
        <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-900 border border-blue-200 shadow-2xs">
          {message.toolExecuted.name === 'create_calendar_note' ? (
            <>
              <Calendar className="h-3.5 w-3.5 text-emerald-600" />
              <span>Mengeksekusi Insert: Catatan Kalender</span>
            </>
          ) : (
            <>
              <Database className="h-3.5 w-3.5 text-blue-700" />
              <span>Mengeksekusi Query: Laporan Database</span>
            </>
          )}
        </div>
      )}

      {/* Bubble Pesan */}
      <div
        className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? 'bg-blue-900 text-white rounded-tr-xs shadow-md font-medium'
            : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200 shadow-xs'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
