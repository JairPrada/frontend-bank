"use client";

import { ProductSelection } from "./components";
import { SELECTION_CURRENT_STEP } from "./constants";
import { APPLICATION_STEPS } from "@/shared/constants";
import Stepper from "@/shared/components/stepper";
import { PageBackground } from "@/shared/components/page-background";

export default function SelectProductPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <PageBackground variant="light" withDecorations extraCenterCircle />

      <div className="z-10 w-full max-w-md mb-8 animate-fade-in-up">
        <Stepper steps={[...APPLICATION_STEPS]} currentStep={SELECTION_CURRENT_STEP} />
      </div>

      <div className="z-10 w-full animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <ProductSelection />
      </div>
    </main>
  );
}
