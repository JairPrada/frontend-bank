"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Input from "@/shared/components/input";
import { IdCardIcon, LockIcon } from "@/shared/components/icons";
import { SubmitButton } from "@/shared/components/submit-button";
import { SecurityBadge } from "@/shared/components/security-badge";
import { FORM_FIELD_CONFIG } from "@/shared/constants";
import { useLoginFormStore } from "@/shared/hooks";
import { LoginFormData } from "../interfaces";
import { loginFormSchema } from "../utils";
import { login } from "../services";
import type { LoginRequestDto } from "../services/dtos/login-request.dto";
import ROUTES from "@/routes";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setIdentificationNumber } = useLoginFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      documentNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      setIdentificationNumber(data.documentNumber);

      const requestBody: LoginRequestDto = {
        documentNumber: data.documentNumber,
        passwordHash: data.password,
      };

      await login(requestBody);
      router.push(ROUTES.PRODUCTS);
    } catch (error) {
      console.error("Error en login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="form-card-glass bg-white rounded-2xl p-8 border border-gray-100 shadow-xl relative overflow-hidden">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-emerald-500 mb-4 shadow-lg shadow-emerald-500/30">
            <IdCardIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
          <p className="text-gray-500 mt-2">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            {...register("documentNumber")}
            label="Número de Cédula"
            placeholder="Ingresa tu número de cédula"
            leftIcon={<IdCardIcon className="w-5 h-5" />}
            error={errors.documentNumber?.message}
            maxLength={FORM_FIELD_CONFIG.IDENTIFICATION_MAX_LENGTH}
          />

          <Input
            {...register("password")}
            type="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            leftIcon={<LockIcon className="w-5 h-5" />}
            error={errors.password?.message}
          />

          <SubmitButton
            isLoading={isLoading}
            loadingText="Verificando..."
            text="Ingresar"
          />
        </form>

        <SecurityBadge />
      </div>
    </div>
  );
};
