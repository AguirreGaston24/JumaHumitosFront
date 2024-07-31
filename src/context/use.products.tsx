import { useContext } from "react";
import { ProductContext, ProductsContextValue } from "../context/products.context";

export const useProducts = (): ProductsContextValue => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};