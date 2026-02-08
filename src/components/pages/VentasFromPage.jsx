import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { addTransaccion } from "@/redux/actionTransaccion";
import { getproducts } from "@/redux/actionProducts";
import { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlus, 
  faMinus, 
  faTrash, 
  faShoppingCart, 
  faArrowLeft,
  faUser
} from "@fortawesome/free-solid-svg-icons";

const VentasFromPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const products = useSelector((state) => state.product.products);
  const [productosVenta, setProductosVenta] = useState([]);
  const [agotadoMessage, setAgotadoMessage] = useState("");
  const [descuento, setDescuento] = useState(0);

  const handleAumentarPorcentaje = () => {
    setDescuento(descuento + 5);
  };

  const handleDarDescuento = () => {
    setDescuento(Math.max(descuento - 5, 0));
  };

  const totalConDescuento = useMemo(() => {
    const totalSinDescuento = productosVenta.reduce(
      (acc, product) => acc + (product.precioVenta || product.precioUnitario) * product.cantidad,
      0
    );
    
    const descuentoAplicado = totalSinDescuento * (descuento / 100);
    return Math.max(totalSinDescuento - descuentoAplicado, 0);
  }, [productosVenta, descuento]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(value);
  };

  const onSubmit = handleSubmit((data) => {
    const productosSinNombre = productosVenta.map(producto => {
      const { nombre, precioVenta, ...resto } = producto;
      return resto;
    });
    
    const datos = {
      tipo: "Venta",
      productos: productosSinNombre,
      precioTotal: totalConDescuento,
      cliente: data.cliente
    };
    
    dispatch(addTransaccion(datos));
    setTimeout(() => {
      navigation("/ventas");
    }, 500);
  });

  useEffect(() => {
    dispatch(getproducts());
  }, []);

  useEffect(() => {
    let timeoutId;
    if (agotadoMessage) {
      timeoutId = setTimeout(() => {
        setAgotadoMessage("");
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [agotadoMessage]);
  
  const handleSelectChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );
    
    if (!selectedProduct) return;

    if (selectedProduct.stock === 0) {
      setAgotadoMessage(`El producto "${selectedProduct.nombre}" está agotado.`);
      return;
    }

    const productoExistenteIndex = productosVenta.findIndex(
      (producto) => producto.producto === selectedProduct._id
    );

    if (productoExistenteIndex === -1) {
      setAgotadoMessage("");
      setProductosVenta([
        ...productosVenta,
        {
          producto: selectedProductId,
          precioUnitario: parseFloat(selectedProduct?.precio),
          precioVenta: parseFloat(selectedProduct?.precio),
          cantidad: 1,
          nombre: selectedProduct.nombre,
          stock: selectedProduct.stock,
        },
      ]);
    }
  };

  const handleEliminarProducto = (index) => {
    setProductosVenta((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleCantidadChange = (event, index) => {
    const inputCantidad = parseInt(event.target.value, 10);
    const updated = [...productosVenta];
    const stock = updated[index].stock;

    if (inputCantidad >= 1 && inputCantidad <= stock) {
      updated[index].cantidad = inputCantidad;
    } else if (inputCantidad > stock) {
      updated[index].cantidad = stock;
    } else {
      updated[index].cantidad = 1;
    }
    setProductosVenta(updated);
  };

  const handlePriceChange = (event, index) => {
    const newPrice = parseFloat(event.target.value);
    const updated = [...productosVenta];
    const selectedProduct = products.find(p => p._id === updated[index].producto);
    const precioCompra = selectedProduct?.precio;

    if (newPrice >= precioCompra) {
      updated[index].precioVenta = newPrice;
      setProductosVenta(updated);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex items-center gap-4">
          <Link
            to="/ventas"
            className="p-2 bg-secondary-700 rounded-lg hover:bg-secondary-600 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-gray-400" />
          </Link>
          <div>
            <h1 className="page-title">Nueva Venta</h1>
            <p className="page-subtitle">
              Registra una nueva venta de productos
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

            {agotadoMessage && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg">
                {agotadoMessage}
              </div>
            )}

            <select
              className="input-field mb-6"
              onChange={handleSelectChange}
            >
              <option value="">Selecciona un producto</option>
              {products.map((product) => (
                <option 
                  key={product._id} 
                  value={product._id}
                  disabled={product.stock === 0}
                >
                  {product.nombre} - Stock: {product.stock}
                </option>
              ))}
            </select>

            {/* Selected Products */}
            {productosVenta.length > 0 && (
              <div className="space-y-4">
                {productosVenta.map((producto, index) => (
                  <div
                    key={index}
                    className="p-4 bg-secondary-700/50 rounded-lg border border-secondary-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{producto.nombre}</h3>
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
                              const updated = [...productosVenta];
                              updated[index].cantidad = Math.max(updated[index].cantidad - 1, 1);
                              setProductosVenta(updated);
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
                            max={producto.stock}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...productosVenta];
                              updated[index].cantidad = Math.min(updated[index].cantidad + 1, producto.stock);
                              setProductosVenta(updated);
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
                          value={producto.precioVenta}
                          onChange={(e) => handlePriceChange(e, index)}
                          className="input-field"
                          step="0.01"
                        />
                      </div>
                      
                      <div>
                        <label className="label">Subtotal</label>
                        <p className="text-lg font-semibold text-white">
                          {formatCurrency(producto.precioVenta * producto.cantidad)}
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
              Resumen de Venta
            </h2>

            {productosVenta.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No hay productos seleccionados
              </p>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Productos</span>
                    <span>{productosVenta.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>
                      {formatCurrency(
                        productosVenta.reduce(
                          (acc, p) => acc + p.precioVenta * p.cantidad,
                          0
                        )
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Descuento</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleDarDescuento}
                        className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="text-white font-medium">{descuento}%</span>
                      <button
                        type="button"
                        onClick={handleAumentarPorcentaje}
                        className="p-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-secondary-700 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-emerald-400">
                      {formatCurrency(totalConDescuento)}
                    </span>
                  </div>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="label">Cliente</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Nombre del cliente"
                        {...register("cliente")}
                        className="input-field pl-10"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-3"
                    disabled={productosVenta.length === 0}
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                    Confirmar Venta
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

export default VentasFromPage;
