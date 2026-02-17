import * as yup from "yup";
import {
  nameSchema,
  citySchema,
  monthlyIncomeSchema,
  passwordStrongSchema,
  confirmPasswordSchema,
} from "@/shared/utils/validation.schemas";

export const registerFormSchema = yup.object().shape({
  fullName: nameSchema,
  city: citySchema,
  monthlyIncome: monthlyIncomeSchema,
  password: passwordStrongSchema,
  confirmPassword: confirmPasswordSchema,
});
