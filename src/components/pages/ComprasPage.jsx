import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { useCompras } from "@/hooks/useTransactions";
import { Skeleton } from "@/components/atoms/Skeleton";
import { EmptyState } from "@/components/molecules/EmptyState";

export const ComprasPage = () => {
  const { data: compras = [], isLoading, error } = useCompras();
  const cierreDiarioRealizado = useSelector(
    (state) => state.transacciones.cierreDiarioRealizado
  );

  // Calcular totales
  const totalCompras = compras.reduce(
    (acc, compra) => acc + (compra.precioUnitario || 0) * (compra.cantidad || 1),
    0
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-4">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Compras</h1>
            <p className="page-subtitle">Historial de compras a proveedores</p>
          </div>
          <Link
            to="/add-compras"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Nueva Compra
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <FontAwesomeIcon
                icon={faHandshake}
                className="text-amber-400 text-xl"
              />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Compras</p>
              <p className="text-2xl font-bold text-white">{compras.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FontAwesomeIcon
                icon={faHandshake}
                className="text-blue-400 text-xl"
              />
            </div>
            <div>
              <p className="text-sm text-gray-400">Monto Total</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(totalCompras)}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl ${
                cierreDiarioRealizado ? "bg-amber-500/20" : "bg-green-500/20"
              }`}
            >
              <FontAwesomeIcon
                icon={faHandshake}
                className={`text-xl ${
                  cierreDiarioRealizado ? "text-amber-400" : "text-green-400"
                }`}
              />
            </div>
            <div>
              <p className="text-sm text-gray-400">Estado Día</p>
              <p
                className={`text-lg font-bold ${
                  cierreDiarioRealizado ? "text-amber-400" : "text-green-400"
                }`}
              >
                {cierreDiarioRealizado ? "Cerrado" : "Abierto"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && <Skeleton variant="rectangular" className="h-96" />}

      {/* Error */}
      {error && (
        <div className="card p-8 text-center text-red-400">
          <p>Error al cargar las compras. Intenta de nuevo más tarde.</p>
          <p className="text-sm text-gray-400 mt-2">{error.message}</p>
        </div>
      )}

      {/* Compras Table */}
      {!isLoading && !error && compras.length === 0 ? (
        <EmptyState
          icon={<FontAwesomeIcon icon={faHandshake} className="text-4xl" />}
          title="No hay compras aún"
          description="Registra tu primera compra a un proveedor"
          action={{ label: "Registrar Compra", to: "/add-compras" }}
        />
      ) : (
        !isLoading &&
        !error && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-700">
                  <tr>
                    <th className="table-header px-4 py-3 text-left">Fecha</th>
                    <th className="table-header px-4 py-3 text-left">
                      Proveedor
                    </th>
                    <th className="table-header px-4 py-3 text-left">Producto</th>
                    <th className="table-header px-4 py-3 text-center">
                      Cantidad
                    </th>
                    <th className="table-header px-4 py-3 text-right">
                      Precio Unitario
                    </th>
                    <th className="table-header px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.map((compra, index) => (
                    <tr
                      key={index}
                      className="hover:bg-secondary-700/50 transition-colors border-b border-secondary-700"
                    >
                      <td className="table-cell">
                        {new Date(compra.createdAt).toLocaleDateString()}
                      </td>
                      <td className="table-cell">
                        {compra.proveedor?.nombre || "N/A"}
                      </td>
                      <td className="table-cell">
                        {compra.producto?.nombre || "N/A"}
                      </td>
                      <td className="table-cell text-center">
                        {compra.cantidad || 1}
                      </td>
                      <td className="table-cell text-right">
                        {formatCurrency(compra.precioUnitario || 0)}
                      </td>
                      <td className="table-cell text-right font-semibold">
                        {formatCurrency(
                          (compra.precioUnitario || 0) * (compra.cantidad || 1),
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
};
