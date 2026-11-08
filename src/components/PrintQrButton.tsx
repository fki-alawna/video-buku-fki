'use client';

export default function PrintQrButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 active:bg-teal-900 print:hidden"
    >
      Print Semua QR
    </button>
  );
}
