import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductsForm from "./components/productsForm";
import ProductsList from "./components/products.list";
import ProductDetail from "./components/ProductDetail";
import { ProductProvider } from "./context/products.context";
import ScanProduct from './components/ScanProduct';

function App() {
  return (
    <div className=" bg-black text-white flex flex-col">
    <Router>
    <ProductProvider>

        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/products/:code" element={<ProductDetail />} />
            <Route path="/add-product" element={<ProductsForm />} />
            <Route path="/scan" element={<ScanProduct />} />
            {/* Redirige a la página de inicio (/) por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      
    </ProductProvider>
  </Router>
  </div>
  );
}

export default App;