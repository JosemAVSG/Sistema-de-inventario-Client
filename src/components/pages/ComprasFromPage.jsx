import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addTransaccion } from "@/redux/actionTransaccion";
import { getproducts } from "@/redux/actionProducts";
import { useEffect, useState,useMemo } from "react";

const ComprasFromPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  // const params = useParams();

  const products = useSelector((state) => state.product.products);
  const [precioProductoSeleccionado, setPrecioProductoSeleccionado] = useState([]);
  const [productosCompra, setproductosCompra] = useState([]);
  const proveedores = useSelector((state) => state.proveedor.proveedors);

// Suponiendo que cada producto tiene un atributo "precioUnitario"
const total = useMemo(() => {
  return productosCompra.reduce((accumulator, product) => {
    return accumulator + product.precioUnitario*product.cantidad;
  }, 0);
}, [productosCompra]);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP' // Cambia 'COL' por el código de la moneda que necesitas
  }).format(value);
};

// Llamas a formatCurrency con el total calculado para obtenerlo en formato de moneda
const totalFormateado = formatCurrency(total);
console.log('Total:', totalFormateado); // Muestra el total en formato de moneda

  const onSubmit = handleSubmit((data) => {

    const productosSinNombre = productosCompra.map(producto => {
      // eslint-disable-next-line no-unused-vars
      const { nombre, ...resto } = producto;
      return resto;
    });
    
    // Luego pasas productosSinNombre como productos
    console.log(data);

    const datos ={
      tipo: "Compra", // Establecer tipo como Venta
      productos: productosSinNombre,
      precioTotal:total,
      proveedor:data.proveedor
    }
    console.log(datos);
    dispatch(addTransaccion(datos));

    setTimeout(() => {
      navigation("/compras");
    }, 500);
  });

  useEffect(() => {
    dispatch(getproducts());
  }, []);

  useEffect(() => {
    productosCompra.forEach((producto, index) => {
      const cantidadInput = document.getElementById(`cantidad-${index}`);
      const precioInput = document.getElementById(`precio-${index}`);

      if (cantidadInput?.value !== producto?.cantidad.toString()) {
        // Si la cantidad en el input no coincide con la cantidad del producto, actualiza
        cantidadInput.value = producto.cantidad;
      }

      if (precioInput?.value !== producto.precioUnitario.toString()) {
        // Si el precio en el input no coincide con el precio del producto, actualiza
        precioInput.value = producto.precioUnitario;
      }
    });
  
  }, [productosCompra]);

  const handleSelectChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );
    const nombreP = selectedProduct.nombre;
    const precioParsed = parseInt(selectedProduct?.precio);
   
    // Verificar si el producto ya está en productosCompra
    const productoExistenteIndex = productosCompra.findIndex(
      (producto) => producto.producto === selectedProduct._id
    );
    if (productoExistenteIndex !== -1) {
      // Si el producto ya está en productosCompra, actualiza su precioUnitario
     return;
    } else {
      // Si el producto no está en productosCompra, agrégalo
  
      setproductosCompra([
        ...productosCompra,
        {
          producto: selectedProductId,
          precioUnitario: precioParsed,
          cantidad: 1,
          nombre:nombreP
        },
      ]);
    }
   
  };

  const handleEliminarProducto = (index) => {
    setproductosCompra((prevproductosCompra) => {
      const updatedproductosCompra = [...prevproductosCompra];
      updatedproductosCompra.splice(index, 1);
      return updatedproductosCompra;
    });
  };

  
  const handleCantidadChange = (event, index) => {
    const inputCantidad = parseInt(event.target.value, 10);
    const updatedproductosCompra = [...productosCompra];
    
    const selectedProduct = products.find(
      (product) => product._id === updatedproductosCompra[index].producto
    );
    
    const stock = selectedProduct?.stock;


    if (inputCantidad >= 1 && inputCantidad <= stock) {
      updatedproductosCompra[index].cantidad = parseInt(inputCantidad);
      setproductosCompra(updatedproductosCompra);
    } else if (inputCantidad > stock) {
      updatedproductosCompra[index].cantidad = stock;
      setproductosCompra(updatedproductosCompra);
    } else {
      updatedproductosCompra[index].cantidad = 1;
      setproductosCompra(updatedproductosCompra);
    }
  };

  const handlePriceChange = (event, index) => {
    // const inputprecio = parseInt(event.target.value, 10);

    console.log(index);
    const precio = productosCompra[index]?.producto.precio;

    setPrecioProductoSeleccionado(precio);
    console.log(precioProductoSeleccionado);
  };


  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <select
          className=" w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
          // {...register("referencia")}
          onChange={handleSelectChange}
        >
          <option value="">Selecciona un producto</option>
          {products.map((products) => (
            <option key={products._id} value={products._id}>
              {products.nombre}
            </option>
          ))}
        </select>
        <div>
          {productosCompra.map((producto, index) => (
            
            <div key={index} className="flex justify-between items-center">
            
                <span>{`${producto?.nombre}`}</span>
            
              <div>
                <input
                  type="number"
                  id={`cantidad-${index}`} 
                  placeholder={`${producto?.producto?.stock}`}
                  {...register("cantidad")}
                  autoFocus
                  className="w-16 bg-zinc-700 px-2 py-1 rounded-md mr-2"
                  value={producto?.cantidad}
                  onChange={(e) => handleCantidadChange(e, index)}
                />
                <input
                  type="number"
                  id={`precio-${index}`}
                  placeholder={`${producto?.producto?.precio}`}
                  {...register("precioUnitario")}
                  autoFocus
                  className="w-32 bg-zinc-700 px-4 py-2 rounded-md my-2"
                  onChange={(e) => handlePriceChange(e, index)}
                 value={producto?.precioUnitario}
                />
                <button
                  type="button"
                  onClick={() => handleEliminarProducto(index)}
                  className="bg-red-600 text-white rounded-md px-2 py-1"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        <span className="flex justify-end">{totalFormateado}</span>
        <select className=" w-full bg-zinc-700 px-4 py-2 rounded-md my-2"{...register("proveedor")}>
          <option value="">Selecciona un proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id} value={proveedor._id}>
              {proveedor.nombre}
            </option>
          ))}
        </select>
        <br></br>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-700 mt-4 rounded-lg px-4 py-1"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComprasFromPage;
