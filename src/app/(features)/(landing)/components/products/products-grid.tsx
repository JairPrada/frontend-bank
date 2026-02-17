"use client";

import { useInView } from "@/shared/hooks/use-in-view";
import Card from "../card/card";
import type { Product } from "./products.types";

interface ProductsGridProps {
  products: Product[];
  onProductHover: (index: number) => void;
}

const CARD_DELAYS = [0, 150, 300];

export function ProductsGrid({ products, onProductHover }: ProductsGridProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
    >
      {products.map((product, idx) => (
        <div
          key={product.id}
          className={`transform transition-all duration-700 ${
            idx === 1 ? "lg:-translate-y-8" : ""
          } ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: `${CARD_DELAYS[idx] || 0}ms` }}
          onMouseEnter={() => onProductHover(idx)}
        >
          <Card
            imageSrc={product.imageSrc}
            title={product.title}
            description={product.description}
            bgSrc={product.bgSrc}
            href={product.href}
          />
        </div>
      ))}
    </div>
  );
}
