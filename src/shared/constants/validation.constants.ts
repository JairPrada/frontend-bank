export const VALIDATION_CONFIG = {
  IDENTIFICATION: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 12,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
  },
  NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
  },
  CITY: {
    MIN_LENGTH: 2,
  },
} as const;

export const VALIDATION_MESSAGES = {
  IDENTIFICATION: {
    REQUIRED: "El número de cédula es obligatorio",
    NUMERIC: "La cédula solo debe contener números",
    MIN_LENGTH: `La cédula debe tener al menos ${VALIDATION_CONFIG.IDENTIFICATION.MIN_LENGTH} dígitos`,
    MAX_LENGTH: `La cédula no puede tener más de ${VALIDATION_CONFIG.IDENTIFICATION.MAX_LENGTH} dígitos`,
  },
  PASSWORD: {
    REQUIRED: "La contraseña es obligatoria",
    MIN_LENGTH: `La contraseña debe tener al menos ${VALIDATION_CONFIG.PASSWORD.MIN_LENGTH} caracteres`,
    UPPERCASE: "La contraseña debe tener al menos una mayúscula",
    LOWERCASE: "La contraseña debe tener al menos una minúscula",
    NUMBER: "La contraseña debe tener al menos un número",
  },
  CONFIRM_PASSWORD: {
    REQUIRED: "Confirma tu contraseña",
    MATCH: "Las contraseñas no coinciden",
  },
  NAME: {
    REQUIRED: "El nombre es obligatorio",
    MIN_LENGTH: `El nombre debe tener al menos ${VALIDATION_CONFIG.NAME.MIN_LENGTH} caracteres`,
    MAX_LENGTH: `El nombre no puede exceder ${VALIDATION_CONFIG.NAME.MAX_LENGTH} caracteres`,
  },
  CITY: {
    REQUIRED: "La ciudad es obligatoria",
    MIN_LENGTH: `La ciudad debe tener al menos ${VALIDATION_CONFIG.CITY.MIN_LENGTH} caracteres`,
  },
  MONTHLY_INCOME: {
    REQUIRED: "Los ingresos mensuales son obligatorios",
    MIN: "Los ingresos deben ser mayores a 0",
  },
  DATA_TREATMENT: {
    REQUIRED: "Debes aceptar el tratamiento de datos para continuar",
  },
} as const;
