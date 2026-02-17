export const APPLICATION_STEPS = [
  { id: 1, label: "Datos" },
  { id: 2, label: "Verificación" },
  { id: 3, label: "Creación Usuario" },
  { id: 4, label: "Producto" },
] as const;

export type ApplicationStep = (typeof APPLICATION_STEPS)[number];
