import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bright",
  description: "Social Media Platform",
  icons: {
    icon: "/src/static/icons/favicon.svg",
    shortcut: "/src/static/icons/favicon.svg",
    apple: "/src/static/icons/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${sen.variable} antialiased`}>
        {children}
        <Toaster position="top-right" closeButton={true} />
      </body>
    </html>
  );
}
