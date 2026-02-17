import type { UserProduct, ProductTabType, ProductType } from "../interfaces";

export const MOCK_PRODUCTS: UserProduct[] = [
  {
    id: "1",
    name: "Cuenta Digital",
    type: "savings",
    description: "Sin comisiones de manejo, 100% digital.",
    imageSrc: "/cards/saving-icon.png",
    accountNumber: "****7821",
    balance: "$8,320,000",
    status: "active",
    lastMovement: "Hoy, 9:15 AM",
    rate: "4.0% EA",
  },
  {
    id: "2",
    name: "Cuenta de Ahorro Premium",
    type: "savings",
    description: "Haz crecer tu dinero con las mejores tasas de interés.",
    imageSrc: "/cards/saving-icon.png",
    accountNumber: "****4532",
    balance: "$12,450,000",
    status: "active",
    lastMovement: "Ayer, 3:45 PM",
    rate: "4.5% EA",
  },
  {
    id: "3",
    name: "Tarjeta Clásica",
    type: "credit",
    description: "Accede a beneficios exclusivos y cashback.",
    imageSrc: "/cards/credit-icon.png",
    accountNumber: "****1234",
    balance: "$1,250,000",
    limit: "$8,000,000",
    status: "active",
    lastMovement: "Hace 3 días",
  },
  {
    id: "4",
    name: "Tarjeta de Crédito Gold",
    type: "credit",
    description: "Beneficios premium, millas y financiamiento flexible.",
    imageSrc: "/cards/credit-icon.png",
    accountNumber: "****5678",
    balance: "$2,150,000",
    limit: "$15,000,000",
    status: "active",
    lastMovement: "Hace 2 días",
  },
  {
    id: "5",
    name: "Crédito Libre Inversión",
    type: "loan",
    description: "Financia tus proyectos con tasas preferenciales.",
    imageSrc: "/cards/travel-icon.png",
    balance: "$18,500,000",
    status: "active",
    rate: "1.2% MV",
    lastMovement: "Cuota: 15 de cada mes",
  },
  {
    id: "6",
    name: "Crédito de Vehículo",
    type: "loan",
    description: "Tu carro nuevo con las mejores condiciones.",
    imageSrc: "/cards/travel-icon.png",
    balance: "$45,000,000",
    status: "active",
    rate: "0.95% MV",
    lastMovement: "Cuota: 5 de cada mes",
  },
];

export const PRODUCT_TYPE_CONFIG: Record<ProductType, {
  gradient: string;
  shadow: string;
  badge: string;
  label: string;
  title: string;
  icon: string;
}> = {
  savings: {
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Cuenta de Ahorros",
    title: "Cuentas de Ahorro",
    icon: "",
  },
  credit: {
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20",
    badge: "bg-violet-100 text-violet-700",
    label: "Tarjeta de Crédito",
    title: "Tarjetas de Crédito",
    icon: "",
  },
  loan: {
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20",
    badge: "bg-amber-100 text-amber-700",
    label: "Préstamo",
    title: "Préstamos",
    icon: "",
  },
} as const;

export const PRODUCT_TABS: { id: ProductTabType; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "savings", label: "Cuentas" },
  { id: "credit", label: "Tarjetas" },
  { id: "loan", label: "Préstamos" },
];

export const PRODUCT_TYPE_ORDER: ProductType[] = ["savings", "credit", "loan"];
