interface BadgeProps {
  text: string;
}

export function HeroBadge({ text }: BadgeProps) {
  return (
    <span className="inline-block px-4 py-1.5 bg-lime-200 text-emerald-800 text-sm font-medium rounded-full mb-6">
      {text}
    </span>
  );
}
