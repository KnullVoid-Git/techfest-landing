import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/cursor/CustomCursor";
import CursorTrail from "@/components/cursor/CursorTrail";
import EasterEgg from "@/components/ui/EasterEgg";
import ScrollProgress from "@/components/ui/ScrollProgress";
import IntroSequence from "@/components/effects/IntroSequence";
import AnimatedGrain from "@/components/effects/AnimatedGrain";
import FluidBackground from "@/components/effects/FluidBackground";
import LiveLeaderboard from "@/components/ui/LiveLeaderboard";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700;800&family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-ink font-sans antialiased min-h-screen relative selection:bg-accent selection:text-bg overflow-x-hidden">
        {/* Dynamic Procedural Surveillance Grain & Ambient Fluid Shader */}
        <AnimatedGrain opacity={0.035} />
        <FluidBackground />

        {/* Global Neon Scroll Progress Indicator */}
        <ScrollProgress />

        {/* Global Smooth Inertia Scrolling & GSAP Synchronization */}
        <SmoothScrollProvider>
          {/* Custom Morphing Cursor & Cyber Hex Trail */}
          <CustomCursor />
          <CursorTrail />

          {/* Interactive Easter Egg / Challenge #0 Modal */}
          <EasterEgg />

          {/* Floating Live Leaderboard CTF Ticker */}
          <LiveLeaderboard />

          {/* Cinematic Terminal Intro Bootloader */}
          <IntroSequence />

          {/* Page Body */}
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
