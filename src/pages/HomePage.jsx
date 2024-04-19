import ChartComponent from "../components/ChartComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faDownLong,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { getproducts } from "../redux/actionProducts";
import { Link } from "react-router-dom";
import LastSalesTable from "../components/LastSell";
const HomePage = () => {
  const startDate = "2023-12-01";
  const endDate = "2023-12-31"

  const ventas = useSelector((state) => state.transacciones.ventas);
  const compras = useSelector((state) => state.transacciones.compras);
  const salesWithinRange = ventas.filter((ventas) => {
    return ventas.createdAt >= startDate && ventas.createdAt <= endDate;
  });
  console.log(salesWithinRange);
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
      currency: "COP", // Cambia 'COL' por el código de la moneda que necesitas
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
  return (
    <div className="p-6 grid-flow-row min-[320px]:grid-cols-1 max-[600px]:grid-cols-2   w-full">
      <div className="grid  mb-2 sm:grid-cols-2  min-[320px]:grid-cols-1 max-[600px]:grid-cols-2 xl:grid-cols-4 gap-4 rounded shadow-sm">
        <div className="px-4 py-6 shadow-lg hover:scale-105  transition ease-in-out duration-500 bg-cyan-800">
          <div className="flex items-center">
            <p>Total de Ingresos</p>
            <p className="text-green-500 py-1 ml-2 px-2 flex bg-green-200 rounded-full font-bold">
              10.20%{" "}
              <FontAwesomeIcon
                icon={faUpLong}
                className="ml-2 text-xl leading-none rounded-lg shadow-sm"
              />
            </p>
            <p>{margenGanancia}</p>
          </div>
          <div className="text-3xl font-bold mb-2">
            {formatCurrency(sumaPrecios)}
          </div>
          <a href="#" className="text-blue-400">
            Ver informacion{" "}
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              className="ml-2 text-xl leading-none rounded-lg shadow-sm"
            />{" "}
          </a>
        </div>
        <div className="px-4 py-6 hover:scale-105  transition ease-in-out duration-500 bg-yellow-800">
          <div className="flex items-center">
            <p>Valor Actual de Inventario</p>
            <p className="text-red-500 py-1 ml-2 px-2 flex bg-red-200 rounded-full font-bold">
              10.20%{" "}
              <FontAwesomeIcon
                icon={faDownLong}
                className="ml-2 text-xl leading-none rounded-lg shadow-sm"
              />
            </p>
          </div>
          <div className="text-3xl font-bold mb-2 ">
            {formatCurrency(total)}
          </div>
          <Link to="/products" className="text-blue-400">
            Ver informacion{" "}
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              className="ml-2 text-xl leading-none rounded-lg shadow-sm"
            />{" "}
          </Link>
        </div>
        <div className="px-4 py-6 hover:scale-105  transition ease-in-out duration-500 bg-cyan-800">
          <div className="flex items-center">
            <p>Total de Egresos</p>
            <p className="text-green-500 py-1 ml-2 px-2 flex bg-green-200 rounded-full font-bold">
              10.20%
            </p>
          </div>
          <div className="text-3xl font-bold mb-2">
            {formatCurrency(gastos)}
          </div>
          <a href="#" className="text-blue-400">
            Ver informacion{" "}
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              className="ml-2 text-xl leading-none rounded-lg shadow-sm"
            />{" "}
          </a>
        </div>
        <div className="px-4 py-6 hover:scale-105  transition ease-in-out duration-500 bg-yellow-800">
          <div className="flex items-center">
            <p>Prodctos en baja existencia</p>
            <p className="text-green-500 py-1 ml-2 px-2 flex bg-green-200 rounded-full font-bold">
              10.20%{" "}
              <FontAwesomeIcon
                icon={faUpLong}
                className="ml-2 text-xl leading-none rounded-lg shadow-sm"
              />
            </p>
          </div>
          <div className="text-3xl font-bold mb-2">
            {lowStockProducts.length}
          </div>
          <a href="#" className="text-blue-400">
            Ver informacion{" "}
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              className="ml-2 text-xl leading-none rounded-lg shadow-sm"
            />
          </a>
        </div>
      </div>
      <div className="mt-5 lg:flex sm:grid-cols-1  min-[320px]:grid-cols-1 max-[300px]:grid-cols-2  rounded">
        <div className=" flex-grow  sm:mb-5">
          <ChartComponent></ChartComponent>
        </div>
        <div className="lg:ml-4  sm:col-span-1  md:max-w-[500px]">
          <LastSalesTable></LastSalesTable>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
