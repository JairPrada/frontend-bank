import { DocumentIcon } from "@/shared/components/icons";

export const FormHeader = () => {
  return (
    <div className="relative text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-500 mb-4 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-500/50 hover:scale-110 hover:-rotate-3">
        <DocumentIcon className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800">Nueva Solicitud</h2>
      <p className="text-gray-500 mt-2">
        Ingresa tus datos para comenzar el proceso
      </p>
    </div>
  );
};
