import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://fki-alawna.vercel.app'),
  title: "A'lawna",
  description: "Pengelolaan video Google Drive dan QR code A'lawna.",
  openGraph: {
    url: 'https://fki-alawna.vercel.app/',
    title: "A'lawna",
    description: "Pengelolaan video Google Drive dan QR code A'lawna.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "A'lawna",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "A'lawna",
    description: "Pengelolaan video Google Drive dan QR code A'lawna.",
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
