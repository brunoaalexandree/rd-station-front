// src/hooks/useProducts.ts

import { useEffect, useState } from "react";
import getProducts from "../services/product.service";
import { Product } from "@/@types";

interface UseProductsResult {
  preferences: string[];
  features: string[];
  products: Product[];
}

const useProducts = (): UseProductsResult => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts: Product[] = await getProducts();
        const allPreferences: string[] = [];
        const allFeatures: string[] = [];

        setProducts(fetchedProducts);

        fetchedProducts.forEach((product) => {
          // Evita mutação direta do array original usando spread operator
          const productPreferences = [...product.preferences]
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          allPreferences.push(...productPreferences);

          const productFeatures = [...product.features]
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          allFeatures.push(...productFeatures);
        });

        setPreferences(allPreferences);
        setFeatures(allFeatures);
      } catch (error) {
        console.error("Erro ao obter os produtos:", error);
      }
    };

    fetchData();
  }, []);

  return { preferences, features, products };
};

export default useProducts;
