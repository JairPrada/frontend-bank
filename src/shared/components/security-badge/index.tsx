import { ShieldIcon } from "@/shared/components/icons";

interface SecurityBadgeProps {
  text?: string;
}

export const SecurityBadge = ({
  text = "Tus datos están protegidos",
}: SecurityBadgeProps) => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-100">
      <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
        <ShieldIcon className="w-4 h-4 text-emerald-500" />
        {text}
      </p>
    </div>
  );
};
