"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OTP_CONFIG, VALIDATION_MESSAGES } from "../constants";
import { OtpHeader } from "./otp-header";
import { OtpInput } from "./otp-input";
import { ResendLink } from "./resend-link";
import { SecurityBadge } from "@/shared/components/security-badge";
import { ShieldIcon } from "@/shared/components/icons";
import Loader from "@/shared/components/loader";
import { LOADER_DELAY_MS } from "@/shared/constants";
import ROUTES from "@/routes";

export const OtpForm = () => {
  const [otpValue, setOtpValue] = useState<string[]>(
    Array(OTP_CONFIG.CODE_LENGTH).fill(""),
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOtpChange = (value: string[]) => {
    setOtpValue(value);
    if (error) setError(null);
  };

  const handleComplete = async (code: string) => {
    if (OTP_CONFIG.AUTO_SUBMIT) {
      await handleSubmit(code);
    }
  };

  const handleSubmit = async (code?: string) => {
    setIsLoading(true);

    const otpCode = code || otpValue.join("");

    if (otpCode.length !== OTP_CONFIG.CODE_LENGTH) {
      setError(VALIDATION_MESSAGES.INCOMPLETE);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await new Promise((resolve) => setTimeout(resolve, LOADER_DELAY_MS));
      router.push(ROUTES.CREATE_USER);
    } catch {
      setError(VALIDATION_MESSAGES.INVALID);
      setIsSubmitting(false);
    }
  };

  const handleResend = () => {
    setOtpValue(Array(OTP_CONFIG.CODE_LENGTH).fill(""));
    setError(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="form-card-glass bg-white rounded-2xl p-8 border border-gray-100 shadow-xl relative overflow-hidden">
        <OtpHeader phoneNumber="*** *** **45" />

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="py-4">
            <OtpInput
              length={OTP_CONFIG.CODE_LENGTH}
              value={otpValue}
              onChange={handleOtpChange}
              onComplete={handleComplete}
              hasError={!!error}
              disabled={isSubmitting}
            />

            {error && (
              <p className="mt-3 text-sm text-red-500 text-center animate-fade-in">
                {error}
              </p>
            )}
          </div>
        </form>

        <ResendLink
          onResend={handleResend}
          cooldownSeconds={OTP_CONFIG.RESEND_COOLDOWN_SECONDS}
          disabled={isSubmitting}
        />

        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-600">
            <ShieldIcon className="w-4 h-4" />
            <span>Verificación segura encriptada</span>
          </div>
        </div>
      </div>

      {isLoading && (
        <Loader
          fullScreen
          size="lg"
          variant="spinner"
          text="Cargando productos..."
        />
      )}
    </div>
  );
};
