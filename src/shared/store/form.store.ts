import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createFormSlice, type FormSlice } from "./slices/form.slice";

export const useFormStore = create<FormSlice>()(
  persist(
    (...args) => ({
      ...createFormSlice(...args),
    }),
    {
      name: "bank-form-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        login: state.login,
        register: state.register,
        application: state.application,
        productSelection: state.productSelection,
        registerResponse: state.registerResponse,
        loginResponse: state.loginResponse,
      }),
    }
  )
);
