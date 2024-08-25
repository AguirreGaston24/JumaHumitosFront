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

  // Obtén los detalles del producto cuando el componente se monta o cambia el código del producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (code) {
          const productData = await getProductRequest(parseInt(code, 10));
          setProduct(productData);
          setFormData({ ...productData }); // Inicializa formData con los datos del producto
        }
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    fetchProduct();
  }, [code]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type} = e.target;
  
    if (type === 'checkbox') {
      // TypeScript knows e.target is HTMLInputElement here
      setFormData(prevState => ({
        ...prevState!,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      // TypeScript knows e.target is HTMLTextAreaElement or HTMLInputElement (text) here
      setFormData(prevState => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };

  // Guarda los cambios en los detalles del producto
  const handleSave = async () => {
    // Verifica si formData y product son válidos antes de proceder
    if (formData && product && product.code !== undefined) {
      try {
        await updateProductsRequest(product.code, formData);
        setProduct({ ...formData, code: product.code }); // Actualiza el estado del producto
        setIsEditing(false); // Salir del modo de edición
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
      }
    } else {
      console.warn("No se puede guardar el producto. formData o product son inválidos.");
    }
  };

  // Descarga el código QR como una imagen
  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const image = canvas.toDataURL('image/png'); // Convierte el canvas a una URL de imagen
        const link = document.createElement('a');
        link.href = image;
        link.download = 'qrcode.png'; // Nombre del archivo para descargar
        link.click(); // Simula un clic para descargar
      }
    }
  };

  // Muestra texto de carga mientras se obtienen los datos
  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Sección de encabezado */}
      <header className="w-full bg-gray-800 p-4 flex items-center justify-between relative">
        <div className="flex-none">
          <Link to="/">
            <button className="bg-green-500 text-white px-5 py-2 rounded-lg">
              Regresar
            </button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <h1 className="text-3xl font-bold">Juma Humitos</h1>
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Editar Producto
          </button>
        </div>
      </header>

      {/* Sección de contenido principal */}
      <main className="flex-1 flex justify-center items-center p-4">
        <div className="bg-black p-8 rounded-lg shadow-lg text-center w-full max-w-4xl">
          {isEditing ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
              <form>
                {/* Campos del formulario para editar el producto */}
                <input
                  name="code"
                  type="text"
                  placeholder="Ingrese el código del producto"
                  value={formData?.code || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="available"
                  type="text"
                  placeholder="Ingrese la cantidad disponible"
                  value={formData?.available || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="type"
                  type="text"
                  placeholder="Tipo de producto"
                  value={formData?.type || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="duration"
                  type="text"
                  placeholder="Ingrese duración"
                  value={formData?.duration || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="amount"
                  type="text"
                  placeholder="Ingrese cantidad"
                  value={formData?.amount || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="brand"
                  type="text"
                  placeholder="Ingrese marca"
                  value={formData?.brand || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="line"
                  type="text"
                  placeholder="Ingrese línea"
                  value={formData?.line || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <input
                  name="scent"
                  type="text"
                  placeholder="Ingrese aroma"
                  value={formData?.scent || ''}
                  onChange={handleChange}
                  className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                />
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Escriba una descripción"
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
                  <span>En Stock</span>
                </label>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-indigo-500 text-white px-4 py-2 rounded mt-4"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
                >
                  Cancelar
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-4">Código del Producto: {product.code}</h1>
              {/* Mostrar los detalles del producto */}
              <p><strong>Descripción:</strong> {product.description}</p>
              <p><strong>Duración:</strong> {product.duration}</p>
              <p><strong>Cantidad:</strong> {product.amount}</p>
              <p><strong>Marca:</strong> {product.brand}</p>
              <p><strong>Línea:</strong> {product.line}</p>
              <p><strong>Aroma:</strong> {product.scent}</p>
              <p><strong>Tipo:</strong> {product.type}</p>
              <p><strong>En Stock:</strong> {product.stock ? "Sí" : "No"}</p>
              <p><strong>Creación:</strong> {product.createdAt?.toString()}</p>
              <p><strong>Modificación:</strong> {product.updatedAt?.toString()}</p>
              <p><strong>Disponible:</strong> {product.available}</p>

              <div className="mt-8">
                <h2 className="text-2xl font-bold">Código QR del Producto</h2>
                <div ref={qrRef} className="mb-4 flex justify-center">
                  <QRCode value={`https://jumahumitosfront.onrender.com/product/${product.code}`} />
                </div>
                <button
                  onClick={downloadQRCode}
                  className="bg-indigo-500 text-white px-4 py-2 rounded"
                >
                  Descargar Código QR
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