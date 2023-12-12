import { useEffect,useMemo} from "react";
import { getproducts } from "../redux/actionProducts";
import { useDispatch, useSelector } from "react-redux";

const ProductsPage = () => {
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

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP' // Cambia 'COL' por el código de la moneda que necesitas
      }).format(value);
    };

  return (
    <>
      {products.length === 0 && (
        <div>
          <h1 className="font-bold text-xl">
            No products yet, please add a new product
          </h1>
        </div>
      )}
      {products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border  bg-zinc-500 border-gray-200 px-4 py-2">Name</th>
                <th className="border  bg-zinc-500 border-gray-200 px-4 py-2">Description</th>
                <th className="border  bg-zinc-500 border-gray-200 px-4 py-2">Price</th>
                <th className="border  bg-zinc-500 border-gray-200 px-4 py-2">Stock</th>
                <th className="border  bg-zinc-500 border-gray-200 px-4 py-2">Total</th>
                {/* Agrega más encabezados según tus necesidades */}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border border-gray-200">
                  <td className="border border-gray-200 px-6 py-2">{product.nombre}</td>
                  <td className="border border-gray-200 px-6 py-2">{product.descripcion}</td>
                  <td className="border border-gray-200 px-4 py-2">{formatCurrency(product.precio)}</td>
                  <td className=" border-gray-200 flex justify-center px-4 py-2">{product.stock}</td>
                  <td className="border border-gray-200 px-5 py-2">{formatCurrency(product.total)}</td>
                  {/* Agrega más celdas según la información de tus productos */}
                </tr>
              ))}
                <tr>
          <td colSpan="4">Total General:</td>
          <td className="border border-gray-200 px-4 py-2">{formatCurrency(total)}</td>
        </tr>
              
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
