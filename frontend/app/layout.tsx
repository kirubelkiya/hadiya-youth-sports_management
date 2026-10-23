import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// Self-hosted via next/font — no external network round-trip, zero render-blocking
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Hadiya Zone Youth & Sports Department",
  description:
    "Official website of the Hadiya Zone Youth and Sports Department — Empowering Youth, Developing Talent, Building a Stronger Community.",
  keywords: "Hadiya Zone, Youth, Sports, Ethiopia, Department",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              style: { background: "#166534", color: "#fff" },
            },
            error: {
              style: { background: "#dc2626", color: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
