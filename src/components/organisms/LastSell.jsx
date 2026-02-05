import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const LastSalesTable = () => {
  const salesData = useSelector((state) => state.transacciones.ventas);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("es-CO", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Obtener solo las últimas 5 ventas
  const lastFiveSales = [...salesData]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="h-full">
      {lastFiveSales.length === 0 ? (
        <div className="text-center py-8">
          <div className="p-4 bg-secondary-700/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-gray-500 text-xl"
            />
          </div>
          <p className="text-gray-400">No hay ventas recientes</p>
        </div>
      ) : (
        <div className="space-y-3">
          {lastFiveSales.map((sale) => (
            <div
              key={sale._id}
              className="p-4 bg-secondary-700/50 rounded-lg hover:bg-secondary-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs text-gray-400">
                    {formatDate(sale.createdAt)}
                  </span>
                </div>
                <span className="text-sm font-semibold text-emerald-400">
                  {formatCurrency(sale.precioTotal || 0)}
                </span>
              </div>
              
              <div className="space-y-1">
                {sale.productos?.slice(0, 2).map((producto, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-300 truncate max-w-[150px]">
                      {producto.producto?.nombre || "Producto"}
                    </span>
                    <span className="text-gray-500">x{producto.cantidad}</span>
                  </div>
                ))}
                {sale.productos?.length > 2 && (
                  <p className="text-xs text-gray-500">
                    +{sale.productos.length - 2} más...
                  </p>
                )}
              </div>
              
              {sale.cliente && (
                <div className="mt-2 pt-2 border-t border-secondary-600">
                  <p className="text-xs text-gray-400">
                    Cliente: <span className="text-gray-300">{sale.cliente}</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {lastFiveSales.length > 0 && (
        <div className="mt-4 pt-4 border-t border-secondary-700">
          <Link
            to="/ventas"
            className="flex items-center justify-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            Ver todas las ventas
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default LastSalesTable;
