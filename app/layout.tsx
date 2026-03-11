import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'ABASE',
  description: 'Dashboard administrativo',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} font-sans`}>
      <body className="bg-zinc-950 text-zinc-50 antialiased selection:bg-rose-900/30" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
