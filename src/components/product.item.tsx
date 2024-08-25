import { Link } from "react-router-dom";
import { useProducts } from "../context/use.products";
import { Products } from "../interface/products.interface";

interface Props {
  products: Products;
}

function ProductsItem({ products }: Props) {
  const { deleteProduct, sellProduct } = useProducts();

  // Maneja la venta de un producto
  const handleSell = async () => {
    // Confirmar la acción con el usuario
    if (window.confirm("Are you sure you want to sell this product?")) {
      try {
        // Llama a la función para vender el producto
        await sellProduct(products.code);
        alert("Producto vendido");
      } catch (error) {
        console.error("Error selling product:", error);
        alert("Failed to sell product");
      }
    }
  };

  return (
    <div className="bg-white p-4 my-2 flex flex-col sm:flex-row items-start justify-between hover:bg-gray-100 hover:cursor-pointer rounded-lg shadow-md transition-transform transform hover:scale-105">
      {/* Información del producto */}
      <div className="flex-1 flex flex-wrap gap-4">
        {/* Información básica del producto */}
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold text-gray-700">Código:</p>
          <h3 className="font-bold text-xl text-gray-900">{products.code}</h3>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold text-gray-700">Tipo:</p>
          <p className="text-gray-600">{products.type}</p>
        </div>

        {/* Información adicional */}
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold text-gray-700">Marca:</p>
          <p className="text-gray-600">{products.brand}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold text-gray-700">Línea:</p>
          <p className="text-gray-600">{products.line}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold text-gray-700">Aroma:</p>
          <p className="text-gray-600">{products.scent}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold text-gray-700">Disponibles:</p>
          {/* Mostrar cantidad disponible */}
          <p className="text-gray-900 font-bold">{products.available}</p>
        </div>    <div className="flex flex-col items-start">
          <p className="text-sm font-semibold text-gray-700">Precio:</p>
          {/* Mostrar precio formateado */}
          <p className="text-gray-900 font-bold">${products.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-2 ml-4 mt-4 sm:mt-0 items-center">
        {/* Botón para ver detalles del producto */}
        <Link to={`/products/${products.code}`} className="w-full sm:w-auto">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-blue-700 transition-colors">
            Ver Detalles
          </button>
        </Link>

        {/* Botón para eliminar el producto */}
        <button
          onClick={() => {
            // Confirmar la eliminación del producto
            if (window.confirm("Are you sure you want to delete this product?")) {
              deleteProduct(products.code);
            }
          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-red-700 transition-colors"
        >
          Eliminar
        </button>

        {/* Botón para vender el producto */}
        <button
          onClick={handleSell}
          className="bg-green-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-green-700 transition-colors"
        >
          Vender
        </button>
      </div>
    </div>
  );
}

export default ProductsItem;