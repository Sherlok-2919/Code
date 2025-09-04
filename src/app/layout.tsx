import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Teachers Day Celebration 2025 - Honoring Our Educators",
  description: "Join us in celebrating Teachers Day! Create personalized greeting cards and join our special celebration event honoring our dedicated faculty and teachers.",
  keywords: "Teachers Day, celebration, greeting cards, faculty, education, appreciation",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ fontFamily: 'Inter, sans-serif' }}>{children}</body>
    </html>
  );
}