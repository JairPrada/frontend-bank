import type { Particle } from "./hero.types";

interface ParticlesProps {
  particles: Particle[];
}

export function HeroParticles({ particles }: ParticlesProps) {
  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="hero-particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </>
  );
}
