import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ijara Xonadoni — Namangan va O‘zbekistonda uylar ijarasi',
  description: 'Namangan va boshqa hududlarda talabalar hamda oilalar uchun qulay va shinam ijara xonadonlari platformasi. To‘g‘ridan-to‘g‘ri aloqa va aniq lokatsiya.',
  keywords: ['ijara xonadoni', 'namangan ijara uy', 'talabalar uchun uy', 'oilaviy ijara kvartira', 'hostel namangan'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
