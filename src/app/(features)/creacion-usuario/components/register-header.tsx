import { IdCardIcon } from "@/shared/components/icons";

export const RegisterHeader = () => {
  return (
    <div className="text-center mb-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-500 mb-4 shadow-lg shadow-emerald-500/30">
        <IdCardIcon className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Crear cuenta</h2>
      <p className="text-gray-500 mt-2">
        Completa tus datos para registrarte
      </p>
    </div>
  );
};
