"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import Input from "@/shared/components/input";
import Select from "@/shared/components/select";
import { IdCardIcon, LockIcon } from "@/shared/components/icons";
import { SubmitButton } from "@/shared/components/submit-button";
import { SecurityBadge } from "@/shared/components/security-badge";
import {
  useDocumentNumber,
  useRegisterFormStore,
  useRegisterResponse,
} from "@/shared/hooks";
import { RegisterFormData } from "../interfaces";
import { registerFormSchema } from "../utils";
import { registerUser } from "../services";
import type { RegisterRequestDto } from "../services/dtos/register-request.dto";
import { CITY_OPTIONS } from "../constants/city-options";
import ROUTES from "@/routes";

export const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setFullName, setCity, setMonthlyIncome } = useRegisterFormStore();
  const { setRegisterResponse } = useRegisterResponse();
  const documentNumber = useDocumentNumber();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      city: "",
      monthlyIncome: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      setFullName(data.fullName);
      setCity(data.city);
      setMonthlyIncome(data.monthlyIncome);

      const requestBody: RegisterRequestDto = {
        documentNumber,
        fullName: data.fullName,
        city: data.city,
        monthlyIncome: data.monthlyIncome,
        password: data.password,
      };

      const response = await registerUser(requestBody);
      setRegisterResponse(response);
      router.push(ROUTES.SELECT_PRODUCT);
    } catch (error) {
      console.error("Error en registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="form-card-glass bg-white rounded-2xl p-8 border border-gray-100 shadow-xl relative overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("fullName")}
            label="Nombre completo"
            placeholder="Ingresa tu nombre completo"
            leftIcon={<IdCardIcon className="w-5 h-5" />}
            error={errors.fullName?.message}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select
                label="Ciudad de residencia"
                placeholder="Selecciona tu ciudad"
                options={CITY_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                error={errors.city?.message}
              />
            )}
          />

          <Input
            {...register("monthlyIncome")}
            type="number"
            label="Ingresos mensuales"
            placeholder="Ej: 3500000"
            error={errors.monthlyIncome?.message}
          />

          <Input
            {...register("password")}
            type="password"
            label="Contraseña"
            placeholder="Mínimo 8 caracteres"
            leftIcon={<LockIcon className="w-5 h-5" />}
            error={errors.password?.message}
          />

          <Input
            {...register("confirmPassword")}
            type="password"
            label="Confirmar contraseña"
            placeholder="Repite tu contraseña"
            leftIcon={<LockIcon className="w-5 h-5" />}
            error={errors.confirmPassword?.message}
          />

          <div className="pt-2">
            <SubmitButton
              isLoading={isLoading}
              loadingText="Creando cuenta..."
              text="Crear cuenta"
            />
          </div>
        </form>

        <SecurityBadge text="Tus datos están protegidos y cifrados" />
      </div>
    </div>
  );
};
