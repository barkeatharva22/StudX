import React, { createContext, useContext, useState } from "react";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";

interface ProductsContextValue {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: `${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
