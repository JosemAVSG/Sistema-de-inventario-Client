import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserTie, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useProviders } from "@/hooks/useProviders";
import { Skeleton } from "@/components/atoms/Skeleton";
import { EmptyState } from "@/components/molecules/EmptyState";

export const ProveedorPage = () => {
  const { data: proveedors = [], isLoading, error } = useProviders();

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

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card p-5">
              <Skeleton variant="rectangular" className="h-48" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="card p-8 text-center text-red-400">
          <p>Error al cargar los proveedores. Intenta de nuevo más tarde.</p>
          <p className="text-sm text-gray-400 mt-2">{error.message}</p>
        </div>
      )}

      {/* Proveedores Grid */}
      {!isLoading && !error && proveedors.length === 0 ? (
        <EmptyState
          icon={<FontAwesomeIcon icon={faUserTie} className="text-4xl" />}
          title="No hay proveedores aún"
          description="Agrega tu primer proveedor para comenzar"
          action={{ label: "Agregar Proveedor", to: "/add-proveedor" }}
        />
      ) : (
        !isLoading &&
        !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {proveedors.map((proveedor) => (
              <div key={proveedor._id} className="card p-5 card-hover">
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
                    to={`/proveedor/${proveedor._id}`}
                    className="flex-1 text-center py-2 text-sm text-primary-400 hover:bg-primary-500/10 rounded-lg transition-colors"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
