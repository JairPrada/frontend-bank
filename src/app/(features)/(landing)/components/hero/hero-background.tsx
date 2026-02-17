export function HeroGridBackground() {
  return (
    <>
      <div className="absolute inset-0 hero-grid-bg" />
      <div className="absolute inset-0 hero-grid-overlay" />
    </>
  );
}

export function HeroDecorativeCircles() {
  return (
    <>
      <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-lime-200/10 rounded-full blur-3xl animate-pulse-glow-delay" />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-emerald-600/30 rounded-full blur-2xl animate-pulse-glow-delay-2" />
    </>
  );
}
