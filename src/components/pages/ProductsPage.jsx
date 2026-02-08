import { useEffect } from "react";
import { getproducts } from "@/redux/actionProducts";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/components/organisms/DataTable";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBox } from "@fortawesome/free-solid-svg-icons";

export const ProductsPage = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproducts());
  }, [dispatch]);

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
        <div className="card p-12 text-center">
          <div className="p-4 bg-secondary-700/50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <FontAwesomeIcon icon={faBox} className="text-gray-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No hay productos aún
          </h3>
          <p className="text-gray-400 mb-6">
            Comienza agregando tu primer producto al inventario
          </p>
          <Link
            to="/add-products"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Agregar Producto
          </Link>
        </div>
      ) : (
        <div className="card">
          <DataTable data={products} />
        </div>
      )}
    </div>
  );
};
