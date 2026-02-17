"use client";

import Stepper from "@/shared/components/stepper";
import { RegisterForm } from "./components";
import { APPLICATION_STEPS } from "@/shared/constants";
import { REGISTER_CURRENT_STEP } from "./constants";
import { PageBackground } from "@/shared/components/page-background";

const RegisterPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <PageBackground variant="light" withDecorations />
      <div className="z-10 w-full animate-fade-in-up">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Stepper
              steps={[...APPLICATION_STEPS]}
              currentStep={REGISTER_CURRENT_STEP}
            />
          </div>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
