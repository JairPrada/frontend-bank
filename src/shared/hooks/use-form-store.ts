import { useFormStore } from "@/shared/store";

export const useLoginFormStore = () => {
  const login = useFormStore((state) => state.login);
  const setLoginField = useFormStore((state) => state.setLoginField);
  const resetLogin = useFormStore((state) => state.resetLogin);

  return {
    ...login,
    setIdentificationNumber: (value: string) =>
      setLoginField("documentNumber", value),
    reset: resetLogin,
  };
};

export const useRegisterFormStore = () => {
  const register = useFormStore((state) => state.register);
  const setRegisterField = useFormStore((state) => state.setRegisterField);
  const resetRegister = useFormStore((state) => state.resetRegister);

  return {
    ...register,
    setFullName: (value: string) => setRegisterField("fullName", value),
    setCity: (value: string) => setRegisterField("city", value),
    setMonthlyIncome: (value: number | null) =>
      setRegisterField("monthlyIncome", value),
    reset: resetRegister,
  };
};

export const useApplicationFormStore = () => {
  const application = useFormStore((state) => state.application);
  const setApplicationField = useFormStore(
    (state) => state.setApplicationField,
  );
  const resetApplication = useFormStore((state) => state.resetApplication);

  return {
    ...application,
    setIdentificationNumber: (value: string) =>
      setApplicationField("documentNumber", value),
    setAcceptsDataTreatment: (value: boolean) =>
      setApplicationField("acceptsDataTreatment", value),
    reset: resetApplication,
  };
};

export const useProductSelectionStore = () => {
  const productSelection = useFormStore((state) => state.productSelection);
  const setSelectedProduct = useFormStore((state) => state.setSelectedProduct);
  const resetProductSelection = useFormStore(
    (state) => state.resetProductSelection,
  );

  return {
    ...productSelection,
    setSelectedProduct,
    reset: resetProductSelection,
  };
};

export const useResetAllForms = () => {
  return useFormStore((state) => state.resetAllForms);
};
