import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import AuthProvider from "@/contexts/AuthProvider";
import { NotificationProvider } from "@/contexts/NotificationProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Golden Clove Spices",
  description: "100% Pure and Authentic",
  icons: {
    icon: "/favicon.png", // Path to your favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
              <CartProvider>
                {children}
              </CartProvider>
          </body>
        </html>
      </NotificationProvider>
    </AuthProvider>
  );
}
