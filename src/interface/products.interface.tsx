/**
 * Interfaz que define la estructura de un producto en el sistema.
 * Incluye campos opcionales para detalles adicionales y marcas de tiempo.
 */
export interface Products {
  _id?: string;
  code: number;
  description?: string;
  duration?: number;
  amount?: string;
  brand?: string;
  line?: string;
  scent?: string;
  type?: string;
  stock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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