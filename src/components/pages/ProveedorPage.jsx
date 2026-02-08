import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProveedors } from "@/redux/actionProveedor";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserTie, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

export const ProveedorPage = () => {
  const proveedors = useSelector((state) => state.proveedor.proveedors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProveedors());
  }, [dispatch]);

  return (
    <div className="animate-fade-in flex flex-col gap-4">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Proveedores</h1>
            <p className="page-subtitle">Gestión de proveedores y contactos</p>
          </div>
          <Link
            to="/add-proveedor"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Nuevo Proveedor
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FontAwesomeIcon
                icon={faUserTie}
                className="text-blue-400 text-xl"
              />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Proveedores</p>
              <p className="text-2xl font-bold text-white">
                {proveedors.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Proveedores Grid */}
      {proveedors.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="p-4 bg-secondary-700/50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faUserTie}
              className="text-gray-500 text-3xl"
            />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No hay proveedores aún
          </h3>
          <p className="text-gray-400 mb-6">
            Agrega tu primer proveedor para comenzar
          </p>
          <Link
            to="/add-proveedor"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Agregar Proveedor
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {proveedors.map((proveedor) => (
            <div key={proveedor.id} className="card p-5 card-hover">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="text-blue-400 text-xl"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    {proveedor.nombre}
                  </h3>
                  <p className="text-sm text-gray-400">{proveedor.empresa}</p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {proveedor.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                    <span>{proveedor.email}</span>
                  </div>
                )}
                {proveedor.telefono && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                    <span>{proveedor.telefono}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-secondary-700">
                <Link
                  to={`/proveedor/${proveedor.id}`}
                  className="flex-1 text-center py-2 text-sm text-primary-400 hover:bg-primary-500/10 rounded-lg transition-colors"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
