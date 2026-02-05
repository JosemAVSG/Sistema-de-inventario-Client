import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getbuys } from "@/redux/actionTransaccion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHandshake } from "@fortawesome/free-solid-svg-icons";

const ComprasPage = () => {
  const compras = useSelector((state) => state.transacciones.compras);
  const cierreDiarioRealizado = useSelector(
    (state) => state.transacciones.cierreDiarioRealizado
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getbuys());
  }, [dispatch]);

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
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Compras</h1>
            <p className="page-subtitle">
              Historial de compras a proveedores
            </p>
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
              <FontAwesomeIcon icon={faHandshake} className="text-amber-400 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Compras</p>
              <p className="text-2xl font-bold text-white">
                {compras.length}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FontAwesomeIcon icon={faHandshake} className="text-blue-400 text-xl" />
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
                cierreDiarioRealizado
                  ? "bg-amber-500/20"
                  : "bg-green-500/20"
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

      {/* Compras Table */}
      {compras.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="p-4 bg-secondary-700/50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <FontAwesomeIcon icon={faHandshake} className="text-gray-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No hay compras aún
          </h3>
          <p className="text-gray-400 mb-6">
            Registra tu primera compra a un proveedor
          </p>
          <Link
            to="/add-compras"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Registrar Compra
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary-700">
                <tr>
                  <th className="table-header px-4 py-3 text-left">Fecha</th>
                  <th className="table-header px-4 py-3 text-left">Proveedor</th>
                  <th className="table-header px-4 py-3 text-left">Producto</th>
                  <th className="table-header px-4 py-3 text-center">Cantidad</th>
                  <th className="table-header px-4 py-3 text-right">Precio Unitario</th>
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
                      {formatCurrency((compra.precioUnitario || 0) * (compra.cantidad || 1))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprasPage;
