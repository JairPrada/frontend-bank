export interface OtpFormData {
  code: string[];
}

export interface OtpInputProps {
  length: number;
  value: string[];
  onChange: (value: string[]) => void;
  onComplete?: (code: string) => void;
  hasError?: boolean;
  disabled?: boolean;
}

export interface OtpHeaderProps {
  title?: string;
  subtitle?: string;
  phoneNumber?: string;
}

export interface ResendLinkProps {
  onResend: () => void;
  cooldownSeconds: number;
  disabled?: boolean;
}
