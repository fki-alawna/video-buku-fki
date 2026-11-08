'use client';

export default function PrintQrButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 active:bg-blue-950 shadow-sm print:hidden"
    >
      Print Semua QR
    </button>
  );
}
