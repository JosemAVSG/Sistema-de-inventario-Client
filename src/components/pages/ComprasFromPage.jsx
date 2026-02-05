import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { addTransaccion } from "@/redux/actionTransaccion";
import { getproducts } from "@/redux/actionProducts";
import { getProveedors } from "@/redux/actionProveedor";
import { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faMinus, 
  faTrash, 
  faShoppingBag, 
  faArrowLeft,
  faUserTie,
  faBox
} from "@fortawesome/free-solid-svg-icons";

const ComprasFromPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const products = useSelector((state) => state.product.products);
  const proveedores = useSelector((state) => state.proveedor.proveedors);
  const [productosCompra, setproductosCompra] = useState([]);

  const total = useMemo(() => {
    return productosCompra.reduce((acc, product) => {
      return acc + product.precioUnitario * product.cantidad;
    }, 0);
  }, [productosCompra]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(value);
  };

  const onSubmit = handleSubmit((data) => {
    const productosSinNombre = productosCompra.map(producto => {
      const { nombre, ...resto } = producto;
      return resto;
    });

    const datos = {
      tipo: "Compra",
      productos: productosSinNombre,
      precioTotal: total,
      proveedor: data.proveedor,
    };
    
    dispatch(addTransaccion(datos));
    setTimeout(() => {
      navigation("/compras");
    }, 500);
  });

  useEffect(() => {
    dispatch(getproducts());
    dispatch(getProveedors());
  }, []);

  const handleSelectChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );
    
    if (!selectedProduct) return;

    const productoExistenteIndex = productosCompra.findIndex(
      (producto) => producto.producto === selectedProduct._id
    );

    if (productoExistenteIndex === -1) {
      setproductosCompra([
        ...productosCompra,
        {
          producto: selectedProductId,
          precioUnitario: parseFloat(selectedProduct?.precio),
          cantidad: 1,
          nombre: selectedProduct.nombre,
        },
      ]);
    }
  };

  const handleEliminarProducto = (index) => {
    setproductosCompra((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleCantidadChange = (event, index) => {
    const inputCantidad = parseInt(event.target.value, 10);
    const updated = [...productosCompra];

    if (inputCantidad >= 1) {
      updated[index].cantidad = inputCantidad;
    } else {
      updated[index].cantidad = 1;
    }
    setproductosCompra(updated);
  };

  const handlePriceChange = (event, index) => {
    const newPrice = parseFloat(event.target.value);
    const updated = [...productosCompra];
    updated[index].precioUnitario = newPrice;
    setproductosCompra(updated);
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex items-center gap-4">
          <Link
            to="/compras"
            className="p-2 bg-secondary-700 rounded-lg hover:bg-secondary-600 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-gray-400" />
          </Link>
          <div>
            <h1 className="page-title">Nueva Compra</h1>
            <p className="page-subtitle">
              Registra una nueva compra a proveedor
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Selection */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Seleccionar Productos
            </h2>

            <select
              className="input-field mb-6"
              onChange={handleSelectChange}
            >
              <option value="">Selecciona un producto</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.nombre}
                </option>
              ))}
            </select>

            {/* Selected Products */}
            {productosCompra.length > 0 && (
              <div className="space-y-4">
                {productosCompra.map((producto, index) => (
                  <div
                    key={index}
                    className="p-4 bg-secondary-700/50 rounded-lg border border-secondary-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <FontAwesomeIcon icon={faBox} className="text-blue-400" />
                        </div>
                        <h3 className="font-semibold text-white">{producto.nombre}</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleEliminarProducto(index)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="label">Cantidad</label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...productosCompra];
                              updated[index].cantidad = Math.max(updated[index].cantidad - 1, 1);
                              setproductosCompra(updated);
                            }}
                            className="p-2 bg-secondary-600 rounded-lg hover:bg-secondary-500"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <input
                            type="number"
                            value={producto.cantidad}
                            onChange={(e) => handleCantidadChange(e, index)}
                            className="input-field text-center w-20"
                            min="1"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...productosCompra];
                              updated[index].cantidad = updated[index].cantidad + 1;
                              setproductosCompra(updated);
                            }}
                            className="p-2 bg-secondary-600 rounded-lg hover:bg-secondary-500"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="label">Precio Unitario</label>
                        <input
                          type="number"
                          value={producto.precioUnitario}
                          onChange={(e) => handlePriceChange(e, index)}
                          className="input-field"
                          step="0.01"
                        />
                      </div>
                      
                      <div>
                        <label className="label">Subtotal</label>
                        <p className="text-lg font-semibold text-white">
                          {formatCurrency(producto.precioUnitario * producto.cantidad)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="card p-6 sticky top-20">
            <h2 className="text-lg font-semibold text-white mb-4">
              Resumen de Compra
            </h2>

            {productosCompra.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No hay productos seleccionados
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Productos</span>
                    <span>{productosCompra.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Total Items</span>
                    <span>
                      {productosCompra.reduce((acc, p) => acc + p.cantidad, 0)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-secondary-700 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-blue-400">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="label">Proveedor</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faUserTie} className="text-gray-400" />
                      </div>
                      <select
                        {...register("proveedor", { required: true })}
                        className="input-field pl-10 appearance-none"
                      >
                        <option value="">Selecciona un proveedor</option>
                        {proveedores.map((proveedor) => (
                          <option key={proveedor._id} value={proveedor._id}>
                            {proveedor.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-3"
                    disabled={productosCompra.length === 0}
                  >
                    <FontAwesomeIcon icon={faShoppingBag} className="mr-2" />
                    Confirmar Compra
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprasFromPage;
