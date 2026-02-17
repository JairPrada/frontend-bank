"use client";

import { useInView } from "@/shared/hooks/use-in-view";

interface ProductsHeaderProps {
  activeIndex: number;
  totalProducts: number;
  onIndicatorClick: (index: number) => void;
}

export function ProductsHeader({
  activeIndex,
  totalProducts,
  onIndicatorClick,
}: ProductsHeaderProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
    >
      <ProductsTitle isVisible={isInView} />
      <ProductsNavigation
        activeIndex={activeIndex}
        totalProducts={totalProducts}
        onIndicatorClick={onIndicatorClick}
        isVisible={isInView}
      />
    </div>
  );
}

function ProductsTitle({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={`lg:max-w-xl transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-px bg-linear-to-r from-emerald-600 to-transparent" />
        <span className="text-emerald-600 text-sm font-mono uppercase tracking-wider">
          Productos
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
        Elige tu camino hacia la{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 via-emerald-400 to-emerald-600">
          libertad financiera
        </span>
      </h2>
    </div>
  );
}

interface ProductsNavigationProps {
  activeIndex: number;
  totalProducts: number;
  onIndicatorClick: (index: number) => void;
  isVisible: boolean;
}

function ProductsNavigation({
  activeIndex,
  totalProducts,
  onIndicatorClick,
  isVisible,
}: ProductsNavigationProps) {
  return (
    <div
      className={`flex items-center gap-4 transition-all duration-700 delay-200 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      <span className="text-slate-400 text-sm font-mono">
        {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(totalProducts).padStart(2, "0")}
      </span>
      <div className="flex gap-2">
        {Array.from({ length: totalProducts }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onIndicatorClick(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? "w-8 bg-emerald-500"
                : "w-4 bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
