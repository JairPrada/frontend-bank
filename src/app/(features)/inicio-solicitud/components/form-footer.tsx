import { ShieldIcon } from "@/shared/components/icons";

export const FormFooter = () => {
  return (
    <div className="relative mt-6 pt-6 border-t border-gray-100">
      <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1">
        <ShieldIcon className="w-4 h-4 text-emerald-500" />
        Tus datos están protegidos y cifrados
      </p>
    </div>
  );
};
