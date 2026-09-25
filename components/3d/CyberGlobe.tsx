"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface CyberGlobeProps {
  className?: string;
}

// Key coordinates for simulated global cyber nodes
const CITIES = [
  { name: "New York", lat: 40.71, lon: -74.0 },
  { name: "London", lat: 51.5, lon: -0.12 },
  { name: "Tokyo", lat: 35.67, lon: 139.65 },
  { name: "Bengaluru", lat: 12.97, lon: 77.59 },
  { name: "San Francisco", lat: 37.77, lon: -122.41 },
  { name: "Berlin", lat: 52.52, lon: 13.4 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Sydney", lat: -33.86, lon: 151.2 },
];

const ATTACK_VECTORS = [
  [0, 1], // NY -> London
  [1, 3], // London -> Bengaluru
  [4, 2], // SF -> Tokyo
  [2, 6], // Tokyo -> Singapore
  [5, 0], // Berlin -> NY
  [3, 7], // Bengaluru -> Sydney
];

function latLongToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function CyberGlobe({ className = "" }: CyberGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animId: number;

    try {
      const width = container.clientWidth || 320;
      const height = container.clientHeight || 320;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 4.2;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      const radius = 1.35;

      // 1. Dotted Globe Sphere Surface
      const dotCount = 850;
      const sphereGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(dotCount * 3);

      for (let i = 0; i < dotCount; i++) {
        // Fibonacci sphere distribution
        const y = 1 - (i / (dotCount - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = 0.1 * i * Math.PI;

        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;

        positions[i * 3] = x * radius;
        positions[i * 3 + 1] = y * radius;
        positions[i * 3 + 2] = z * radius;
      }

      sphereGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const sphereMat = new THREE.PointsMaterial({
        size: 0.025,
        color: 0x39ff88,
        transparent: true,
        opacity: 0.55,
      });
      const globeDots = new THREE.Points(sphereGeo, sphereMat);
      globeGroup.add(globeDots);

      // 2. Latitude wireframe rings
      const ringsGroup = new THREE.Group();
      [-0.8, -0.4, 0, 0.4, 0.8].forEach((yNorm) => {
        const ringRadius = Math.sqrt(1 - yNorm * yNorm) * radius;
        const ringGeo = new THREE.BufferGeometry();
        const pts: THREE.Vector3[] = [];
        for (let a = 0; a <= Math.PI * 2; a += 0.2) {
          pts.push(new THREE.Vector3(Math.cos(a) * ringRadius, yNorm * radius, Math.sin(a) * ringRadius));
        }
        ringGeo.setFromPoints(pts);
        const ringMat = new THREE.LineBasicMaterial({
          color: 0x3d7bff,
          transparent: true,
          opacity: 0.18,
        });
        ringsGroup.add(new THREE.LineLoop(ringGeo, ringMat));
      });
      globeGroup.add(ringsGroup);

      // 3. City Node Markers
      const nodeGeo = new THREE.SphereGeometry(0.035, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x39ff88 });
      const cityVectors = CITIES.map((c) => {
        const v = latLongToVector3(c.lat, c.lon, radius);
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);
        mesh.position.copy(v);
        globeGroup.add(mesh);
        return v;
      });

      // 4. Attack Vector Curves & Traveling Packets
      const curves: THREE.QuadraticBezierCurve3[] = [];
      const packets: { mesh: THREE.Mesh; curveIndex: number; progress: number; speed: number }[] = [];
      const packetGeo = new THREE.SphereGeometry(0.024, 8, 8);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

      ATTACK_VECTORS.forEach(([srcIdx, dstIdx], i) => {
        const v1 = cityVectors[srcIdx];
        const v2 = cityVectors[dstIdx];

        const mid = v1.clone().add(v2).multiplyScalar(0.5);
        const dist = v1.distanceTo(v2);
        mid.normalize().multiplyScalar(radius + dist * 0.32);

        const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
        curves.push(curve);

        const curvePoints = curve.getPoints(40);
        const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const curveMat = new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? 0x39ff88 : 0x3d7bff,
          transparent: true,
          opacity: 0.45,
        });
        const curveLine = new THREE.Line(curveGeo, curveMat);
        globeGroup.add(curveLine);

        // Traveling packet
        const packetMesh = new THREE.Mesh(packetGeo, packetMat);
        globeGroup.add(packetMesh);
        packets.push({
          mesh: packetMesh,
          curveIndex: i,
          progress: Math.random(),
          speed: 0.006 + Math.random() * 0.005,
        });
      });

      // Drag to rotate interaction
      let isDragging = false;
      let prevMousePos = { x: 0, y: 0 };
      let rotSpeed = { x: 0, y: 0.003 };

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        prevMousePos = { x: e.clientX, y: e.clientY };
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMousePos.x;
        const deltaY = e.clientY - prevMousePos.y;
        globeGroup.rotation.y += deltaX * 0.008;
        globeGroup.rotation.x += deltaY * 0.008;
        prevMousePos = { x: e.clientX, y: e.clientY };
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      container.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);

      // Window resize
      const onResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 320;
        const h = container.clientHeight || 320;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // Render loop
      const animate = () => {
        animId = requestAnimationFrame(animate);

        if (!isDragging) {
          globeGroup.rotation.y += rotSpeed.y;
        }

        // Animate packets along attack curves
        packets.forEach((p) => {
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;
          const curve = curves[p.curveIndex];
          const pos = curve.getPoint(p.progress);
          p.mesh.position.copy(pos);
        });

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
        sphereGeo.dispose();
        sphereMat.dispose();
        nodeGeo.dispose();
        nodeMat.dispose();
        packetGeo.dispose();
        packetMat.dispose();
      };
    } catch (e) {
      console.warn("CyberGlobe WebGL init error:", e);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[300px] sm:h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Drag to orbit global cyber vector grid"
    />
  );
}
