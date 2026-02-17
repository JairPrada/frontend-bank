import { useState, useEffect } from "react";
import { getProducts } from "../services";
import type { UserProduct } from "../interfaces";

export function useFetchProducts(userId: string) {
  const [products, setProducts] = useState<UserProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProducts(userId);

      const images = {
        savings: "/cards/saving-icon.png",
        credit: "/cards/credit-icon.png",
        loans: "/cards/travel-icon.png",
      };

      const processedData = data.map((p: any) => ({
        ...p,
        imageSrc: images[p.type],
      }));
      console.log("🚀 ~ refetch ~ data:", processedData);
      setProducts(processedData);
    } catch (err) {
      console.error("Error al obtener productos:", err);
      setError("No se pudieron cargar los productos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId]);

  return {
    products,
    setProducts,
    isLoading,
    error,
    refetch,
  };
}
