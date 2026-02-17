"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApplicationFormData } from "../interfaces/application-form.interface";
import { applicationFormSchema } from "../utils/application-form.schema";
import { FORM_CONFIG } from "../constants/form.constants";
import Input from "@/shared/components/input";
import Loader from "@/shared/components/loader";
import { IdCardIcon } from "@/shared/components/icons";
import { SubmitButton } from "@/shared/components/submit-button";
import { useApplicationFormStore } from "@/shared/hooks";
import { startApplication } from "../services";
import type { StartApplicationRequestDto } from "../services/dtos/start-application-request.dto";
import { FormHeader } from "./form-header";
import { FormFooter } from "./form-footer";
import { DataTreatmentCheckbox } from "./data-treatment-checkbox";
import { DataTreatmentModal } from "./data-treatment-modal";
import ROUTES from "@/routes";

export const ApplicationForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setIdentificationNumber, setAcceptsDataTreatment } = useApplicationFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: yupResolver(applicationFormSchema),
    defaultValues: {
      documentNumber: "",
      acceptsDataTreatment: false,
    },
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsLoading(true);
    try {
      setIdentificationNumber(data.documentNumber);
      setAcceptsDataTreatment(data.acceptsDataTreatment);

      const requestBody: StartApplicationRequestDto = {
        documentNumber: data.documentNumber,
        acceptsDataTreatment: data.acceptsDataTreatment,
      };

      await startApplication(requestBody);
      router.push(ROUTES.OTP_VALIDATE);
    } catch (error) {
      console.error("Error al iniciar solicitud:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="form-card-glass bg-white rounded-2xl p-8 border border-gray-100 shadow-xl relative overflow-hidden">
        <FormHeader />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              {...register("documentNumber")}
              label="Número de Cédula"
              placeholder="Ej: 1234567890"
              error={errors.documentNumber?.message}
              leftIcon={<IdCardIcon className="w-5 h-5" />}
              type="text"
              inputMode="numeric"
              maxLength={FORM_CONFIG.IDENTIFICATION_MAX_LENGTH}
            />
          </div>

          <DataTreatmentCheckbox
            register={register}
            errors={errors}
            onOpenModal={handleOpenModal}
          />

          <SubmitButton isLoading={isSubmitting} text="Iniciar Solicitud" />
        </form>

        <FormFooter />
      </div>

      <DataTreatmentModal isOpen={isModalOpen} onClose={handleCloseModal} />

      {isLoading && (
        <Loader
          fullScreen
          size="lg"
          variant="spinner"
          text="Procesando solicitud..."
        />
      )}
    </div>
  );
};

export default ApplicationForm;
