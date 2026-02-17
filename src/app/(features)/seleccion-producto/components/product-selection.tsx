/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "./product-card";
import { AVAILABLE_PRODUCTS } from "../constants";
import {
  ArrowRightIcon,
  SpinnerIcon,
  ShieldIcon,
} from "@/shared/components/icons";
import Loader from "@/shared/components/loader";
import { LOADER_DELAY_MS } from "@/shared/constants";
import {
  useDocumentNumber,
  useProductSelectionStore,
  useRegisterResponse,
} from "@/shared/hooks";
import { createProduct } from "../services";
import type { CreateProductRequestDto } from "../services/dtos/create-product-request.dto";
import ROUTES from "@/routes";
import { RegisterResponseDto } from "@/shared/hooks/use-form-store";

export const ProductSelection = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setSelectedProduct: saveSelectedProduct } =
    useProductSelectionStore();
  const documentNumber = useDocumentNumber();
  const registerResponse: RegisterResponseDto = useRegisterResponse();

  const handleSelect = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleContinue = async () => {
    if (!selectedProduct) return;

    setIsSubmitting(true);

    try {
      saveSelectedProduct(selectedProduct);

      const requestBody: CreateProductRequestDto = {
        productId: selectedProduct,
        documentNumber,
        userId: registerResponse.id,
      };

      await createProduct(requestBody);
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, LOADER_DELAY_MS));
      router.push(`${ROUTES.APPLICATION_SUMMARY}?product=${selectedProduct}`);
    } catch (error) {
      console.error("Error al crear producto:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Selecciona tu producto
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Elige el producto financiero que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {AVAILABLE_PRODUCTS.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard
              product={product}
              isSelected={selectedProduct === product.id}
              onSelect={handleSelect}
            />
          </div>
        ))}
      </div>

      <div
        className="flex flex-col items-center gap-4 animate-fade-in-up"
        style={{ animationDelay: "300ms" }}
      >
        <button
          onClick={handleContinue}
          disabled={!selectedProduct || isSubmitting}
          className="w-full max-w-sm py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30"
        >
          {isSubmitting ? (
            <>
              <SpinnerIcon className="w-5 h-5 animate-spin" />
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <span>Continuar</span>
              <ArrowRightIcon className="w-5 h-5" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-emerald-600">
          <ShieldIcon className="w-4 h-4" />
          <span>Proceso seguro y encriptado</span>
        </div>
      </div>

      {isLoading && (
        <Loader
          fullScreen
          size="lg"
          variant="spinner"
          text="Preparando tu solicitud..."
        />
      )}
    </div>
  );
};
