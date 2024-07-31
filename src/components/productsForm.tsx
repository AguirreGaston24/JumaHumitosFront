import { ChangeEvent, FormEvent, useState } from "react";
import { useProducts } from "../context/use.products";
import QRCode from "qrcode.react";
import { Link } from "react-router-dom";

function ProductsForm() {
  const [product, setProduct] = useState({
    code: "", // Cambiamos a string temporalmente para la entrada
    type: "",
    duration: 0,
    amount: "",
    brand: "",
    line: "",
    scent: "",
    description: "",
    stock: false,
  });
  const [generatedQRCode, setGeneratedQRCode] = useState<string | null>(null);
  const { createProduct } = useProducts();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setProduct({
        ...product,
        [name]: e.target.checked,
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createProduct({
        ...product,
        code: parseInt(product.code, 10), // Convertimos a número antes de enviar
        duration: product.duration ? parseInt(product.duration as any, 10) : undefined, // Convertimos duration a número si existe
      });
      setGeneratedQRCode(`Product Code: ${product.code}`);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="bg-black text-white flex flex-col">
      {/* Header */}
      <header className="w-full bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex-none">
          <Link to="/">
            <button className="bg-green-500 text-white px-5 py-2 rounded-lg">
              Back
            </button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-3xl font-bold">Juma Humitos</h1>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="code"
              type="text"
              placeholder="Enter product code"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />

            <input
              name="type"
              type="text"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
              placeholder="Kind of product"
            />

            <input
              name="duration"
              type="text"
              placeholder="Enter duration"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />

            <input
              name="amount"
              type="text"
              placeholder="Enter amount"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />

            <input
              name="brand"
              type="text"
              placeholder="Enter brand"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />

            <input
              name="line"
              type="text"
              placeholder="Enter line"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />

            <input
              name="scent"
              type="text"
              placeholder="Enter scent"
              onChange={handleChange}
              className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            />
          </div>

          <textarea
            name="description"
            rows={4}
            onChange={handleChange}
            className="border-2 border-gray-700 p-3 rounded-lg bg-zinc-800 text-white w-full"
            placeholder="Write a description"
          ></textarea>

          <label className="inline-flex items-center gap-x-2">
            <input
              name="stock"
              type="checkbox"
              checked={product.stock}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span>In Stock</span>
          </label>

          <button
            type="submit"
            className="bg-indigo-500 text-white px-5 py-2 rounded-lg w-full"
          >
            Save
          </button>

          {generatedQRCode && (
            <div className="mt-6 text-center">
              <QRCode value={generatedQRCode} />
              <p className="text-white mt-2">QR Code for Product Code: {product.code}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProductsForm;