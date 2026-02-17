"use client";

import { useCallback, useRef, useState, MouseEvent } from "react";
import type { Particle } from "./hero.types";

const PARTICLE_THROTTLE_MS = 50;
const MAX_PARTICLES = 15;
const PARTICLE_LIFETIME_MS = 1500;

export function useMouseParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const lastParticleTime = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const now = Date.now();

    if (now - lastParticleTime.current < PARTICLE_THROTTLE_MS) return;
    lastParticleTime.current = now;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticle: Particle = {
      id: particleIdRef.current++,
      x,
      y,
      size: Math.random() * 30 + 15,
    };

    setParticles((prev) => [...prev.slice(-MAX_PARTICLES), newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, PARTICLE_LIFETIME_MS);
  }, []);

  return { particles, handleMouseMove };
}
