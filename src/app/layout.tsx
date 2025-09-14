import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "@/styles/globals.css";
import NextAuthProvider from "@/components/templates/NextAuthProvider";
import { Toaster } from "sonner";

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
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
        <Toaster position="top-right" closeButton={true} />
      </body>
    </html>
  );
}
