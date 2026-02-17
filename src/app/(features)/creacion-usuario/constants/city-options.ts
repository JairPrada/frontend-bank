export const CITY_OPTIONS = [
  { value: "bogota", label: "Bogotá" },
  { value: "medellin", label: "Medellín" },
  { value: "cali", label: "Cali" },
  { value: "barranquilla", label: "Barranquilla" },
  { value: "cartagena", label: "Cartagena" },
  { value: "bucaramanga", label: "Bucaramanga" },
  { value: "pereira", label: "Pereira" },
  { value: "manizales", label: "Manizales" },
];

export type CityValue = (typeof CITY_OPTIONS)[number]["value"];
