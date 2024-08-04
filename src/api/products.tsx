import { CreateProducts, UpdateProducts } from "../interface/products.interface";

// Configuración de la API
const API = import.meta.env.VITE_API_URL;

// Función para obtener productos
export const getProductsRequest = async () => {
  try {
    const response = await fetch(`${API}/productos`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-lanzar el error para que pueda ser manejado por el componente
  }
};

// Función para crear un producto
export const createProductsRequest = async (product: CreateProducts) => {
  try {
    const response = await fetch(`${API}/productos`, {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to create product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // Propagar el error para que pueda ser manejado externamente
  }
};

export const deleteProductRequest = async (code: number) => {
  try {
    const response = await fetch(`${API}/productos/${code}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    // Verificar si la respuesta tiene contenido antes de llamar a .json()
    const text = await response.text();
    return text ? JSON.parse(text) : {}; // Devolver un objeto vacío si no hay contenido
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Función para actualizar un producto
export const updateProductsRequest = async (code: number, product: UpdateProducts) => {
  try {
    const response = await fetch(`${API}/productos/${code}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to update product");
    }
    return response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Función para obtener un producto específico
export const getProductRequest = async (code: number) => {
  try {
    const response = await fetch(`${API}/productos/${code}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error; // Propagar el error para que pueda ser manejado externamente
  }
};