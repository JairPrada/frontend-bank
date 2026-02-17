import { NEXT_STEPS } from "../constants";

export const NextSteps = () => {
  return (
    <div className="bg-slate-50 rounded-xl p-5 mb-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
      <h4 className="text-sm font-semibold text-gray-800 mb-3">Próximos pasos</h4>
      <ol className="space-y-3">
        {NEXT_STEPS.map((step, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-gray-600">
            <span className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-semibold shrink-0">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
};
