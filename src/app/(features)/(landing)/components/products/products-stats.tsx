"use client";

import { useInView } from "@/shared/hooks/use-in-view";
import type { Stat } from "./products.types";

interface ProductsStatsProps {
  stats: Stat[];
}

const STAT_DELAYS = [0, 100, 200, 300];

export function ProductsStats({ stats }: ProductsStatsProps) {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 pb-20 border-t border-slate-200"
    >
      {stats.map((stat, idx) => (
        <StatItem
          key={idx}
          value={stat.value}
          label={stat.label}
          delay={STAT_DELAYS[idx]}
          isVisible={isInView}
        />
      ))}
    </div>
  );
}

interface StatItemProps {
  value: string;
  label: string;
  delay?: number;
  isVisible: boolean;
}

function StatItem({ value, label, delay = 0, isVisible }: StatItemProps) {
  return (
    <div
      className={`text-center md:text-left transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
        {value}
      </p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}
