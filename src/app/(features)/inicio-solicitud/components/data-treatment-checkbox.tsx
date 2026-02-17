import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ApplicationFormData } from "../interfaces/application-form.interface";
import { CheckIcon, ErrorIcon } from "@/shared/components/icons";

interface DataTreatmentCheckboxProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
  onOpenModal: () => void;
}

export const DataTreatmentCheckbox = ({
  register,
  errors,
  onOpenModal,
}: DataTreatmentCheckboxProps) => {
  const hasError = !!errors.acceptsDataTreatment;

  return (
    <div className="relative space-y-2">
      <label className="flex items-start gap-3 cursor-pointer group p-3 rounded-xl border border-transparent hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300">
        <div className="relative shrink-0 mt-0.5">
          <input
            type="checkbox"
            {...register("acceptsDataTreatment")}
            className="peer sr-only"
          />
          <div
            className={`w-5 h-5 border-2 rounded-md transition-all duration-300 
            ${hasError ? "border-red-400" : "border-gray-300 group-hover:border-emerald-400"}
            peer-checked:bg-emerald-500 peer-checked:border-emerald-500 peer-checked:shadow-[0_0_12px_rgba(16,185,129,0.4)]`}
          >
            <CheckIcon className="w-full h-full text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
          <div className="absolute inset-0 w-5 h-5 peer-checked:block hidden">
            <div className="w-full h-full bg-emerald-500 rounded-md flex items-center justify-center shadow-lg">
              <CheckIcon className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        <span className="text-sm text-gray-600 leading-relaxed">
          Acepto el{" "}
          <button
            type="button"
            className="text-emerald-600 hover:text-emerald-700 underline font-medium transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOpenModal();
            }}
          >
            tratamiento de mis datos personales
          </button>
        </span>
      </label>
      {errors.acceptsDataTreatment && (
        <p className="text-sm text-red-500 flex items-center gap-1 ml-3">
          <ErrorIcon className="w-4 h-4" />
          {errors.acceptsDataTreatment.message}
        </p>
      )}
    </div>
  );
};
