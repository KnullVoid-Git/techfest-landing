import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/cursor/CustomCursor";
import EasterEgg from "@/components/ui/EasterEgg";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08080c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SYNAPSE 2026 // The Inter-Collegiate Cyber Heist & CTF",
  description:
    "An adrenaline-fueled 48-hour Capture The Flag, hardware exploitation, and physical alternate reality treasure hunt. Open to all college students. ₹5,00,000 prize pool.",
  keywords: [
    "CTF",
    "Capture The Flag",
    "Hackathon",
    "College Tech Fest",
    "Cybersecurity",
    "Web Exploitation",
    "Reverse Engineering",
    "Cryptography",
    "Hardware Hacking",
  ],
  authors: [{ name: "SYNAPSE Organizing Committee" }],
  openGraph: {
    title: "SYNAPSE 2026 // Inter-Collegiate Cyber Heist",
    description:
      "48 hours of high-stakes exploitation, quantum ciphers, and on-ground physical puzzle trails. Crack the grid and claim the ₹5,00,000 vault.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-ink font-sans antialiased min-h-screen relative selection:bg-accent selection:text-bg overflow-x-hidden">
        {/* Subtle procedural noise texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Global Smooth Inertia Scrolling & GSAP Synchronization */}
        <SmoothScrollProvider>
          {/* Custom Morphing Cursor */}
          <CustomCursor />

          {/* Interactive Easter Egg / Challenge #0 Modal */}
          <EasterEgg />

          {/* Page Body */}
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
