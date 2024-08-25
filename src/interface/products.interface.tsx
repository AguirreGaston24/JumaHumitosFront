/**
 * Interfaz que define la estructura de un producto en el sistema.
 * Incluye campos opcionales para detalles adicionales y marcas de tiempo.
 */
export interface Products {
  _id?: string; // Identificador único del producto, opcional si se usa una base de datos que lo genere automáticamente.
  code: number; // Código único del producto, requerido.
  description?: string; // Descripción del producto, opcional.
  duration?: number; // Duración del producto, opcional.
  amount?: string; // Cantidad del producto, opcional.
  brand?: string; // Marca del producto, opcional.
  line?: string; // Línea del producto, opcional.
  scent?: string; // Aroma del producto, opcional.
  type?: string; // Tipo del producto, opcional.
  stock?: boolean; // Indica si el producto está en stock, opcional.
  price: number; // Precio del producto, requerido.
  sold: boolean; // Indica si el producto ha sido vendido, requerido.
  salesCount: number; // Cantidad de veces que el producto ha sido vendido, requerido.
  createdAt?: Date; // Fecha de creación del producto, opcional.
  updatedAt?: Date; // Fecha de última actualización del producto, opcional.
  available: number; // Cantidad disponible del producto, requerido.
}

/**
 * Tipo para la creación de un nuevo producto.
 * Excluye los campos que no deben ser especificados al crear un producto.
 */
export type CreateProducts = Omit<Products, "_id" | "createdAt" | "updatedAt">;

/**
 * Tipo para actualizar un producto existente.
 * Permite la actualización parcial de un producto.
 */
export type UpdateProducts = Partial<CreateProducts>;