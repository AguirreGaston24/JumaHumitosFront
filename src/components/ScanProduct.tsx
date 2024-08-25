import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { useProducts } from '../context/use.products';
import { Link } from "react-router-dom";

const ScanProduct: React.FC = () => {
  // Estado para manejar errores y la información del producto escaneado
  const [error, setError] = useState<string | null>(null);
  const [productInfo, setProductInfo] = useState<string | null>(null);
  const { getProductByCode, sellProduct } = useProducts(); // Funciones del contexto de productos
  const videoRef = useRef<HTMLVideoElement | null>(null); // Referencia al elemento de video

  // Función para manejar el código escaneado
  const handleScan = async (code: string) => {
    try {
      // Obtener el producto por el código escaneado
      const product = await getProductByCode(parseInt(code, 10));
      if (product) {
        // Marca el producto como vendido y actualiza el recuento de ventas
        await sellProduct(product.code);
        setProductInfo(`Producto encontrado y marcado como vendido: ${product.type}, ${product.brand}, ${product.scent}`);
      } else {
        setProductInfo('Producto no encontrado');
      }
    } catch (error) {
      setError('Error procesando el producto');
      console.error('Error:', error);
    }
  };

  // Configuración del lector de códigos de barras cuando el componente se monta
  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    const videoElement = videoRef.current;

    if (videoElement) {
      codeReader.decodeFromVideoDevice(null, videoElement, (result, err) => {
        if (result) {
          // Maneja el resultado del escaneo
          handleScan(result.getText());
        } else if (err) {
          // Maneja errores de escaneo
          console.error('Error de escaneo:', err);
        }
      }).catch((err) => {
        // Maneja errores en la configuración del lector
        console.error('Error en la configuración del lector:', err);
      });
    }

    // Limpia el lector cuando el componente se desmonta
    return () => {
      codeReader.reset();
    };
  }, [getProductByCode, sellProduct]); // Dependencias que pueden cambiar

  return (
    <div>
      {/* Encabezado con botón para regresar */}
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
      
      {/* Elemento de video para el escaneo */}
      <video ref={videoRef} style={{ width: '100%' }} />
      
      {/* Mensajes de información y error */}
      {productInfo && <p>{productInfo}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ScanProduct;