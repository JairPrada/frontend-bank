import * as yup from "yup";
import {
  identificationSchema,
  passwordSchema,
} from "@/shared/utils/validation.schemas";

export const loginFormSchema = yup.object().shape({
  documentNumber: identificationSchema,
  password: passwordSchema,
});
