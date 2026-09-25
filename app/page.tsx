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

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col bg-bg text-ink selection:bg-accent selection:text-bg">
      {/* Top sticky/blur navbar */}
      <Navbar />

      {/* Hero with live countdown, kinetic stagger typography & magnetic CTAs */}
      <Hero />

      {/* About section with counting stats */}
      <About />

      {/* 6 Combat tracks with cursor glow cards */}
      <Tracks />

      {/* Pinned scroll-scrubbed timeline */}
      <HowItWorks />

      {/* Rules of engagement accordion */}
      <Rules />

      {/* Prize podium & bounties */}
      <Prizes />

      {/* FAQ accordion */}
      <FAQ />

      {/* Validated team registration form */}
      <Register />

      {/* Footer with telemetry, coordinates & Easter egg hints */}
      <Footer />
    </main>
  );
}
