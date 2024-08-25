import { useContext } from "react";
import { ProductContext, ProductsContextValue } from "../context/products.context";

// Hook personalizado para acceder al contexto de productos
export const useProducts = (): ProductsContextValue => {
  // Obtiene el contexto usando useContext
  const context = useContext(ProductContext);

  // Verifica si el contexto es undefined, lo que significa que no está dentro de un ProductProvider
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  // Devuelve el contexto si está disponible
  return context;
};