import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});
export const metadata: Metadata = {
  title: "SponStudio — Podcast advertising for everyone",
  description: "The marketplace connecting indie podcasts and sponsors",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "SponStudio — Podcast advertising for everyone",
    description: "The marketplace connecting indie podcasts and sponsors",
    url: "https://www.sponstudio.com",
    siteName: "SponStudio",
    images: [
      {
        url: "https://www.sponstudio.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "SponStudio — Podcast advertising for everyone",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SponStudio — Podcast advertising for everyone",
    description: "The marketplace connecting indie podcasts and sponsors",
    images: ["https://www.sponstudio.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col"><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}