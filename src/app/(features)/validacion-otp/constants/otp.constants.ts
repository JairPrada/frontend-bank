export const OTP_CONFIG = {
  CODE_LENGTH: 6,
  RESEND_COOLDOWN_SECONDS: 60,
  AUTO_SUBMIT: true,
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED: "El código es obligatorio",
  INCOMPLETE: "Ingresa todos los dígitos del código",
  INVALID: "El código ingresado no es válido",
} as const;

export const OTP_CURRENT_STEP = 2;
