"use client";

import type { HeroProps } from "./hero.types";
import {
  DEFAULT_HERO_BADGE,
  DEFAULT_HERO_TITLE,
  DEFAULT_HERO_HIGHLIGHT,
  DEFAULT_HERO_SUBTITLE,
  DEFAULT_PRIMARY_ACTION,
  DEFAULT_SECONDARY_ACTION,
} from "./hero.data";
import { HeroBadge } from "./hero-badge";
import { HeroTitle } from "./hero-title";
import { HeroActions } from "./hero-actions";
import { HeroGridBackground, HeroDecorativeCircles } from "./hero-background";
import { HeroParticles } from "./hero-particles";
import { HeroCreditCard } from "./hero-credit-card";
import { useMouseParticles } from "./use-mouse-particles";

export default function Hero({
  title = DEFAULT_HERO_TITLE,
  highlight = DEFAULT_HERO_HIGHLIGHT,
  subtitle = DEFAULT_HERO_SUBTITLE,
  badge = DEFAULT_HERO_BADGE,
  primaryAction = DEFAULT_PRIMARY_ACTION,
  secondaryAction = DEFAULT_SECONDARY_ACTION,
}: Partial<HeroProps> = {}) {
  const { particles, handleMouseMove } = useMouseParticles();

  return (
    <section
      className="relative min-h-[90vh] md:h-[80vh] w-full overflow-hidden bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-800"
      onMouseMove={handleMouseMove}
    >
      <HeroGridBackground />
      <HeroDecorativeCircles />
      <HeroParticles particles={particles} />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 py-16 md:py-0 flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
          <div className="text-center md:text-left order-2 md:order-1">
            <div className="animate-fade-in-up">
              {badge && <HeroBadge text={badge} />}
            </div>

            <div className="animate-fade-in-up-delay-1">
              <HeroTitle main={title} highlight={highlight} />
            </div>

            {subtitle && (
              <p className="text-lg text-white/80 mb-8 max-w-md mx-auto md:mx-0 animate-fade-in-up-delay-2">
                {subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fade-in-up-delay-3">
              <HeroActions
                primary={primaryAction}
                secondary={secondaryAction}
              />
            </div>
          </div>

          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <HeroCreditCard />
          </div>
        </div>
      </div>
    </section>
  );
}
