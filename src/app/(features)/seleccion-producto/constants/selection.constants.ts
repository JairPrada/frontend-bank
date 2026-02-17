import type { Product } from "../interfaces/selection.interface";

export const SELECTION_CURRENT_STEP = 4;

export const AVAILABLE_PRODUCTS: Product[] = [
  {
    id: "credit-card",
    imageSrc: "/cards/credit-icon.png",
    title: "Tarjeta de Crédito",
    description: "Accede a beneficios exclusivos, cashback y financiamiento flexible.",
    bgSrc: "bg-[url(/creditCard.png)]",
  },
  {
    id: "savings-account",
    imageSrc: "/cards/saving-icon.png",
    title: "Cuenta de Ahorro",
    description: "Haz crecer tu dinero con las mejores tasas de interés.",
    bgSrc: "bg-[url(/creditFree.png)]",
  },
  {
    id: "free-investment",
    imageSrc: "/cards/travel-icon.png",
    title: "Crédito Libre Inversión",
    description: "Financia tus proyectos con tasas preferenciales.",
    bgSrc: "bg-[url(/saving.png)]",
  },
];
