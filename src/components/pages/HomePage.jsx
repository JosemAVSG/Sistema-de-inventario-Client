import ChartComponent from "@/components/organisms/ChartComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faArrowTrendUp,
  faArrowTrendDown,
  faDollarSign,
  faBox,
  faChartLine,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { getproducts } from "@/redux/actionProducts";
import { Link } from "react-router-dom";
import LastSalesTable from "@/components/organisms/LastSell";

const HomePage = () => {
  const startDate = "2023-12-01";
  const endDate = "2023-12-31";

  const ventas = useSelector((state) => state.transacciones.ventas);
  const compras = useSelector((state) => state.transacciones.compras);
  const salesWithinRange = ventas.filter((ventas) => {
    return ventas.createdAt >= startDate && ventas.createdAt <= endDate;
  });
  const buyWithinRange = compras.filter((compras) => {
    return compras.createdAt >= startDate && compras.createdAt <= endDate;
  });
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproducts());
  }, []);

  // Calcular el total general
  const total = useMemo(() => {
    return products.reduce((accumulator, product) => {
      return accumulator + product.total;
    }, 0);
  }, [products]);

  const lowStockProducts = useMemo(() => {
    return products.filter((product) => product.stock < 2);
  }, [products]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  const sumaPrecios = ventas.reduce(
    (total, venta) => total + venta.precioTotal,
    0
  );

  const costos = ventas.map((venta) => {
    const preciosProductos = venta.productos.map(
      (producto) => producto.producto?.precio
    );
    return preciosProductos;
  });

  const sumaTotalCostos = costos.flat().reduce((total, precioProducto) => {
    const precioDefinido = precioProducto;
    return total + precioDefinido;
  }, 0);
  
  const margenGanancia = sumaPrecios - sumaTotalCostos;

  const gastos = buyWithinRange.reduce(
    (total, compra) => total + compra.precioUnitario,
    0
  );

  // Stat cards data
  const stats = [
    {
      title: "Total Ingresos",
      value: formatCurrency(sumaPrecios),
      change: "+12.5%",
      changeType: "positive",
      icon: faDollarSign,
      color: "from-emerald-500 to-emerald-700",
      link: "/ventas",
    },
    {
      title: "Valor Inventario",
      value: formatCurrency(total),
      change: "+8.2%",
      changeType: "positive",
      icon: faBox,
      color: "from-blue-500 to-blue-700",
      link: "/products",
    },
    {
      title: "Total Egresos",
      value: formatCurrency(gastos),
      change: "-3.1%",
      changeType: "negative",
      icon: faChartLine,
      color: "from-amber-500 to-amber-700",
      link: "/compras",
    },
    {
      title: "Stock Bajo",
      value: lowStockProducts.length,
      change: "Alerta",
      changeType: "warning",
      icon: faExclamationTriangle,
      color: "from-red-500 to-red-700",
      link: "/products",
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Bienvenido al panel de control de tu sistema de inventario
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="stat-card group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      stat.changeType === "positive"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : stat.changeType === "negative"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {stat.changeType === "positive" ? (
                      <FontAwesomeIcon icon={faArrowTrendUp} className="mr-1" />
                    ) : stat.changeType === "negative" ? (
                      <FontAwesomeIcon icon={faArrowTrendDown} className="mr-1" />
                    ) : null}
                    {stat.change}
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}
              >
                <FontAwesomeIcon
                  icon={stat.icon}
                  className="text-white text-xl"
                />
              </div>
            </div>
            <Link
              to={stat.link}
              className="flex items-center mt-4 text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              Ver detalles
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                className="ml-2"
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 card p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Análisis de Ventas
            </h2>
            <select className="bg-secondary-700 border border-secondary-600 text-sm text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Últimos 7 días</option>
              <option>Último mes</option>
              <option>Últimos 3 meses</option>
            </select>
          </div>
          <div className="chart-container">
            <ChartComponent />
          </div>
        </div>

        {/* Recent Sales */}
        <div className="card p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Últimas Ventas
            </h2>
            <Link
              to="/ventas"
              className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
            >
              Ver todas
            </Link>
          </div>
          <LastSalesTable />
        </div>
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Ganancia Margin */}
        <div className="card p-6 card-hover">
          <h2 className="text-lg font-semibold text-white mb-4">
            Margen de Ganancia
          </h2>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary-500/20 to-emerald-500/20 border-4 border-primary-500/30">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">
                    {formatCurrency(margenGanancia)}
                  </p>
                  <p className="text-sm text-gray-400">Ganancia Total</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-secondary-700/50 rounded-lg">
                  <p className="text-sm text-gray-400">Ingresos</p>
                  <p className="text-lg font-semibold text-emerald-400">
                    {formatCurrency(sumaPrecios)}
                  </p>
                </div>
                <div className="p-3 bg-secondary-700/50 rounded-lg">
                  <p className="text-sm text-gray-400">Costos</p>
                  <p className="text-lg font-semibold text-red-400">
                    {formatCurrency(sumaTotalCostos)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6 card-hover">
          <h2 className="text-lg font-semibold text-white mb-4">
            Acciones Rápidas
          </h2>
          <div className="space-y-3">
            <Link
              to="/add-products"
              className="flex items-center gap-4 p-4 bg-secondary-700/50 rounded-lg hover:bg-secondary-700 transition-colors group"
            >
              <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                <FontAwesomeIcon icon={faBox} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">Nuevo Producto</p>
                <p className="text-sm text-gray-400">
                  Agregar producto al inventario
                </p>
              </div>
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
            </Link>
            <Link
              to="/add-ventas"
              className="flex items-center gap-4 p-4 bg-secondary-700/50 rounded-lg hover:bg-secondary-700 transition-colors group"
            >
              <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                <FontAwesomeIcon icon={faDollarSign} className="text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">Nueva Venta</p>
                <p className="text-sm text-gray-400">
                  Registrar nueva venta
                </p>
              </div>
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
            </Link>
            <Link
              to="/add-compras"
              className="flex items-center gap-4 p-4 bg-secondary-700/50 rounded-lg hover:bg-secondary-700 transition-colors group"
            >
              <div className="p-2 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                <FontAwesomeIcon icon={faBox} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-white">Nueva Compra</p>
                <p className="text-sm text-gray-400">
                  Registrar compra a proveedor
                </p>
              </div>
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                className="text-gray-400 group-hover:text-white transition-colors"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
