import { useState, useEffect } from "react";
import ProductsItem from "./product.item";
import { Link } from "react-router-dom";
import { useProducts } from "../context/products.context";

function ProductsList() {
  const { products } = useProducts();
  const [search, setSearch] = useState(""); // Estado para el término de búsqueda
  const [typeFilter, setTypeFilter] = useState(""); // Estado para el filtro de tipo
  const [brandFilter, setBrandFilter] = useState(""); // Estado para el filtro de marca
  const [lineFilter, setLineFilter] = useState(""); // Estado para el filtro de línea
  const [scentFilter, setScentFilter] = useState(""); // Estado para el filtro de aroma
  const [showAlert, setShowAlert] = useState(false); // Estado para mostrar alerta cuando no se encuentran productos

  // Extraer opciones únicas de los productos para los filtros
  const uniqueTypes = Array.from(new Set(products.map(p => p.type).filter(t => t)));
  const uniqueBrands = Array.from(new Set(products.map(p => p.brand).filter(b => b)));
  const uniqueLines = Array.from(new Set(products.map(p => p.line).filter(l => l)));
  const uniqueScents = Array.from(new Set(products.map(p => p.scent).filter(s => s)));

  // Filtrar productos según los criterios
  const filteredProducts = products.filter(product =>
    (search === "" || product.code.toString().toLowerCase().includes(search.toLowerCase())) &&
    (typeFilter === "" || (product.type && product.type.toLowerCase().includes(typeFilter.toLowerCase()))) &&
    (brandFilter === "" || (product.brand && product.brand.toLowerCase().includes(brandFilter.toLowerCase()))) &&
    (lineFilter === "" || (product.line && product.line.toLowerCase().includes(lineFilter.toLowerCase()))) &&
    (scentFilter === "" || (product.scent && product.scent.toLowerCase().includes(scentFilter.toLowerCase())))
  );

  // Mostrar alerta si no se encuentran productos que coincidan con los criterios de búsqueda
  useEffect(() => {
    if (search && filteredProducts.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [search, filteredProducts]);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Contenedor para el título y los botones */}
      <header className="flex items-center justify-between p-4 bg-gray-800">
        {/* Buscador alineado a la izquierda */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar por código..."
            className="p-2 rounded-lg bg-gray-700 text-white w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Título centrado */}
        <div className="flex-1 flex justify-center">
          <h1 className="text-3xl font-bold">Juma Humitos</h1>
        </div>
        {/* Botones alineados a la derecha */}
        <div className="flex-none">
          <div className="flex flex-col space-y-4">
            <Link to="/add-product">
              <button className="bg-green-500 text-white px-5 py-2 rounded-lg">
                Agregar Producto
              </button>
            </Link>
            <Link to="/scan">
              <button className="bg-green-500 text-white px-5 py-2 rounded-lg">
                Escanear
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Contenedor de filtros */}
      <div className="p-4 bg-gray-800">
        <div className="flex flex-wrap gap-10 mb-4">
          {/* Filtro por tipo */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white w-full md:w-60"
          >
            <option value="">Filtrar por tipo...</option>
            {uniqueTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          {/* Filtro por marca */}
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white w-full md:w-60"
          >
            <option value="">Filtrar por marca...</option>
            {uniqueBrands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
          {/* Filtro por línea */}
          <select
            value={lineFilter}
            onChange={(e) => setLineFilter(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white w-full md:w-60"
          >
            <option value="">Filtrar por línea...</option>
            {uniqueLines.map((line, index) => (
              <option key={index} value={line}>{line}</option>
            ))}
          </select>
          {/* Filtro por aroma */}
          <select
            value={scentFilter}
            onChange={(e) => setScentFilter(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white w-full md:w-60"
          >
            <option value="">Filtrar por aroma...</option>
            {uniqueScents.map((scent, index) => (
              <option key={index} value={scent}>{scent}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Contenedor principal para los productos */}
      <main className="flex-1 p-4">
        {/* Mostrar alerta si no se encuentran productos */}
        {showAlert && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
            No se encontraron productos
          </div>
        )}
        {/* Mostrar productos filtrados */}
        <div className="flex flex-col gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductsItem products={product} key={product._id} />
            ))
          ) : (
            <p className="text-center text-xl font-bold my-4">No hay productos que coincidan con los criterios</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProductsList;