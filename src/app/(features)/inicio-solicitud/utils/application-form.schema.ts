import * as yup from "yup";
import { identificationSchema, dataTreatmentSchema } from "@/shared/utils/validation.schemas";

export const applicationFormSchema = yup.object().shape({
  documentNumber: identificationSchema,
  acceptsDataTreatment: dataTreatmentSchema,
});
