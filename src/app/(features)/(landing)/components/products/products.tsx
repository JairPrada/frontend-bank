"use client";

import { useState } from "react";
import { PRODUCTS, STATS } from "./products.data";
import { ProductsBackground } from "./products-background";
import { ProductsHeader } from "./products-header";
import { ProductsGrid } from "./products-grid";
import { ProductsStats } from "./products-stats";

const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-20 bg-linear-to-b from-slate-50 to-white overflow-hidden">
      <ProductsBackground />

      <div className="relative max-w-7xl mx-auto px-6">
        <ProductsHeader
          activeIndex={activeIndex}
          totalProducts={PRODUCTS.length}
          onIndicatorClick={setActiveIndex}
        />

        <ProductsGrid products={PRODUCTS} onProductHover={setActiveIndex} />

        <ProductsStats stats={STATS} />
      </div>
    </section>
  );
};

export default Products;
