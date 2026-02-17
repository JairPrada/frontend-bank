import { useMemo } from "react";
import { PRODUCT_TYPE_ORDER } from "../constants";
import type { ProductType, UserProduct } from "../interfaces";

export function useProductsGrouping(products: UserProduct[]) {
  const productsByType = useMemo(() => {
    const grouped: Record<ProductType, UserProduct[]> = {
      savings: [],
      credit: [],
      loan: [],
    };

    products.forEach((product) => {
      grouped[product.type].push(product);
    });

    return grouped;
  }, [products]);

  const getFilteredTypes = (activeTab: "all" | ProductType): ProductType[] => {
    if (activeTab === "all") {
      return PRODUCT_TYPE_ORDER.filter((type) => productsByType[type].length > 0);
    }
    return [activeTab as ProductType];
  };

  const totalCount = products.length;

  const countByType: Record<ProductType, number> = {
    savings: productsByType.savings.length,
    credit: productsByType.credit.length,
    loan: productsByType.loan.length,
  };

  return {
    productsByType,
    getFilteredTypes,
    totalCount,
    countByType,
  };
}
