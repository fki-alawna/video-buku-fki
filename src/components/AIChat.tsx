'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Assalamu'alaikum! Saya A'lawna Intelligence, asisten AI keluarga besar A'lawna. Ada yang bisa saya bantu seputar Haflah, kegiatan pesantren, atau doa dan salam?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-alawna-chat', handleOpen);
    return () => window.removeEventListener('open-alawna-chat', handleOpen);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Hanya kirim riwayat percakapan yang relevan (misal pesan user & assistant)
      const payload = newMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content ||
        'Afwan, terjadi kendala saat menerima jawaban dari server. Silakan coba lagi.';

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('AIChat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Afwan, koneksi ke asisten AI sedang terganggu. Silakan periksa jaringan dan coba beberapa saat lagi.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button (FAB) - Responsive Capsule */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 h-12 px-4 md:h-14 md:px-6 rounded-full flex items-center justify-center gap-2 md:gap-3 bg-blue-900 hover:bg-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
        aria-label="Buka AI Chatbot A'lawna Intelligence"
      >
        <div className="relative">
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:rotate-12" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400"></span>
          </span>
        </div>
        {/* Teks Singkat "AI" di Mobile, Lengkap di Desktop */}
        <span className="text-sm font-bold tracking-wide md:hidden">AI</span>
        <span className="hidden md:inline text-sm font-bold tracking-wide pr-1">A&apos;lawna Intelligence</span>
      </button>

      {/* Chatbox Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-34 md:bottom-24 right-4 md:right-8 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[75vh] sm:max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden text-slate-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-blue-950 bg-blue-900 px-5 py-4 text-white">
              <div>
                <h3 className="text-base font-bold leading-tight">
                  A&apos;lawna Intelligence
                </h3>
                <p className="text-xs text-blue-200 mt-0.5">Asisten AI Islami Ramah</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-1.5 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60 text-sm">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-900 mt-0.5">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2.5 max-w-[82%] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-900 text-white rounded-tr-xs shadow-xs'
                        : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200/70 shadow-2xs whitespace-pre-wrap'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-900 mt-0.5">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl rounded-tl-xs bg-white px-4 py-3 border border-slate-200/70 shadow-2xs">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-900" />
                    <span className="text-xs text-slate-500 font-medium">
                      Sedang mengetik...
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-slate-200/80 bg-white p-3 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pesan untuk AI..."
                disabled={isLoading}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-900 focus:bg-white focus:outline-none transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-900 hover:bg-blue-800 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-300 cursor-pointer"
                aria-label="Kirim pesan"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
