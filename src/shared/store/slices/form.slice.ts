import type { StateCreator } from "zustand";

export interface LoginFormState {
  documentNumber: string;
}

export interface RegisterFormState {
  fullName: string;
  city: string;
  monthlyIncome: number | null;
}

export interface ApplicationFormState {
  documentNumber: string;
  acceptsDataTreatment: boolean;
}

export interface ProductSelectionState {
  selectedProductId: string | null;
}

export interface FormState {
  login: LoginFormState;
  register: RegisterFormState;
  application: ApplicationFormState;
  productSelection: ProductSelectionState;
}

export interface FormActions {
  setLoginField: <K extends keyof LoginFormState>(
    field: K,
    value: LoginFormState[K],
  ) => void;
  setRegisterField: <K extends keyof RegisterFormState>(
    field: K,
    value: RegisterFormState[K],
  ) => void;
  setApplicationField: <K extends keyof ApplicationFormState>(
    field: K,
    value: ApplicationFormState[K],
  ) => void;
  setSelectedProduct: (productId: string | null) => void;
  resetLogin: () => void;
  resetRegister: () => void;
  resetApplication: () => void;
  resetProductSelection: () => void;
  resetAllForms: () => void;
}

export type FormSlice = FormState & FormActions;

const initialLoginState: LoginFormState = {
  documentNumber: "",
};

const initialRegisterState: RegisterFormState = {
  fullName: "",
  city: "",
  monthlyIncome: null,
};

const initialApplicationState: ApplicationFormState = {
  documentNumber: "",
  acceptsDataTreatment: false,
};

const initialProductSelectionState: ProductSelectionState = {
  selectedProductId: null,
};

export const createFormSlice: StateCreator<FormSlice> = (set) => ({
  login: initialLoginState,
  register: initialRegisterState,
  application: initialApplicationState,
  productSelection: initialProductSelectionState,

  setLoginField: (field, value) =>
    set((state) => ({
      login: { ...state.login, [field]: value },
    })),

  setRegisterField: (field, value) =>
    set((state) => ({
      register: { ...state.register, [field]: value },
    })),

  setApplicationField: (field, value) =>
    set((state) => ({
      application: { ...state.application, [field]: value },
    })),

  setSelectedProduct: (productId) =>
    set(() => ({
      productSelection: { selectedProductId: productId },
    })),

  resetLogin: () => set(() => ({ login: initialLoginState })),
  resetRegister: () => set(() => ({ register: initialRegisterState })),
  resetApplication: () => set(() => ({ application: initialApplicationState })),
  resetProductSelection: () =>
    set(() => ({ productSelection: initialProductSelectionState })),

  resetAllForms: () =>
    set(() => ({
      login: initialLoginState,
      register: initialRegisterState,
      application: initialApplicationState,
      productSelection: initialProductSelectionState,
    })),
});
