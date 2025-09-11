import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "@/styles/globals.css";

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bright",
  description: "Social Media Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sen.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
