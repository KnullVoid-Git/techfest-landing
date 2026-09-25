"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, ArrowRight } from "lucide-react";

interface TrackNode {
  id: string;
  num: string;
  title: string;
  category: string;
  desc: string;
  color: number;
}

const TRACKS_DATA: TrackNode[] = [
  { id: "web", num: "01", title: "Web Exploitation", category: "APPLICATION DEFENSE", desc: "SQLi, SSRF, prototype pollution & zero-day API breaks.", color: 0x39ff88 },
  { id: "binary", num: "02", title: "Binary Exploitation", category: "REVERSE ENGINEERING", desc: "Buffer overflows, ROP gadget chains & kernel memory pwn.", color: 0x3d7bff },
  { id: "crypto", num: "03", title: "Quantum Cryptography", category: "MATHEMATICAL CIPHERS", desc: "Lattice attacks, RSA factoring & ECDSA curve faults.", color: 0x9b5cff },
  { id: "forensics", num: "04", title: "OSINT & Forensics", category: "INVESTIGATIVE INTEL", desc: "Memory carving, pcap packet analysis & geolocation.", color: 0xc6ff3d },
  { id: "ai", num: "05", title: "AI Red-Teaming", category: "EMERGING ATTACK SURFACES", desc: "Prompt injections, adversarial evasion & model inversion.", color: 0xff3d81 },
  { id: "hardware", num: "06", title: "Hardware & ARG Trail", category: "ARG & RADIO HACKING", desc: "ESP32 UART dumping, SDR sniffing & dead-drops.", color: 0xf59e0b },
];

export default function TrackOrbit({ onSelectTrack }: { onSelectTrack?: (id: string) => void }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number;

    try {
      const width = container.clientWidth || 360;
      const height = container.clientHeight || 340;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 1.4, 4.8);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const orbitGroup = new THREE.Group();
      scene.add(orbitGroup);

      const radius = 2.1;
      const nodes: THREE.Mesh[] = [];

      // Orbit guide ring
      const ringGeo = new THREE.TorusGeometry(radius, 0.012, 16, 90);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x39ff88, transparent: true, opacity: 0.35 });
      const orbitRing = new THREE.Mesh(ringGeo, ringMat);
      orbitRing.rotation.x = Math.PI / 2;
      orbitGroup.add(orbitRing);

      // Create 6 3D Nodes around the ring
      TRACKS_DATA.forEach((track, i) => {
        const angle = (i / TRACKS_DATA.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const nodeGroup = new THREE.Group();
        nodeGroup.position.set(x, 0, z);

        // Octahedron marker
        const markerGeo = new THREE.OctahedronGeometry(0.24, 0);
        const markerMat = new THREE.MeshBasicMaterial({
          color: track.color,
          wireframe: true,
        });
        const marker = new THREE.Mesh(markerGeo, markerMat);
        nodeGroup.add(marker);
        nodes.push(marker);

        orbitGroup.add(nodeGroup);
      });

      // Mouse Drag & Inertia
      let isDragging = false;
      let prevMouseX = 0;
      let rotSpeed = 0.005;

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        prevMouseX = e.clientX;
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const delta = e.clientX - prevMouseX;
        orbitGroup.rotation.y += delta * 0.008;
        prevMouseX = e.clientX;
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      container.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);

      // Resize
      const onResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 360;
        const h = container.clientHeight || 340;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // Render loop
      const animate = () => {
        animId = requestAnimationFrame(animate);

        if (!isDragging) {
          orbitGroup.rotation.y += rotSpeed;
        }

        // Spin each node locally
        nodes.forEach((n) => {
          n.rotation.y += 0.02;
          n.rotation.x += 0.01;
        });

        // Compute which node is closest to front (highest z in world space)
        let closestIndex = 0;
        let maxZ = -999;
        nodes.forEach((n, idx) => {
          const worldPos = new THREE.Vector3();
          n.getWorldPosition(worldPos);
          if (worldPos.z > maxZ) {
            maxZ = worldPos.z;
            closestIndex = idx;
          }
        });

        setActiveTrackIndex(closestIndex);

        renderer?.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        container.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("resize", onResize);

        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
        ringGeo.dispose();
        ringMat.dispose();
      };
    } catch (e) {
      console.warn("TrackOrbit init skipped:", e);
    }
  }, []);

  const activeTrack = TRACKS_DATA[activeTrackIndex];

  return (
    <div className="w-full flex flex-col items-center select-none py-4">
      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="w-full h-[260px] sm:h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing relative"
        title="Drag horizontally to orbit tracks"
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-ink-dim uppercase tracking-wider bg-black/40 px-3 py-1 rounded-full border border-white/10 pointer-events-none">
          [DRAG ORBIT TO SWITCH TRACKS]
        </div>
      </div>

      {/* Active Track Focus Card */}
      <div className="max-w-md w-full p-6 rounded-2xl bg-white/[0.03] border border-accent/40 shadow-[0_0_30px_rgba(57,255,136,0.12)] text-center space-y-3 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs font-mono text-accent">
          <span>VECTOR #{activeTrack.num}</span>
          <span className="text-[10px] text-ink-dim border border-white/10 px-2 py-0.5 rounded-full uppercase">
            {activeTrack.category}
          </span>
        </div>

        <h4 className="font-display font-black text-2xl text-ink">
          {activeTrack.title}
        </h4>

        <p className="text-sm text-ink-muted leading-relaxed">
          {activeTrack.desc}
        </p>

        <button
          onClick={() => onSelectTrack && onSelectTrack(activeTrack.id)}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-bg bg-accent hover:bg-accent-lime px-4 py-2 rounded-full transition-all cursor-pointer shadow-[0_0_15px_rgba(57,255,136,0.4)]"
        >
          <span>SELECT VECTOR</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
