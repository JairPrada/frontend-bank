export const VALIDATION_MESSAGES = {
  IDENTIFICATION_REQUIRED: "El número de cédula es obligatorio",
  IDENTIFICATION_ONLY_NUMBERS: "La cédula solo debe contener números",
  IDENTIFICATION_MIN_LENGTH: "La cédula debe tener al menos 6 dígitos",
  IDENTIFICATION_MAX_LENGTH: "La cédula no puede tener más de 12 dígitos",
  DATA_TREATMENT_REQUIRED: "Debes aceptar el tratamiento de datos para continuar",
} as const;

export const FORM_CONFIG = {
  IDENTIFICATION_MIN_LENGTH: 6,
  IDENTIFICATION_MAX_LENGTH: 12,
} as const;
