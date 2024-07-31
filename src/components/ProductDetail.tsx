import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductRequest, updateProductsRequest } from "../api/products";
import { Products } from "../interface/products.interface";
import QRCode from "qrcode.react";

function ProductDetail() {
  const { code } = useParams<{ code: string }>();
  const [product, setProduct] = useState<Products | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Products | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (code) {
          const productData = await getProductRequest(parseInt(code, 10));
          setProduct(productData);
          setFormData({ ...productData }); // Make a copy of the product data
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [code]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type} = e.target;
  
    if (type === 'checkbox') {
      // TypeScript knows `e.target` is `HTMLInputElement` here
      setFormData(prevState => ({
        ...prevState!,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      // TypeScript knows `e.target` is `HTMLTextAreaElement` or `HTMLInputElement` (text) here
      setFormData(prevState => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    if (formData) {
      try {
        await updateProductsRequest(product.code, formData); // Provide both arguments
        setProduct({ ...formData }); // Update the product state with the new data
        setIsEditing(false); // Exit edit mode
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const image = canvas.toDataURL('image/png'); // Convert canvas to image URL
        const link = document.createElement('a');
        link.href = image;
        link.download = 'qrcode.png'; // Name of the file to download
        link.click(); // Simulate click to download
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="w-full bg-gray-800 p-4 flex items-center justify-between relative">
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
        <div className="absolute top-4 right-4">
          <button
            onClick={handleEditClick}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit Product
          </button>
        </div>
      </header>
      <main className="flex-1 flex justify-center items-center p-4">
        <div className="bg-black p-8 rounded-lg shadow-lg text-center w-full max-w-4xl">
          {isEditing ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
              <form>
                <input
                  name="code"
                  type="text"
                  placeholder="Enter product code"
                  value={formData?.code || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="type"
                  type="text"
                  placeholder="Kind of product"
                  value={formData?.type || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="duration"
                  type="text"
                  placeholder="Enter duration"
                  value={formData?.duration || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="amount"
                  type="text"
                  placeholder="Enter amount"
                  value={formData?.amount || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="brand"
                  type="text"
                  placeholder="Enter brand"
                  value={formData?.brand || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="line"
                  type="text"
                  placeholder="Enter line"
                  value={formData?.line || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="scent"
                  type="text"
                  placeholder="Enter scent"
                  value={formData?.scent || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Write a description"
                  value={formData?.description || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                ></textarea>
                <label className="inline-flex items-center gap-x-2">
                  <input
                    name="stock"
                    type="checkbox"
                    checked={formData?.stock || false}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span>Stock</span>
                </label>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-indigo-500 text-white px-4 py-2 rounded mt-4"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
                >
                  Cancel
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4">Product Code: {product.code}</h1>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Duration:</strong> {product.duration}</p>
              <p><strong>Amount:</strong> {product.amount}</p>
              <p><strong>Brand:</strong> {product.brand}</p>
              <p><strong>Line:</strong> {product.line}</p>
              <p><strong>Scent:</strong> {product.scent}</p>
              <p><strong>Type:</strong> {product.type}</p>
              <p><strong>In Stock:</strong> {product.stock ? "Yes" : "No"}</p>
              <p><strong>Created At:</strong> {product.createdAt?.toString()}</p>
              <p><strong>Updated At:</strong> {product.updatedAt?.toString()}</p>

              <div className="mt-8">
                <h1 className="text-2xl font-bold ">Product Detail</h1>
                <div ref={qrRef} className="mb-4 flex justify-center">
                  <QRCode value={`http://example.com/product/${product.code}`} />
                </div>
                <button
                  onClick={downloadQRCode}
                  className="bg-indigo-500 text-white px-4 py-2 rounded"
                >
                  Download QR Code
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProductDetail;