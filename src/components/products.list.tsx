import { useState, useEffect } from "react";
import ProductsItem from "./product.item";
import { Link } from "react-router-dom";
import { useProducts } from "../context/products.context";

function ProductsList() {
  const { products } = useProducts();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [lineFilter, setLineFilter] = useState("");
  const [scentFilter, setScentFilter] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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

  // Mostrar alerta si no se encuentran productos
  useEffect(() => {
    if (search && filteredProducts.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [search, filteredProducts]);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Contenedor para el título y el botón */}
      <header className="flex items-center justify-between p-4 bg-gray-800">
        {/* Buscador alineado a la izquierda */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by code..."
            className="p-2 rounded-lg bg-gray-700 text-white w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Título centrado */}
        <div className="flex-1 flex ">
          <h1 className="text-3xl font-bold">Juma Humitos</h1>
        </div>
        {/* Botón alineado a la derecha */}
        <div className="flex-none">
          <Link to="/add-product">
            <button className="bg-green-500 text-white px-5 py-2 rounded-lg">
              Add Product
            </button>
          </Link>
        </div>
      </header>

      {/* Contenedor de filtros */}
      <div className="p-4 bg-gray-800">
        <div className="flex flex-wrap gap-10 mb-4">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white w-full md:w-60"
          >
            <option value="">Filter by type...</option>
            {uniqueTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white w-full md:w-60"
          >
            <option value="">Filter by brand...</option>
            {uniqueBrands.map((brand, index) => (
              <option key={index} value={brand}>{brand}</option>
            ))}
          </select>
          <select
            value={lineFilter}
            onChange={(e) => setLineFilter(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white w-full md:w-60"
          >
            <option value="">Filter by line...</option>
            {uniqueLines.map((line, index) => (
              <option key={index} value={line}>{line}</option>
            ))}
          </select>
          <select
            value={scentFilter}
            onChange={(e) => setScentFilter(e.target.value)}
            className="p-2 rounded-lg bg-gray-700 text-white w-full md:w-60"
          >
            <option value="">Filter by scent...</option>
            {uniqueScents.map((scent, index) => (
              <option key={index} value={scent}>{scent}</option>
            ))}
          </select>
        </div>
      </div>

      <main className="flex-1 p-4">
        {showAlert && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
            Product not found
          </div>
        )}
        <div className="flex flex-col gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductsItem products={product} key={product._id} />
            ))
          ) : (
            <p className="text-center text-xl font-bold my-4">No products match the criteria</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProductsList;