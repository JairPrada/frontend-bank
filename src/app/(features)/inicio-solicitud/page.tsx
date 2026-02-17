"use client";

import { ApplicationForm } from "./components/application-form";
import { PageBackground } from "@/shared/components/page-background";

export default function ApplicationStartPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <PageBackground variant="light" withDecorations />
      <div className="z-10 w-full animate-fade-in-up">
        <ApplicationForm />
      </div>
    </main>
  );
}
