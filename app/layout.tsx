import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PSV Sizing Quest | Puffer Training Academy",
  description: "Master pressure safety valve selection through realistic training scenarios. A gamified learning experience for PSV workflow training.",
  keywords: ["PSV", "pressure safety valve", "training", "engineering", "process safety", "tank", "flame arrester"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Clerk disabled for development - uncomment ClerkProvider when ready
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
