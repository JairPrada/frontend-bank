import ROUTES from "@/routes";
import type { Product, Stat } from "./products.types";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    imageSrc: "/cards/credit-icon.png",
    title: "Tarjeta de Crédito",
    description:
      "Accede a beneficios exclusivos, cashback y financiamiento flexible hasta 48 meses.",
    bgSrc: "bg-[url(/creditCard.png)]",
    accent: "from-emerald-500 to-teal-600",
    href: ROUTES.REQUEST_PRODUCT,
  },
  {
    id: 2,
    imageSrc: "/cards/saving-icon.png",
    title: "Cuenta de Ahorro",
    description:
      "Haz crecer tu dinero con las mejores tasas de interés y sin costos de mantenimiento.",
    bgSrc: "bg-[url(/creditFree.png)]",
    accent: "from-lime-500 to-emerald-600",
    href: ROUTES.REQUEST_PRODUCT,
  },
  {
    id: 3,
    imageSrc: "/cards/travel-icon.png",
    title: "Crédito Libre Inversión",
    description:
      "Financia tus proyectos con tasas preferenciales y plazos adaptados a tus necesidades.",
    bgSrc: "bg-[url(/saving.png)]",
    accent: "from-teal-500 to-cyan-600",
    href: ROUTES.REQUEST_PRODUCT,
  },
];

export const STATS: Stat[] = [
  { value: "15K+", label: "Clientes activos" },
  { value: "99.9%", label: "Disponibilidad" },
  { value: "0%", label: "Comisiones ocultas" },
  { value: "24/7", label: "Soporte en línea" },
];
