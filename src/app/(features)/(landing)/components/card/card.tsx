import Button from "@/shared/components/button/button";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  bgSrc?: string;
  href?: string;
}

function Card({
  imageSrc = "/cards/credit-icon.png",
  title = "Tarjeta de crédito",
  description = "Disfrute de promociones exclusivas con nuestra tarjeta",
  bgSrc = "/creditCard.png",
  href = "#",
}: CardProps) {
  return (
    <div className="group relative mx-auto w-80 h-105 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500">
      <div className="absolute inset-0 bg-linear-to-br from-white to-slate-50 p-8 flex flex-col items-center justify-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
        <div className="w-24 h-24 mb-6 rounded-2xl bg-linear-to-br from-emerald-50 to-emerald-100 flex items-center justify-center shadow-sm">
          <Image
            src={imageSrc}
            alt={title}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>

        <h3 className="text-xl font-bold text-slate-800 text-center mb-3">
          {title}
        </h3>
        <p className="text-sm text-slate-500 text-center leading-relaxed max-w-55">
          {description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-emerald-600 text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity">
          <span>Ver más</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-emerald-500/5 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-emerald-500/5 to-transparent rounded-tr-full" />
      </div>

      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-500 opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 ${bgSrc}`}
      >
        <div className="absolute inset-0 bg-linear-to-t from-emerald-950 via-emerald-900/80 to-emerald-800/40" />

        <div className="relative h-full flex flex-col justify-end p-6">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
            <span className="inline-block px-3 py-1 bg-lime-200/90 text-emerald-800 text-xs font-semibold rounded-full mb-3">
              Disponible
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-5">
              {description}
            </p>
            <Link href={href}>
              <Button variant="primary" className="w-full justify-center">
                Solicitar ahora
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-slate-200/50 group-hover:border-transparent transition-colors duration-300 pointer-events-none" />
    </div>
  );
}

export default Card;
