# SYNAPSE 2026 // College TechFest & CTF Platform

> An animation-rich, cyber-heist themed landing and registration platform for an inter-collegiate 48-hour Capture The Flag (CTF) and treasure hunt championship. Inspired by the dark kinetic motion language of [hugostawiarski.fr](https://www.hugostawiarski.fr).

---

## ⚡ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Micro-Interactions**: [Framer Motion](https://www.framer.com/motion/)
- **Scroll Pinning & Sequences**: [GSAP](https://greensock.com/gsap/) + ScrollTrigger
- **Smooth Inertia Scrolling**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: Canvas Confetti

---

## 🎯 Key Features & Motion Inventory

- **Dynamic Spring Custom Cursor**: Morphing dot + lagging outer ring with magnetic expansion over links and cards. Automatically disabled on touch screens and under reduced motion settings.
- **Magnetic CTA Buttons**: CTAs shift toward the cursor within a 60px radius and smoothly snap back.
- **Kinetic Typography & Countdown**: Staggered word-by-word headline reveals with rolling/flip digit live countdown.
- **Combat Track Grid**: 6 numbered challenge cards (Web, Crypto, Pwn, OSINT, AI Red-Teaming, Hardware Trail) with 3D tilt and mouse-following radial glows.
- **Pinned Timeline Sequence**: Horizontal/vertical scroll-pinned progression synchronized with GSAP ScrollTrigger.
- **Challenge #0 Easter Egg & Gravité Mode**:
  - Click the navbar logo 5 times, press `~` (tilde), or click the Gravité button to trigger a fullscreen CRT glitch and open the hidden operative terminal.
  - Decrypt the Base64 cipher to unlock the hidden flag `FLAG{d0_y0u_b3l13v3_1n_gr4v1ty}` and badge.
  - Gravité mode applies zero-gravity CSS physics across the entire interface.
- **Team Registration**: Client-validated multi-step registration with digital boarding pass generation, confetti celebration, and clean backend integration hooks.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🔒 Security & Privacy

This repository includes a strict `.gitignore` ensuring that:
- No local `.env` files or API secrets are committed.
- Build artifacts (`.next/`, `node_modules/`, `out/`) are excluded.

---

## 📄 License
MIT License. Built for hackers by hackers.
