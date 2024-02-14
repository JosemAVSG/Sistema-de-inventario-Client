import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addTransaccion } from "../redux/actionTransaccion";
import { getproducts } from "../redux/actionProducts";
import { useEffect, useState,useMemo } from "react";

const VentasFromPage = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  // const params = useParams();

  const products = useSelector((state) => state.product.products);
  const [precioProductoSeleccionado, setPrecioProductoSeleccionado] = useState([]);
  const [productosVenta, setProductosVenta] = useState([]);
  const [agotadoMessage, setAgotadoMessage] = useState("");
  const [descuento, setDescuento] = useState(0);

  const handleAumentarPorcentaje = () => {
    setDescuento(descuento + 5); // Puedes ajustar el incremento según tus necesidades
  };

  const handleDarDescuento = () => {
    setDescuento(descuento - 5); // Puedes ajustar el decremento según tus necesidades
  };
// Suponiendo que cada producto tiene un atributo "precioUnitario"
const totalConDescuento = useMemo(() => {

  const totalOriginal = productosVenta.reduce(
    (accumulator, product) => accumulator + product.precioUnitario * product.cantidad,
    0
  );
  const totalSinDescuento = productosVenta.reduce(
    (accumulator, product) => accumulator + product.precioVenta * product.cantidad,
    0
  );
    console.log(totalOriginal,totalSinDescuento);
  
  const descuentoAplicado = totalSinDescuento * (descuento / 100);
  const totalConDescuento = Math.max(totalSinDescuento - descuentoAplicado, 0);

  
  if (totalConDescuento < totalOriginal) {
    alert('El descuento no puede hacer que el precio total sea menor al precio original');
    setDescuento(0)
    return totalSinDescuento
  }
  return totalConDescuento;
}, [productosVenta, descuento]);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP' // Cambia 'COL' por el código de la moneda que necesitas
  }).format(value);
};

