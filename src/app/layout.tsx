import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Teachers Day 2024 - Celebrating Our Educators",
  description: "A beautiful celebration page for Teachers Day 2024. Create personalized greeting cards and celebrate our amazing CSE Faculty and other departments.",
  keywords: "Teachers Day, CSE Faculty, greeting cards, education, celebration",
  authors: [{ name: "Students" }],
  openGraph: {
    title: "Happy Teachers Day 2024",
    description: "Celebrating our amazing educators with personalized greeting cards",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Happy Teachers Day 2024",
    description: "Celebrating our amazing educators",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
