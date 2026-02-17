"use client";

import Image from "next/image";
import { ProductCardProps } from "../interfaces";

export const ProductCard = ({ product, isSelected, onSelect }: ProductCardProps) => {
  return (
    <div
      onClick={() => onSelect(product.id)}
      className={`group relative w-full max-w-xs mx-auto h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected
          ? "ring-2 ring-emerald-500 ring-offset-2 shadow-xl shadow-emerald-500/20 scale-[1.02]"
          : "shadow-lg hover:shadow-xl hover:scale-[1.01]"
      }`}
    >
      <div
        className={`absolute inset-0 bg-white p-6 flex flex-col items-center justify-center transition-all duration-500 ${
          isSelected ? "opacity-0 scale-95" : "group-hover:opacity-0 group-hover:scale-95"
        }`}
      >
        <div className="w-20 h-20 mb-5 rounded-xl bg-emerald-50 flex items-center justify-center">
          <Image
            src={product.imageSrc}
            alt={product.title}
            width={56}
            height={56}
            className="object-contain"
          />
        </div>

        <h3 className="text-lg font-bold text-slate-800 text-center mb-2">
          {product.title}
        </h3>
        <p className="text-sm text-slate-500 text-center leading-relaxed px-2">
          {product.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-emerald-600 text-sm font-medium">
          <span>Seleccionar</span>
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
      </div>

      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${product.bgSrc} ${
          isSelected ? "opacity-100 scale-100" : "opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100"
        }`}
      >
        <div className="absolute inset-0 bg-linear-to-t from-emerald-950 via-emerald-900/80 to-emerald-800/40" />

        <div className="relative h-full flex flex-col justify-end p-5">
          <div
            className={`transform transition-transform duration-500 delay-100 ${
              isSelected ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"
            }`}
          >
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 transition-colors ${
                isSelected
                  ? "bg-emerald-500 text-white"
                  : "bg-lime-200/90 text-emerald-800"
              }`}
            >
              {isSelected ? "✓ Seleccionado" : "Disponible"}
            </span>
            <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 rounded-2xl border transition-colors duration-300 pointer-events-none ${
          isSelected ? "border-emerald-500" : "border-slate-200/50 group-hover:border-transparent"
        }`}
      />
    </div>
  );
};
