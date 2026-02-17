"use client";

import { useState, useEffect, useCallback } from "react";
import { ResendLinkProps } from "../interfaces";

export const ResendLink = ({
  onResend,
  cooldownSeconds,
  disabled = false,
}: ResendLinkProps) => {
  const [countdown, setCountdown] = useState(cooldownSeconds);

  const isActive = countdown > 0;

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = useCallback(() => {
    if (disabled || isActive) return;
    
    onResend();
    setCountdown(cooldownSeconds);
  }, [disabled, isActive, onResend, cooldownSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, "0")}` : `${secs}s`;
  };

  return (
    <div className="text-center mt-6">
      <p className="text-sm text-gray-500">
        ¿No recibiste el código?{" "}
        {isActive ? (
          <span className="text-gray-400">
            Reenviar en <span className="font-medium">{formatTime(countdown)}</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={disabled}
            className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reenviar código
          </button>
        )}
      </p>
    </div>
  );
};
