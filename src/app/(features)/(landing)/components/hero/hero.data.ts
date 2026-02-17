import ROUTES from "@/routes";
import type { HeroAction } from "./hero.types";

export const DEFAULT_HERO_BADGE = "Banca 100% Digital";

export const DEFAULT_HERO_TITLE = "Tu dinero,";

export const DEFAULT_HERO_HIGHLIGHT = "sin límites";

export const DEFAULT_HERO_SUBTITLE =
  "Abre tu cuenta en minutos. Sin filas, sin papeleos, sin comisiones ocultas.";

export const DEFAULT_PRIMARY_ACTION: HeroAction = {
  label: "Abrir cuenta gratis",
  href: ROUTES.REQUEST_PRODUCT,
};

export const DEFAULT_SECONDARY_ACTION: HeroAction = {
  label: "Iniciar sesión",
  href: ROUTES.LOGIN,
};
