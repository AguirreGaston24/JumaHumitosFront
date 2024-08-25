import { ChangeEvent, FormEvent, useState } from "react";
import { useProducts } from "../context/use.products";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";

function ProductsForm() {
  // Estado para los datos del producto y el QR generado
  const [product, setProduct] = useState({
    code: 0,
    type: "",
    duration: 0,
    amount: "",
    brand: "",
    line: "",
    scent: "",
    description: "",
    stock: false,
    price: 0,
    sold: false,
    salesCount: 0,
    available: 0,
  });
  const [generatedQRCode, setGeneratedQRCode] = useState<string | null>(null);
  const { createProduct } = useProducts(); // Hook para crear productos

  // Maneja los cambios en los campos del formulario
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
  
    if (type === "checkbox") {
      // Maneja el cambio en los campos de tipo checkbox
      setProduct({
        ...product,
        [name]: checked,
      });
    } else if (name === "price" || name === "duration") {
      // Maneja los campos numéricos
      setProduct({
        ...product,
        [name]: parseFloat(value),
      });
    } else {
      // Maneja otros campos de texto
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Prepara los datos del producto para enviarlos
    const productToSubmit = {
      ...product,
      code: parseInt(product.code.toString(), 10),
      duration: product.duration ?? 0, // Asegura que 'duration' tenga un valor predeterminado
      available: Number(product.available),
    };
  
    try {
      await createProduct(productToSubmit);
      // Genera el código QR después de crear el producto
      setGeneratedQRCode(`Product Code: ${productToSubmit.code}`);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex-none">
          <Link to="/">
            <button className="bg-green-500 text-white px-5 py-2 rounded-lg">
              Volver
            </button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-3xl font-bold">Juma Humitos</h1>
        </div>
      </header>

      {/* Formulario */}
      <div className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campo para el código del producto */}
            <input
              name="code"
              type="text"
              placeholder="Introduzca el código del producto"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />

            {/* Campo para el tipo de producto */}
            <input
              name="type"
              type="text"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
              placeholder="Tipo de producto"
            />

            {/* Campo para la cantidad disponible */}
            <input
              name="available"
              type="number" // Cambia el tipo a 'number'
              value={product.available}
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
              placeholder="Productos Disponibles"
            />

            {/* Campo para la duración */}
            <input
              name="duration"
              type="number"
              value={product.duration || 0} // Inicializa con 0 si es undefined
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
              placeholder="Introduzca la duración"
            />

            {/* Campo para la cantidad */}
            <input
              name="amount"
              type="text"
              placeholder="Ingrese la cantidad"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />

            {/* Campo para la marca */}
            <input
              name="brand"
              type="text"
              placeholder="Introduce la marca"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />

            {/* Campo para la línea */}
            <input
              name="line"
              type="text"
              placeholder="Introducir línea"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />

            {/* Campo para el aroma */}
            <input
              name="scent"
              type="text"
              placeholder="Introduzca el aroma"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />

            {/* Campo para el precio */}
            <input
              name="price"
              type="number"
              placeholder="Introduce el precio"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />
          </div>

          {/* Campo para la descripción */}
          <textarea
            name="description"
            rows={4}
            onChange={handleChange}
            className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            placeholder="Escribe una descripción"
          ></textarea>

          {/* Checkbox para indicar si el producto está en stock */}
          <label className="inline-flex items-center gap-x-2">
            <input
              name="stock"
              type="checkbox"
              checked={product.stock}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span>En Stock</span>
          </label>

          {/* Botón para guardar el producto */}
          <button
            type="submit"
            className="bg-indigo-500 text-white px-5 py-2 rounded-lg w-full"
          >
            Guardar
          </button>

          {/* Mostrar el código QR si se ha generado */}
          {generatedQRCode && (
            <div className="mt-6 text-center">
              <QRCode value={generatedQRCode} />
              <p className="text-white mt-2"> Código QR para código de producto: {product.code}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProductsForm;