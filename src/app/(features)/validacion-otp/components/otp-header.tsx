import { OtpHeaderProps } from "../interfaces";

export const OtpHeader = ({
  title = "Verificación de identidad",
  subtitle = "Ingresa el código de 6 dígitos que enviamos a tu celular",
  phoneNumber,
}: OtpHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-emerald-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500 text-sm leading-relaxed">
        {subtitle}
        {phoneNumber && (
          <span className="block mt-1 font-medium text-gray-700">
            {phoneNumber}
          </span>
        )}
      </p>
    </div>
  );
};
