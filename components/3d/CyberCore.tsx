"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CyberCore({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number;

    try {
      const width = container.clientWidth || 320;
      const height = container.clientHeight || 280;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 4.8;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Core group
      const coreGroup = new THREE.Group();
      scene.add(coreGroup);

      // Inner glowing octahedron
      const innerGeo = new THREE.OctahedronGeometry(1.05, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x39ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      coreGroup.add(innerMesh);

      // Outer icosahedron cage
      const outerGeo = new THREE.IcosahedronGeometry(1.6, 1);
      const outerMat = new THREE.MeshBasicMaterial({
        color: 0x39ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const outerMesh = new THREE.Mesh(outerGeo, outerMat);
      coreGroup.add(outerMesh);

      // Orbital Ring 1 (Cyan)
      const ring1Geo = new THREE.TorusGeometry(2.0, 0.015, 16, 80);
      const ring1Mat = new THREE.MeshBasicMaterial({
        color: 0x3d7bff,
        transparent: true,
        opacity: 0.6,
      });
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      coreGroup.add(ring1);

      // Orbital Ring 2 (Lime)
      const ring2Geo = new THREE.TorusGeometry(2.3, 0.012, 16, 80);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0xc6ff3d,
        transparent: true,
        opacity: 0.5,
      });
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.x = Math.PI / 3;
      coreGroup.add(ring2);

      // Orbiting Quantum Particle Dust
      const particleCount = 45;
      const particleGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        const rad = 1.7 + Math.random() * 0.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        posArray[i] = rad * Math.sin(phi) * Math.cos(theta);
        posArray[i + 1] = rad * Math.sin(phi) * Math.sin(theta);
        posArray[i + 2] = rad * Math.cos(phi);
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.04,
        color: 0x39ff88,
        transparent: true,
        opacity: 0.75,
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      coreGroup.add(particles);

      // Mouse tracking
      let targetRotX = 0;
      let targetRotY = 0;
      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetRotY = x * 1.2;
        targetRotX = y * 1.2;
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      // Resize
      const onResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 320;
        const h = container.clientHeight || 280;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // Render loop
      let clock = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        clock += 0.015;

        innerMesh.rotation.x += 0.01;
        innerMesh.rotation.y += 0.014;

        outerMesh.rotation.x -= 0.005;
        outerMesh.rotation.y -= 0.007;

        ring1.rotation.z += 0.012;
        ring2.rotation.z -= 0.01;

        particles.rotation.y += 0.003;

        // Smooth mouse lerp
        coreGroup.rotation.y += (targetRotY - coreGroup.rotation.y) * 0.06;
        coreGroup.rotation.x += (targetRotX - coreGroup.rotation.x) * 0.06;

        // Gentle floating bob
        coreGroup.position.y = Math.sin(clock * 1.5) * 0.08;

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
        innerGeo.dispose();
        innerMat.dispose();
        outerGeo.dispose();
        outerMat.dispose();
        ring1Geo.dispose();
        ring1Mat.dispose();
        ring2Geo.dispose();
        ring2Mat.dispose();
        particleGeo.dispose();
        particleMat.dispose();
      };
    } catch (e) {
      console.warn("WebGL initialization skipped:", e);
    }
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[260px] sm:h-[320px] flex items-center justify-center pointer-events-none select-none ${className}`}
    />
  );
}
