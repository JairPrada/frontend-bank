import { ClockIcon, CheckCircleIcon } from "@/shared/components/icons";
import { PageBackground } from "@/shared/components/page-background";

interface ProductsHeaderProps {
  currentTime: string;
  totalProducts: number;
}

export function ProductsHeader({ currentTime, totalProducts }: ProductsHeaderProps) {
  return (
    <header className="relative bg-linear-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-hidden">
      <PageBackground variant="hero" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium">
              <ClockIcon className="w-4 h-4" />
              {currentTime || "--:--"}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Mis Productos Financieros
            </h1>
            <p className="text-slate-300 text-lg max-w-md">
              Administra tu portafolio bancario de forma segura y eficiente
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 min-w-35 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <CheckCircleIcon className="w-4 h-4" />
                Productos
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white">
                {totalProducts}
              </p>
              <p className="text-slate-400 text-xs mt-1">Activos</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