// Llamas a formatCurrency con el total calculado para obtenerlo en formato de moneda
const totalFormateadoConDescuento = formatCurrency(totalConDescuento);
console.log('Total:', totalFormateadoConDescuento); // Muestra el total en formato de moneda

  const onSubmit = handleSubmit((data) => {

    const productosSinNombre = productosVenta.map(producto => {
      // eslint-disable-next-line no-unused-vars
      const { nombre,precioVenta, ...resto } = producto;
      return resto;
    });
    
    // Luego pasas productosSinNombre como productos
      console.log(productosSinNombre);

    const datos ={
      tipo: "Venta", // Establecer tipo como Venta
      productos: productosSinNombre,
      precioTotal:totalConDescuento,
      cliente:data.cliente
    }
    console.log(datos);
    dispatch(addTransaccion(datos));

    setTimeout(() => {
      navigation("/ventas");
   
    }, 500);
  });

  useEffect(() => {
    dispatch(getproducts());
  }, []);

  useEffect(() => {
    productosVenta.forEach((producto, index) => {
      const cantidadInput = document.getElementById(`cantidad-${index}`);
      const precioInput = document.getElementById(`precio-${index}`);

      if (cantidadInput?.value !== producto?.cantidad.toString()) {
        // Si la cantidad en el input no coincide con la cantidad del producto, actualiza
        cantidadInput.value = producto.cantidad;
      }

      if (precioInput?.value !== producto.precioUnitario.toString()) {
        // Si el precio en el input no coincide con el precio del producto, actualiza
        precioInput.value = producto.precioVenta || producto.precioUnitario;
      }
    });
  
  }, [productosVenta]);


  useEffect(() => {
    let timeoutId;
  
    if (agotadoMessage) {
      timeoutId = setTimeout(() => {
        setAgotadoMessage("");
      }, 5000);
    }
  
    // Limpiar el temporizador si el componente se desmonta o si agotadoMessage cambia
    return () => clearTimeout(timeoutId);
  }, [agotadoMessage]);
  
  const handleSelectChange = (event) => {
    const selectedProductId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === selectedProductId
    );
    const nombreP = selectedProduct.nombre;
    const precioParsed = parseFloat(selectedProduct?.precio);
   
    if (selectedProduct.stock === 0) {
      // Evitar agregar productos con stock igual a cero
      setAgotadoMessage(`El producto "${selectedProduct.nombre}" está agotado.`);
      return;
    }else{

      // Verificar si el producto ya está en productosVenta
    const productoExistenteIndex = productosVenta.findIndex(
      (producto) => producto.producto === selectedProduct._id
    );
    if (productoExistenteIndex !== -1) {
      // Si el producto ya está en productosVenta, actualiza su precioUnitario
     return;
    } else {
      setAgotadoMessage("");
      // Si el producto no está en productosVenta, agrégalo
      setProductosVenta([
        ...productosVenta,
        {
          producto: selectedProductId,
          precioUnitario: precioParsed,
          cantidad: 1,
          nombre:nombreP
        },
      ]);
    }
    }
    
   
  };

  const handleEliminarProducto = (index) => {
    setProductosVenta((prevProductosVenta) => {
      const updatedProductosVenta = [...prevProductosVenta];
      updatedProductosVenta.splice(index, 1);
      return updatedProductosVenta;
    });
  };

  
  const handleCantidadChange = (event, index) => {
    const inputCantidad = parseInt(event.target.value, 10);
    const updatedProductosVenta = [...productosVenta];
    
    const selectedProduct = products.find(
      (product) => product._id === updatedProductosVenta[index].producto
    );
    
    const stock = selectedProduct?.stock;


    if (inputCantidad >= 1 && inputCantidad <= stock) {
      updatedProductosVenta[index].cantidad = parseInt(inputCantidad);
      setProductosVenta(updatedProductosVenta);
    } else if (inputCantidad > stock) {
      updatedProductosVenta[index].cantidad = stock;
      setProductosVenta(updatedProductosVenta);
    } else {
      updatedProductosVenta[index].cantidad = 1;
      setProductosVenta(updatedProductosVenta);
    }
  };

  const handlePriceChange = (event, index) => {
  const newPrice = parseFloat(event.target.value);
  const updatedProductosVenta = [...productosVenta];
  const selectedProduct = products.find(
    (product) => product._id === updatedProductosVenta[index].producto
  );
   
  const precioCompra = selectedProduct?.precio;
  
  // Verifica que el nuevo precio no sea menor al precio de compra ni al precio original
  if (newPrice >= precioCompra ) {
    // Si el nuevo precio es válido, actualiza el estado
    const newProductosVenta = [...productosVenta];
    newProductosVenta[index].precioVenta = newPrice
    console.log(newProductosVenta[index].precioVenta );
    setProductosVenta(newProductosVenta);
  } else {
    // Si el nuevo precio es inválido, muestra una alerta
    alert('El precio de venta no puede ser menor al precio de compra ni al precio original');
    
  }
};



  return (
    <div className="h-screen w-full flex items-center">
       <div className="bg-zinc-800 ventas rounded-md grid gap-4">
        <h1 className=" font-bold text-3xl">Nueva Venta</h1>
       {agotadoMessage && (
        <div className="bg-red-600 text-white p-3 rounded-lg my-3">
          {agotadoMessage}
        </div>
      )}
      <form onSubmit={onSubmit} className="grid gap-4">
        <select
          className="w-full bg-zinc-700 grid-auto-rows px-4 py-2 rounded-md"
          onChange={handleSelectChange}
        >
          <option value="">Selecciona un producto</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.nombre}
            </option>
          ))}
        </select>
        
        <div className="grid gap-4">
          {productosVenta.map((producto, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <span>{`${producto?.nombre}`}</span>
              
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => handleAumentarPorcentaje(index)}
                  className="bg-green-500 text-white rounded-md px-2 py-1 mr-2 mb-2"
                >
                  +5%
                </button>
                <button
                  type="button"
                  onClick={() => handleDarDescuento(index)}
                  className="bg-red-500 text-white rounded-md px-2 py-1 mr-2"
                >
                  -5%
                </button>
              </div>
              
              <div className="grid gap-2 w-full ">
                <input
                  type="number"
                  id={`cantidad-${index}`}
                  placeholder={`${producto?.producto?.stock}`}
                  {...register(`cantidad[${index}]`)}
                  autoFocus
                  className="w-full bg-zinc-700 px-2 py-1 rounded-md"
                  value={producto?.cantidad}
                  onChange={(e) => handleCantidadChange(e, index)}
                />
                
                <input
                  type="number"
                  id={`precio-${index}`}
                  placeholder={`${producto?.producto?.precio}`}
                  {...register(`precioUnitario[${index}]`)}
                  autoFocus
                  className="w-full bg-zinc-700 px-4 py-2 rounded-md"
                  onBlur={(e) => handlePriceChange(e, index)}
                 
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
        
      
        
        <div className="flex justify-between">
          Descuento: {descuento}%
          <span className="flex justify-end">{totalFormateadoConDescuento}</span>
        </div>
        
        <input
          type="text"
          placeholder="cliente"
          {...register("cliente")}
          autoFocus
          className="w-full bg-zinc-700 px-4 py-2 rounded-md"
        />
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-800 mt-4 rounded-lg px-4 py-1"
          >
            Save
          </button>
        </div>
      </form>
      
     
    </div>
    </div>
   
  );
  
};

export default VentasFromPage;
