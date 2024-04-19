import { useSelector } from "react-redux";

const LastSalesTable = () => {
  // Supongamos que tienes datos de ventas en un array
  const salesData = useSelector((state) => state.transacciones.ventas);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP", // Cambia 'COL' por el código de la moneda que necesitas
    }).format(value);
  };
  // Obtener solo las últimas 5 ventas
  const lastFiveSales = salesData.slice(-5);

  return (
    <div className="   bg-white text-black rounded-lg">
      <h2 className=" text-xl text-black rounded-lg  font-bold mb-3  pl-5 bg-white py-1 ">
        Últimas Ventas
      </h2>
      <table className="tablesell rounded-lg  shadow-lg mx-1 bg-white">
        <thead>
          <tr className="bg-cyan-800">
            <th className="text-left py-2 px-2">Producto</th>
            <th className="text-left py-2 px-2">Cantidad</th>
            <th className="text-left py-2 px-2">Precio Unitario</th>
            <th className="text-left py-2 px-2">Fecha de Venta</th>
            {/* Puedes agregar más encabezados si es necesario */}
          </tr>
        </thead>
        <tbody>
          {lastFiveSales.map((sale, index) => (
            <tr
              key={sale._id}
              className={index % 2 === 0 ? "bg-gray-300" : "bg-gray-100 "}
            >
              <td className="text-center  py-2">
                <ul>
                  {sale.productos.map((producto, index) => (
                    <li className="p-2" key={index}>
                      {producto.producto?.nombre}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="text-left py-2 px-2">
                <ul>
                  {sale.productos.map((producto, index) => (
                    <li className=" text-center" key={index}>
                      {producto.cantidad}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="text-center py-2">
                <ul>
                  {sale.productos.map((producto, index) => (
                    <li className="p-2" key={index}>
                      {formatCurrency(producto.precioUnitario)}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="text-left py-2 px-4">{sale.createdAt}</td>
              {/* Agrega más columnas según los datos que tengas */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LastSalesTable;
