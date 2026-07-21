import { useProducts } from "@/hooks/useProducts";
import DataTable from "@/components/organisms/DataTable";
import { Skeleton } from "@/components/atoms/Skeleton";
import { EmptyState } from "@/components/molecules/EmptyState";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBox } from "@fortawesome/free-solid-svg-icons";

export const ProductsPage = () => {
  const { data: products = [], isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="animate-fade-in flex flex-col gap-4">
        <div className="page-header">
          <Skeleton variant="text" className="w-48" />
          <Skeleton variant="text" className="w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Skeleton variant="rectangular" className="h-24" />
          <Skeleton variant="rectangular" className="h-24" />
          <Skeleton variant="rectangular" className="h-24" />
        </div>
        <Skeleton variant="rectangular" className="h-96" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in flex flex-col gap-4">
        <div className="page-header">
          <h1 className="page-title">Productos</h1>
          <p className="page-subtitle">Gestiona tu inventario de productos</p>
        </div>
        <div className="card p-8 text-center text-red-400">
          <p>Error al cargar los productos. Intenta de nuevo más tarde.</p>
          <p className="text-sm text-gray-400 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in flex flex-col gap-4">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Productos</h1>
            <p className="page-subtitle">Gestiona tu inventario de productos</p>
          </div>
          <Link
            to="/add-products"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Nuevo Producto
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FontAwesomeIcon icon={faBox} className="text-blue-400 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Productos</p>
              <p className="text-2xl font-bold text-white">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <FontAwesomeIcon
                icon={faBox}
                className="text-emerald-400 text-xl"
              />
            </div>
            <div>
              <p className="text-sm text-gray-400">En Stock</p>
              <p className="text-2xl font-bold text-white">
                {products.filter((p) => p.stock >= 2).length}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/20 rounded-xl">
              <FontAwesomeIcon icon={faBox} className="text-red-400 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Stock Bajo</p>
              <p className="text-2xl font-bold text-white">
                {products.filter((p) => p.stock < 2).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <EmptyState
          icon={<FontAwesomeIcon icon={faBox} className="text-4xl" />}
          title="No hay productos aún"
          description="Comienza agregando tu primer producto al inventario"
          action={{ label: "Agregar Producto", to: "/add-products" }}
        />
      ) : (
        <div className="card">
          <DataTable data={products} />
        </div>
      )}
    </div>
  );
};
