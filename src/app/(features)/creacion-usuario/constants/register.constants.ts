export const REGISTER_STEPS = [
  { id: 1, label: "Datos" },
  { id: 2, label: "Contraseña" },
] as const;

export const REGISTER_CURRENT_STEP = 3;

export const VALIDATION_MESSAGES = {
  NAME_REQUIRED: "El nombre es obligatorio",
  NAME_MIN: "El nombre debe tener al menos 3 caracteres",
  NAME_MAX: "El nombre no puede exceder 50 caracteres",
  CITY_REQUIRED: "La ciudad es obligatoria",
  CITY_MIN: "La ciudad debe tener al menos 2 caracteres",
  MONTHLY_INCOME_REQUIRED: "Los ingresos mensuales son obligatorios",
  MONTHLY_INCOME_MIN: "Los ingresos deben ser mayores a 0",
  PASSWORD_REQUIRED: "La contraseña es obligatoria",
  PASSWORD_MIN: "La contraseña debe tener al menos 8 caracteres",
  PASSWORD_UPPERCASE: "La contraseña debe tener al menos una mayúscula",
  PASSWORD_LOWERCASE: "La contraseña debe tener al menos una minúscula",
  PASSWORD_NUMBER: "La contraseña debe tener al menos un número",
  CONFIRM_PASSWORD_REQUIRED: "Confirma tu contraseña",
  CONFIRM_PASSWORD_MATCH: "Las contraseñas no coinciden",
} as const;

export const FORM_CONFIG = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
  CITY_MIN_LENGTH: 2,
  PASSWORD_MIN_LENGTH: 8,
} as const;
