import type { ProductTabType, ProductType } from "../interfaces";

export const PRODUCT_TYPE_CONFIG: Record<
  ProductType,
  {
    gradient: string;
    shadow: string;
    badge: string;
    label: string;
    title: string;
    icon: string;
    imageSrc: string;
  }
> = {
  savings: {
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Cuenta de Ahorros",
    title: "Cuentas de Ahorro",
    icon: "",
    imageSrc: "/cards/saving-icon.png",
  },
  credit: {
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20",
    badge: "bg-violet-100 text-violet-700",
    label: "Tarjeta de Crédito",
    title: "Tarjetas de Crédito",
    icon: "",
    imageSrc: "/cards/credit-icon.png",
  },
  loan: {
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20",
    badge: "bg-amber-100 text-amber-700",
    label: "Préstamo",
    title: "Préstamos",
    icon: "",
    imageSrc: "/cards/travel-icon.png",
  },
} as const;

export const PRODUCT_TABS: { id: ProductTabType; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "savings", label: "Cuentas" },
  { id: "credit", label: "Tarjetas" },
  { id: "loan", label: "Préstamos" },
];

export const PRODUCT_TYPE_ORDER: ProductType[] = ["savings", "credit", "loan"];
