"use client";

interface PageBackgroundProps {
  variant?: "light" | "dark" | "hero";
  withDecorations?: boolean;
  extraCenterCircle?: boolean;
}

export function PageBackground({ 
  variant = "light", 
  withDecorations = false,
  extraCenterCircle = false 
}: PageBackgroundProps) {
  if (variant === "hero") {
    return (
      <>
        <div className="absolute inset-0 hero-grid-bg" />
        <div className="absolute inset-0 hero-grid-overlay" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-lime-200/10 rounded-full blur-3xl animate-pulse-glow-delay" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-emerald-600/30 rounded-full blur-2xl animate-pulse-glow-delay-2" />
      </>
    );
  }

  const gridClass = variant === "dark" ? "form-grid-bg" : "form-grid-bg-light";

  if (withDecorations) {
    return (
      <>
        <div className={`absolute inset-0 ${gridClass}`} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl" />
          {extraCenterCircle && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-emerald-200/5 rounded-full blur-3xl" />
          )}
        </div>
      </>
    );
  }

  return <div className={`absolute inset-0 ${gridClass}`} />;
}

export default PageBackground;
