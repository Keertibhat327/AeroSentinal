import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import clsx from "clsx";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "AeroSentinal | Predictive Maintenance",
  description: "Holistic Aircraft Predictive Maintenance System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={clsx(spaceGrotesk.variable, jetbrainsMono.variable, "font-sans min-h-screen antialiased")}>
        {children}
      </body>
    </html>
  );
}
