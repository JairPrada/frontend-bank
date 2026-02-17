export const VALIDATION_MESSAGES = {
  IDENTIFICATION_REQUIRED: "El número de cédula es obligatorio",
  IDENTIFICATION_MIN: "La cédula debe tener al menos 6 dígitos",
  IDENTIFICATION_MAX: "La cédula no puede exceder 15 dígitos",
  IDENTIFICATION_NUMERIC: "La cédula solo debe contener números",
  PASSWORD_REQUIRED: "La contraseña es obligatoria",
  PASSWORD_MIN: "La contraseña debe tener al menos 8 caracteres",
} as const;

export const FORM_CONFIG = {
  IDENTIFICATION_MIN_LENGTH: 6,
  IDENTIFICATION_MAX_LENGTH: 15,
  PASSWORD_MIN_LENGTH: 8,
} as const;
