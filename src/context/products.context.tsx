import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Products, CreateProducts, UpdateProducts } from '../interface/products.interface';
import { getProductsRequest, sellProductRequest, createProductsRequest, deleteProductRequest, updateProductsRequest, getProductRequest, getProductByCodeRequest } from '../api/products';

// Definición del contexto
export interface ProductsContextValue {
  products: Products[];
  createProduct: (product: CreateProducts) => Promise<void>;
  deleteProduct: (code: number) => Promise<void>;
  updateProduct: (code: number, product: UpdateProducts) => Promise<void>;
  getProduct: (code: number) => Promise<Products>;
  getProductByCode: (code: number) => Promise<Products>; // Nueva función para obtener producto por código
  sellProduct: (code: number) => Promise<void>; // Función para vender un producto
}

export const ProductContext = createContext<ProductsContextValue | undefined>(undefined);

// Proveedor del contexto
export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Products[]>([]);

  // Fetch inicial de productos al montar el componente
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

  // Función para crear un nuevo producto
  const createProduct = async (product: CreateProducts) => {
    try {
      const newProduct = await createProductsRequest(product);
      setProducts([...products, newProduct]); // Actualiza la lista de productos
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  // Función para eliminar un producto por código
  const deleteProduct = async (code: number) => {
    try {
      await deleteProductRequest(code);
      setProducts(products.filter((product) => product.code !== code)); // Actualiza la lista de productos
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Función para actualizar un producto por código
  const updateProduct = async (code: number, product: UpdateProducts) => {
    try {
      await updateProductsRequest(code, product);
      setProducts(products.map((p) => (p.code === code ? { ...p, ...product } : p))); // Actualiza el producto en la lista
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Función para obtener un producto por código
  const getProduct = async (code: number) => {
    try {
      const product = await getProductRequest(code);
      return product;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };

  // Función para obtener un producto por código usando un endpoint diferente
  const getProductByCode = async (code: number) => {
    try {
      const product = await getProductByCodeRequest(code);
      return product;
    } catch (error) {
      console.error("Error fetching product by code:", error);
      throw error;
    }
  };

  // Función para marcar un producto como vendido
  const sellProduct = async (code: number) => {
    try {
      await sellProductRequest(code);
      setProducts(products.map(p => 
        p.code === code 
          ? { ...p, sold: true, salesCount: (p.salesCount || 0) + 1 } 
          : p
      ));
    } catch (error) {
      console.error("Error selling product:", error);
    }
  };
  
  return (
    <ProductContext.Provider value={{ products, createProduct, deleteProduct, updateProduct, getProduct, getProductByCode, sellProduct }}>
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