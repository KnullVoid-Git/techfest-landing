import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Tracks from "@/components/sections/Tracks";
import HowItWorks from "@/components/sections/HowItWorks";
import Rules from "@/components/sections/Rules";
import Prizes from "@/components/sections/Prizes";
import FAQ from "@/components/sections/FAQ";
import Register from "@/components/sections/Register";
import SectionWipe from "@/components/effects/SectionWipe";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col bg-bg text-ink selection:bg-accent selection:text-bg">
      {/* Top sticky/blur navbar */}
      <Navbar />

      {/* Hero with live countdown, kinetic stagger typography, 3D core & magnetic CTAs */}
      <Hero />

      <SectionWipe />

      {/* About section with counting stats & 3D cyber attack globe */}
      <About />

      <SectionWipe />

      {/* 6 Combat tracks with cursor glow cards & 3D tilt */}
      <Tracks />

      <SectionWipe />

      {/* Pinned scroll-scrubbed timeline */}
      <HowItWorks />

      <SectionWipe />

      {/* Rules of engagement accordion */}
      <Rules />

      <SectionWipe />

      {/* Prize podium with 3D cards & sponsor marquee */}
      <Prizes />

      <SectionWipe />

      {/* FAQ accordion */}
      <FAQ />

      <SectionWipe />

      {/* Validated team registration form */}
      <Register />

      {/* Footer with telemetry, coordinates & Easter egg hints */}
      <Footer />
    </main>
  );
}
