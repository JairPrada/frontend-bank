export const SUCCESS_MESSAGES = {
  TITLE: "¡Felicitaciones!",
  SUBTITLE: "Tu solicitud ha sido procesada exitosamente",
  PRODUCT_READY: "Tu producto está listo",
  NEXT_STEPS_TITLE: "Próximos pasos",
} as const;

export const PRODUCT_DETAILS: Record<string, {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}> = {
  "credit-card": {
    title: "Tarjeta de Crédito",
    description: "Tu tarjeta de crédito ha sido aprobada y estará lista en 24 horas.",
    icon: "/cards/credit-icon.png",
    benefits: [
      "Límite de crédito aprobado",
      "Cashback en todas tus compras",
      "Sin cuota de manejo el primer año",
    ],
  },
  "savings-account": {
    title: "Cuenta de Ahorro",
    description: "Tu cuenta de ahorro ha sido creada exitosamente.",
    icon: "/cards/saving-icon.png",
    benefits: [
      "Sin costos de mantenimiento",
      "Interés competitivo del mercado",
      "Transferencias ilimitadas",
    ],
  },
  "free-investment": {
    title: "Crédito Libre Inversión",
    description: "Tu crédito ha sido pre-aprobado. Un asesor te contactará pronto.",
    icon: "/cards/travel-icon.png",
    benefits: [
      "Tasa preferencial aprobada",
      "Plazos flexibles hasta 60 meses",
      "Desembolso en 48 horas",
    ],
  },
};

export const NEXT_STEPS = [
  "Recibirás un correo de confirmación",
  "Un asesor te contactará en las próximas 24 horas",
  "Prepara tu documento de identidad para la activación",
] as const;
