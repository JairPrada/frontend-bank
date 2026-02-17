"use client";

import { useSearchParams } from "next/navigation";
import { SuccessContent } from "./components";
import { PageBackground } from "@/shared/components/page-background";

const DEFAULT_PRODUCT = "free-investment";

export default function ApplicationSummaryPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product") || DEFAULT_PRODUCT;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
      <PageBackground variant="light" withDecorations extraCenterCircle />

      <div className="z-10 w-full">
        <SuccessContent productId={productId} />
      </div>
    </main>
  );
}