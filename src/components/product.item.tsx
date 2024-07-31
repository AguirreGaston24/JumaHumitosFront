import { Link } from "react-router-dom";
import { useProducts } from "../context/use.products";
import { Products } from "../interface/products.interface";

interface Props {
  products: Products;
}

function ProductsItem({ products }: Props) {
  const { deleteProduct, updateProduct } = useProducts();

  return (
    <div className="bg-gray-900 p-4 my-2 flex flex-col sm:flex-row items-start justify-between hover:bg-gray-800 hover:cursor-pointer rounded-lg">
      {/* Información del producto */}
      <div className="flex-1 flex flex-wrap gap-12 mt-4 sm:mt-0">
        {/* Mostrar el código y el tipo del producto */}
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold">Code:</p>
          <h3 className="font-bold text-lg">{products.code}</h3>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold">Type:</p>
          <p className="text-slate-400">{products.type}</p>
        </div>

        {/* Información adicional del producto */}
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold">Brand:</p>
          <p className="text-sm">{products.brand}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold">Line:</p>
          <p className="text-sm">{products.line}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold">Scent:</p>
          <p className="text-sm">{products.scent}</p>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-2 ml-4 mt-4 sm:mt-0 items-center">
        {/* Botón para acceder al detalle del producto */}
        <Link to={`/products/${products.code}`} className="w-full sm:w-auto">
          <button className="bg-blue-500 text-white px-3 py-1 rounded-lg w-full sm:w-auto">
            View Details
          </button>
        </Link>

        {/* Botón para eliminar el producto */}
        <button
          onClick={() => {
            if (!window.confirm("Are you sure you want to delete this product?")) return;
            deleteProduct(products.code);
          }}
          className="bg-red-500 text-white px-3 py-1 rounded-lg w-full sm:w-auto"
        >
          Delete
        </button>

        {/* Botón para actualizar el estado del producto */}
        <button
          onClick={() => updateProduct(products.code, { stock: !products.stock })}
          className={`px-3 py-1 rounded-lg ${products.stock ? 'bg-yellow-500' : 'bg-gray-500'} text-white w-full sm:w-auto`}
        >
          {products.stock ? 'Mark as Out of Stock' : 'Mark as In Stock'}
        </button>


      </div>
    </div>
  );
}

export default ProductsItem;