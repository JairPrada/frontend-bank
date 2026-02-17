export function HeroCreditCard() {
  return (
    <div className="relative animate-fade-in-right">
      <div className="relative w-72 sm:w-80 lg:w-96 h-44 sm:h-48 lg:h-56 bg-linear-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-2xl shadow-2xl p-4 sm:p-5 lg:p-6 transform animate-float hover:pause hover:rotate-0 transition-transform duration-500">
        <div className="w-12 h-9 bg-linear-to-br from-yellow-300 to-yellow-500 rounded-md mb-6" />

        <div className="flex gap-4 text-white/90 text-lg font-mono tracking-wider mb-6">
          <span>••••</span>
          <span>••••</span>
          <span>••••</span>
          <span>1234</span>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/60 text-xs uppercase">Titular</p>
            <p className="text-white font-medium">Juan Pérez</p>
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase">Vence</p>
            <p className="text-white font-medium">12/28</p>
          </div>
          <div className="text-right">
            <p className="text-lime-200 font-bold text-xl">NeoBank</p>
          </div>
        </div>

        <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/20 rounded-full" />
        <div className="absolute top-8 right-8 w-12 h-12 border-2 border-white/10 rounded-full" />
      </div>

      <div className="absolute -z-10 top-6 sm:top-8 -left-3 sm:-left-4 w-72 sm:w-80 lg:w-96 h-44 sm:h-48 lg:h-56 bg-linear-to-br from-lime-200 to-lime-300 rounded-2xl shadow-xl transform -rotate-6" />
    </div>
  );
}
