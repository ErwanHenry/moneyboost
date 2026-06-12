import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CashFrog - Prêt rapide de 100€ à 600€ en 24h",
  description: "Besoin d'argent rapidement ? CashFrog vous propose des micro-crédits de 100€ à 600€ avec réponse en 24h. 100% en ligne, sans justificatif. Votre grenouille de la finance !",
  keywords: ["prêt rapide", "micro-crédit", "prêt en ligne", "argent rapide", "crédit express"],
  openGraph: {
    title: "CashFrog - Prêt rapide de 100€ à 600€ en 24h",
    description: "Votre solution de micro-crédit rapide et transparente",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
