import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Products, CreateProducts, UpdateProducts } from '../interface/products.interface';
import { getProductsRequest, createProductsRequest, deleteProductRequest, updateProductsRequest, getProductRequest } from '../api/products';

// Definición del contexto
export interface ProductsContextValue {
  products: Products[];
  createProduct: (product: CreateProducts) => Promise<void>;
  deleteProduct: (code: number) => Promise<void>;
  updateProduct: (code: number, product: UpdateProducts) => Promise<void>;
  getProduct: (code: number) => Promise<Products>;
}

export const ProductContext = createContext<ProductsContextValue | undefined>(undefined);

// Proveedor del contexto
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProductsRequest();
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const createProduct = async (product: CreateProducts) => {
    try {
      const newProduct = await createProductsRequest(product);
      setProducts([...products, newProduct]); // Actualiza la lista con el nuevo producto
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const deleteProduct = async (code: number) => {
    try {
      await deleteProductRequest(code);
      setProducts(products.filter((product) => product.code !== code));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async (code: number, product: UpdateProducts) => {
    try {
      await updateProductsRequest(code, product);
      setProducts(products.map((p) => (p.code === code ? { ...p, ...product } : p)));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const getProduct = async (code: number) => {
    try {
      const product = await getProductRequest(code);
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{ products, createProduct, deleteProduct, updateProduct, getProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useProducts = (): ProductsContextValue => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};