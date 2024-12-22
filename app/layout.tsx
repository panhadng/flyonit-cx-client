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
  title: "Autotask CX Client",
  description: "Autotask CX Client to manage autotask workflows",
  icons: {
    icon: [
      { url: "/autotask-icon.png", sizes: "any" },
      { url: "/autotask-icon.png", type: "image/png" },
    ],
    shortcut: ["/autotask-icon.png"],
    apple: [{ url: "/autotask-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
