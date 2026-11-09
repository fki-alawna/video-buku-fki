import type { Metadata } from 'next';
import './globals.css';

const description =
  "A'lawna adalah nama yang bermakna tinggi, luhur, dan unggul, namun keunggulan tersebut bukanlah tentang kesombongan, melainkan cita-cita mulia untuk memiliki akhlak, ilmu, dan keimanan yang luhur. Nama ini merupakan wujud doa dan harapan agar senantiasa tumbuh menjadi pribadi yang beradab, tetap rendah hati, serta membawa manfaat bagi sesama, dengan esensi utama menjadi pribadi unggul melalui ilmu, adab, dan keimanan.";

export const metadata: Metadata = {
  metadataBase: new URL('https://fki-alawna.vercel.app'),
  title: "A'lawna",
  description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    url: 'https://fki-alawna.vercel.app/',
    title: "A'lawna",
    description,
    images: [
      {
        url: 'https://fki-alawna.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "A'lawna",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "A'lawna",
    description,
    images: ['https://fki-alawna.vercel.app/og-image.jpg'],
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
