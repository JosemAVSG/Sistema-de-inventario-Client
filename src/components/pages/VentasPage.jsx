import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getsells } from "@/redux/actionTransaccion";
import DataTableSell from "@/components/organisms/DataTableSell";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMoneyBill1Wave } from "@fortawesome/free-solid-svg-icons";

export const VentasPage = () => {
  const ventas = useSelector((state) => state.transacciones.ventas);
  const cierreDiarioRealizado = useSelector(
    (state) => state.transacciones.cierreDiarioRealizado
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getsells());
  }, [dispatch]);

  // Calcular totales
  const totalVentas = ventas.reduce(
    (acc, venta) => acc + (venta.precioTotal || 0),
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
            <h1 className="page-title">Ventas</h1>
            <p className="page-subtitle">
              Historial y gestión de ventas realizadas
            </p>
          </div>
          <Link
            to="/add-ventas"
            className={`btn-primary inline-flex items-center gap-2 ${
              cierreDiarioRealizado ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => cierreDiarioRealizado && e.preventDefault()}
          >
            <FontAwesomeIcon icon={faPlus} />
            Nueva Venta
          </Link>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                className="text-emerald-400 text-xl"
              />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Ventas</p>
              <p className="text-2xl font-bold text-white">{ventas.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FontAwesomeIcon
                icon={faMoneyBill1Wave}
                className="text-blue-400 text-xl"
              />
            </div>
            <div>
              <p className="text-sm text-gray-400">Monto Total</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(totalVentas)}
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
                icon={faMoneyBill1Wave}
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

      {/* Ventas Table */}
      {ventas.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="p-4 bg-secondary-700/50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faMoneyBill1Wave}
              className="text-gray-500 text-3xl"
            />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No hay ventas aún
          </h3>
          <p className="text-gray-400 mb-6">
            {cierreDiarioRealizado
              ? "El día ya fue cerrado. Espera hasta mañana."
              : "Realiza tu primera venta"}
          </p>
          {!cierreDiarioRealizado && (
            <Link
              to="/add-ventas"
              className="btn-primary inline-flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} />
              Nueva Venta
            </Link>
          )}
        </div>
      ) : (
        <div className="card">
          <DataTableSell data={ventas} />
        </div>
      )}
    </div>
  );
};
