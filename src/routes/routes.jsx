import { LoginPage } from "@/components/pages/LoginPage";
import { RegisterPage } from "@/components/pages/RegisterPage";
import { HomePage } from "@/components/pages/HomePage";
import { ProfilePage } from "@/components/pages/ProfilePage";
import { Error404 } from "@/components/pages/Error404";
import { ProductsPage } from "@/components/pages/ProductsPage";
import { CategoriaPage } from "@/components/pages/CategoriaPage";
import { ProveedorPage } from "@/components/pages/ProveedorPage";
import { CategoriaFormPage } from "@/components/pages/CategoriaFormPage";
import { ProveedorFormPage } from "@/components/pages/ProveedorFormPage";
import { ProductsFormPage } from "@/components/pages/ProductsFormPage";
import { VentasFromPage } from "@/components/pages/VentasFromPage";
import { VentasPage } from "@/components/pages/VentasPage";
import { ComprasPage } from "@/components/pages/ComprasPage";
import { ComprasFromPage } from "@/components/pages/ComprasFromPage";

export const publicRoutes = [
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/*", element: <Error404 /> },
];

export const protectedRoutes = [
  { path: "/categoria", element: <CategoriaPage /> },
  { path: "/add-categoria", element: <CategoriaFormPage /> },
  { path: "/categoria/:id", element: <CategoriaFormPage /> },
  { path: "/proveedor", element: <ProveedorPage /> },
  { path: "/add-proveedor", element: <ProveedorFormPage /> },
  { path: "/proveedor/:id", element: <ProveedorFormPage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/add-products", element: <ProductsFormPage /> },
  { path: "/products/:id", element: <ProductsFormPage /> },
  { path: "/ventas", element: <VentasPage /> },
  { path: "/add-ventas", element: <VentasFromPage /> },
  { path: "/ventas/:id", element: <VentasFromPage /> },
  { path: "/compras", element: <ComprasPage /> },
  { path: "/add-compras", element: <ComprasFromPage /> },
  { path: "/compras/:id", element: <ComprasFromPage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/profile", element: <ProfilePage /> },
];
