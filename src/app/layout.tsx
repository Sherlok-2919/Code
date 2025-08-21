import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Teachers Day Celebration 2025 - Honoring Our Educators",
  description: "Join us in celebrating Teachers Day! Create personalized greeting cards and join our special celebration event honoring our dedicated faculty and teachers.",
  keywords: "Teachers Day, celebration, greeting cards, faculty, education, appreciation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}