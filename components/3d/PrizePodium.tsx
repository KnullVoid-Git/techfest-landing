"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PrizePodium({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number;

    try {
      const width = container.clientWidth || 360;
      const height = container.clientHeight || 280;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 1.2, 4.6);
      camera.lookAt(0, 0.2, 0);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const podiumGroup = new THREE.Group();
      scene.add(podiumGroup);

      // Materials
      const goldMat = new THREE.MeshBasicMaterial({ color: 0x39ff88, wireframe: true, transparent: true, opacity: 0.85 });
      const silverMat = new THREE.MeshBasicMaterial({ color: 0x3d7bff, wireframe: true, transparent: true, opacity: 0.7 });
      const bronzeMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.7 });

      // Pedestal 1: Center (1st Place)
      const p1Geo = new THREE.CylinderGeometry(0.7, 0.75, 1.3, 6);
      const p1 = new THREE.Mesh(p1Geo, goldMat);
      p1.position.set(0, -0.2, 0);
      podiumGroup.add(p1);

      // Trophy 1: Glowing Octahedron
      const t1Geo = new THREE.OctahedronGeometry(0.38, 0);
      const t1Mat = new THREE.MeshBasicMaterial({ color: 0x39ff88, wireframe: true });
      const t1 = new THREE.Mesh(t1Geo, t1Mat);
      t1.position.set(0, 0.85, 0);
      podiumGroup.add(t1);

      // Pedestal 2: Left (2nd Place)
      const p2Geo = new THREE.CylinderGeometry(0.55, 0.6, 0.95, 6);
      const p2 = new THREE.Mesh(p2Geo, silverMat);
      p2.position.set(-1.45, -0.38, -0.15);
      podiumGroup.add(p2);

      // Trophy 2: Glowing Dodecahedron
      const t2Geo = new THREE.DodecahedronGeometry(0.28, 0);
      const t2Mat = new THREE.MeshBasicMaterial({ color: 0x3d7bff, wireframe: true });
      const t2 = new THREE.Mesh(t2Geo, t2Mat);
      t2.position.set(-1.45, 0.45, -0.15);
      podiumGroup.add(t2);

      // Pedestal 3: Right (3rd Place)
      const p3Geo = new THREE.CylinderGeometry(0.52, 0.58, 0.75, 6);
      const p3 = new THREE.Mesh(p3Geo, bronzeMat);
      p3.position.set(1.45, -0.48, -0.2);
      podiumGroup.add(p3);

      // Trophy 3: Glowing Icosahedron
      const t3Geo = new THREE.IcosahedronGeometry(0.26, 0);
      const t3Mat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true });
      const t3 = new THREE.Mesh(t3Geo, t3Mat);
      t3.position.set(1.45, 0.22, -0.2);
      podiumGroup.add(t3);

      // Ambient Ground Rings
      const ringGeo = new THREE.RingGeometry(2.3, 2.34, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x39ff88, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
      const groundRing = new THREE.Mesh(ringGeo, ringMat);
      groundRing.rotation.x = Math.PI / 2;
      groundRing.position.y = -0.85;
      podiumGroup.add(groundRing);

      // Mouse tracking
      let targetRotY = 0;
      let targetRotX = 0;
      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotY = x * 0.8;
        targetRotX = y * 0.4;
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      // Window resize
      const onResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 360;
        const h = container.clientHeight || 280;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // Animation loop
      let clock = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        clock += 0.02;

        // Rotate trophies
        t1.rotation.y += 0.018;
        t1.rotation.x += 0.01;
        t1.position.y = 0.85 + Math.sin(clock * 2) * 0.06;

        t2.rotation.y -= 0.015;
        t2.position.y = 0.45 + Math.sin(clock * 2 + 1) * 0.05;

        t3.rotation.y += 0.016;
        t3.position.y = 0.22 + Math.sin(clock * 2 + 2) * 0.04;

        // Mouse lerp
        podiumGroup.rotation.y += (targetRotY - podiumGroup.rotation.y) * 0.05;
        podiumGroup.rotation.x += (targetRotX - podiumGroup.rotation.x) * 0.05;

        renderer?.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);

        if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
        p1Geo.dispose();
        p2Geo.dispose();
        p3Geo.dispose();
        t1Geo.dispose();
        t2Geo.dispose();
        t3Geo.dispose();
        ringGeo.dispose();
        goldMat.dispose();
        silverMat.dispose();
        bronzeMat.dispose();
        t1Mat.dispose();
        t2Mat.dispose();
        t3Mat.dispose();
        ringMat.dispose();
      };
    } catch (e) {
      console.warn("PrizePodium WebGL init skipped:", e);
    }
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[220px] sm:h-[280px] flex items-center justify-center select-none pointer-events-none ${className}`}
    />
  );
}
