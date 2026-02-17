"use client";

import { useRouter } from "next/navigation";
import { SUCCESS_MESSAGES } from "../constants";
import { SuccessIcon } from "./success-icon";
import { ProductSummaryCard } from "./product-summary-card";
import { NextSteps } from "./next-steps";
import { SubmitButton } from "@/shared/components/submit-button";
import { SecurityBadge } from "@/shared/components/security-badge";
import ROUTES from "@/routes";

interface SuccessContentProps {
  productId: string;
}

export const SuccessContent = ({ productId }: SuccessContentProps) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push(ROUTES.HOME);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="form-card-glass bg-white rounded-2xl p-8 border border-gray-100 shadow-xl relative overflow-hidden">
        <div className="text-center animate-fade-in-up">
          <SuccessIcon />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {SUCCESS_MESSAGES.TITLE}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            {SUCCESS_MESSAGES.SUBTITLE}
          </p>
        </div>

        <ProductSummaryCard productId={productId} />

        <NextSteps />

        <div className="animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <SubmitButton
            text="Ir al inicio"
            type="button"
            onClick={handleGoHome}
          />
        </div>

        <SecurityBadge text="Solicitud procesada de forma segura" />
      </div>
    </div>
  );
};
