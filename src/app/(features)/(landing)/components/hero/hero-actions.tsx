import Link from "next/link";
import type { HeroAction } from "./hero.types";

interface ActionsProps {
  primary?: HeroAction;
  secondary?: HeroAction;
}

export function HeroActions({ primary, secondary }: ActionsProps) {
  if (!primary && !secondary) return null;

  return (
    <div className="flex flex-wrap gap-4">
      {primary && (
        <Link
          href={primary.href}
          className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
        >
          {primary.label}
        </Link>
      )}
      {secondary && (
        <Link
          href={secondary.href}
          className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
