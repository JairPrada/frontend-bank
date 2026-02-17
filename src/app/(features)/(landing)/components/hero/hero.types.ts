export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export interface HeroAction {
  label: string;
  href: string;
}

export interface HeroProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  badge?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
}
