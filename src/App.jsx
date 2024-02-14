import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoutes from "./ProtectedRoutes";
import Error404 from "./pages/Error404";
import Navbar from "./components/Navbar";
import Products from "./pages/ProductsPage";
import CategoriaPage from "./pages/CategoriaPage";
import ProveedorPage from "./pages/ProveedorPage";
import CategoriaFormPage from "./pages/CategoriaFormPage";
import ProveedorFormPage from "./pages/ProveedorFormPage";
import ProductsFormPage from "./pages/ProductsFormPage";
import VentasFromPage from "./pages/VentasFromPage";
import VentasPage from "./pages/VentasPage";
import ComprasPage from "./pages/ComprasPage";
import ComprasFromPage from "./pages/ComprasFromPage";
import Welcome from "./pages/WelcomePage";
function App() {
  return (
    <Router>
      <Navbar></Navbar>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<Error404 />} />
        <Route path="/" element={<Welcome/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route path="/categoria" element={<CategoriaPage />} />
          <Route path="/add-categoria" element={<CategoriaFormPage />} />
          <Route path="/categoria/:id" element={<CategoriaFormPage />} />
          <Route path="/proveedor" element={<ProveedorPage />} />
          <Route path="/add-proveedor" element={<ProveedorFormPage />} />
          <Route path="/proveedor/:id" element={<ProveedorFormPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-products" element={<ProductsFormPage />} />
          <Route path="/products/:id" element={<ProductsFormPage />} />

          <Route path="/ventas" element={<VentasPage/>} />
          <Route path="/add-ventas" element={<VentasFromPage/>}/>
          <Route path="/ventas/:id" element={<VentasFromPage/>}/>

          <Route path="/compras" element={<ComprasPage/>} />
          <Route path="/add-compras" element={<ComprasFromPage/>}/>
          <Route path="/compras/:id" element={<ComprasFromPage/>}/>

          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
