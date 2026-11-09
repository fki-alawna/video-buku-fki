'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import AdminChatMessageItem, {
  type ChatMessage,
} from '@/components/admin/AdminChatMessageItem';
import AdminChatHeader from '@/components/admin/AdminChatHeader';
import AdminChatQuickActions from '@/components/admin/AdminChatQuickActions';

interface AIChatAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_GREETING: ChatMessage = {
  role: 'assistant',
  content:
    "Assalamu'alaikum Warahmatullahi Wabarakatuh! Saya A'lawna Intelligence, Agen AI Panitia.\n\nSaya memiliki akses langsung ke database sistem untuk:\n1. Mengambil laporan total folder dan video sistem (ketik misal: 'Tolong beri laporan sistem').\n2. Membuat catatan agenda ke kalender panitia (ketik misal: 'Buat catatan tanggal 20 Desember 2026: Rapat Evaluasi Panitia').\n\nAda yang bisa saya bantu sekarang?",
};

const QUICK_ACTIONS = [
  'Tolong berikan laporan total folder dan video.',
  'Buat catatan tanggal 20 Desember 2026: Rapat Evaluasi Panitia',
  'Apa saja fungsi yang dapat Anda jalankan?',
];

export default function AIChatAdminModal({
  isOpen,
  onClose,
}: AIChatAdminModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => textareaRef.current?.focus(), 150);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  async function sendMessage(textToSend: string) {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const payload = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: payload,
          mode: 'admin',
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content ||
        'Afwan, tidak ada respons yang diterima dari server.';

      const toolExecuted = data?.tool_executed;

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: reply,
          toolExecuted,
        },
      ]);
    } catch (err) {
      console.error('Admin AI Agent Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Afwan, terjadi kendala saat berkomunikasi dengan server AI. Silakan periksa koneksi dan coba beberapa saat lagi.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDownInput(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 cursor-pointer"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="A'lawna Intelligence - Agen Panitia"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 z-10 font-sans"
          >
            <AdminChatHeader onClose={onClose} />

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/60">
              {messages.map((msg, index) => (
                <AdminChatMessageItem key={index} message={msg} />
              ))}

              {isLoading && (
                <div className="flex flex-col items-start space-y-1.5">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-900 border border-blue-200">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-700" />
                    <span>Agen sedang memproses instruksi &amp; database...</span>
                  </div>
                  <div className="rounded-2xl rounded-tl-xs bg-white border border-slate-200 px-4 py-3 shadow-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-900/40 animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-blue-900/60 animate-bounce [animation-delay:0.2s]" />
                      <span className="h-2 w-2 rounded-full bg-blue-900 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <AdminChatQuickActions
              actions={QUICK_ACTIONS}
              isLoading={isLoading}
              onSelectAction={sendMessage}
            />

            <footer className="p-4 bg-white border-t border-slate-100 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-end gap-3"
              >
                <div className="flex-1 relative">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDownInput}
                    disabled={isLoading}
                    placeholder="Ketik pesan atau instruksi (contoh: 'Tolong buat catatan tanggal 20 Desember 2026: Rapat Panitia')..."
                    className="w-full min-h-[48px] max-h-32 resize-none rounded-2xl border border-slate-300 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/20 focus:bg-white focus:border-blue-900 transition-all leading-normal"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-900 text-white shadow-md hover:bg-blue-800 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                  title="Kirim pesan (Enter)"
                  aria-label="Kirim pesan"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </form>
              <p className="mt-1.5 text-[11px] text-slate-400 hidden sm:block">
                Tekan <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-600">Enter</kbd> untuk mengirim, <kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded text-slate-600">Shift + Enter</kbd> untuk baris baru.
              </p>
            </footer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
