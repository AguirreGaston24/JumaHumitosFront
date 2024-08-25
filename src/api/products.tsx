import { CreateProducts, UpdateProducts } from "../interface/products.interface";
import axios from 'axios';

// Configuración de la API usando una variable de entorno
const API = import.meta.env.VITE_API_URL;

// Función para obtener todos los productos
export const getProductsRequest = async () => {
  try {
    const response = await fetch(`${API}/productos`); // Realiza una solicitud GET para obtener todos los productos
    if (!response.ok) {
      throw new Error("Failed to fetch products"); // Lanza un error si la respuesta no es exitosa
    }
    const data = await response.json(); // Convierte la respuesta en JSON
    return data; // Retorna los datos de los productos
  } catch (error) {
    console.error("Error fetching products:", error); // Imprime el error en la consola
    throw error; // Re-lanza el error para que pueda ser manejado por el componente
  }
};

// Función para crear un nuevo producto
export const createProductsRequest = async (product: CreateProducts) => {
  try {
    const response = await fetch(`${API}/productos`, {
      method: "POST", // Método POST para crear un nuevo producto
      body: JSON.stringify(product), // Convierte el objeto del producto en una cadena JSON
      headers: {
        "Content-Type": "application/json", // Indica que el contenido es JSON
      },
    });
    if (!response.ok) {
      throw new Error("Failed to create product"); // Lanza un error si la respuesta no es exitosa
    }
    const data = await response.json(); // Convierte la respuesta en JSON
    return data; // Retorna los datos del producto creado
  } catch (error) {
    console.error("Error creating product:", error); // Imprime el error en la consola
    throw error; // Propaga el error para que pueda ser manejado externamente
  }
};

// Función para eliminar un producto por su código
export const deleteProductRequest = async (code: number) => {
  try {
    const response = await fetch(`${API}/productos/${code}`, {
      method: "DELETE", // Método DELETE para eliminar el producto
    });

    if (!response.ok) {
      throw new Error("Failed to delete product"); // Lanza un error si la respuesta no es exitosa
    }

    // Verificar si la respuesta tiene contenido antes de intentar parsear
    const text = await response.text(); // Lee la respuesta como texto
    return text ? JSON.parse(text) : {}; // Convierte el texto en JSON si hay contenido, de lo contrario, retorna un objeto vacío
  } catch (error) {
    console.error("Error deleting product:", error); // Imprime el error en la consola
    throw error; // Propaga el error para que pueda ser manejado externamente
  }
};

// Función para actualizar un producto por su código
export const updateProductsRequest = async (code: number, product: UpdateProducts) => {
  try {
    const response = await fetch(`${API}/productos/${code}`, {
      method: "PUT", // Método PUT para actualizar el producto
      body: JSON.stringify(product), // Convierte el objeto del producto en una cadena JSON
      headers: {
        "Content-Type": "application/json", // Indica que el contenido es JSON
      },
    });
    if (!response.ok) {
      throw new Error("Failed to update product"); // Lanza un error si la respuesta no es exitosa
    }
    return response.json(); // Convierte la respuesta en JSON
  } catch (error) {
    console.error("Error updating product:", error); // Imprime el error en la consola
    throw error; // Propaga el error para que pueda ser manejado externamente
  }
};

// Función para obtener un producto específico por su código
export const getProductRequest = async (code: number) => {
  try {
    const response = await fetch(`${API}/productos/${code}`); // Realiza una solicitud GET para obtener un producto específico
    if (!response.ok) {
      throw new Error("Failed to fetch product"); // Lanza un error si la respuesta no es exitosa
    }
    const data = await response.json(); // Convierte la respuesta en JSON
    return data; // Retorna los datos del producto
  } catch (error) {
    console.error("Error fetching product:", error); // Imprime el error en la consola
    throw error; // Propaga el error para que pueda ser manejado externamente
  }
};

// Función para obtener un producto por su código (función duplicada, se puede eliminar)
export const getProductByCodeRequest = async (code: number) => { 
  try {
    const response = await fetch(`${API}/productos/${code}`); // Realiza una solicitud GET para obtener un producto específico
    if (!response.ok) {
      throw new Error("Failed to fetch product by code"); // Lanza un error si la respuesta no es exitosa
    }
    const data = await response.json(); // Convierte la respuesta en JSON
    return data; // Retorna los datos del producto
  } catch (error) {
    console.error("Error fetching product by code:", error); // Imprime el error en la consola
    throw error; // Propaga el error para que pueda ser manejado externamente
  }
};

// Función para marcar un producto como vendido
export const sellProductRequest = async (code: number) => {
  try {
    // Llama a la API para incrementar el contador de ventas y disminuir la disponibilidad del producto
    await axios.post(`${API}/productos/${code}/sell`);
  } catch (error) {
    console.error("Error selling product:", error); // Imprime el error en la consola
    throw error; // Propaga el error para que pueda ser manejado externamente
  }
};