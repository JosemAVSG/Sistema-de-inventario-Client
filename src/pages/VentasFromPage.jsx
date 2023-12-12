import { useDispatch,useSelector} from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { addTransaccion } from "../redux/actionTransaccion";
import { getproducts } from "../redux/actionProducts";
import { useEffect,useState } from "react";


const VentasFromPage = () => {
    const { register, handleSubmit, } = useForm();
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const params = useParams();

    const products = useSelector(state => state.product.products)
       const [precioProductoSeleccionado, setPrecioProductoSeleccionado] = useState();
      const [stockDisponible, setStockDisponible] = useState();
      const [cantidad, setCantidad] = useState();
  
  
      
      const onSubmit = handleSubmit((data) => {

        const datosVenta = {
            ...data, // Agregar otros datos del formulario
            tipo: 'Venta', // Establecer tipo como Venta
            cantidad: parseInt(data.cantidad),// convertir
            precioUnitario:precioProductoSeleccionado,
            producto: data.referencia,  
          };
         
        console.log(params.id);
        console.log(data);
        console.log(datosVenta);
     
         dispatch(addTransaccion(datosVenta));
           
    
        setTimeout(() => {
          navigation("/ventas");
        }, 500);
      });
  
      useEffect(() => {
        dispatch(getproducts());
        
      }, []);
      
      const handleSelectChange = (event) => {
        const selectedProductId = event.target.value;
        const selectedProduct = products.find((product) => product._id === selectedProductId);
        const precioParsed = parseFloat(selectedProduct.precio)
        setPrecioProductoSeleccionado(precioParsed);
        setStockDisponible(selectedProduct.stock);
        
      };
      const handleCantidadChange = (event) => {
        const inputCantidad = parseInt(event.target.value, 10);
       
        if (inputCantidad >= 1 && inputCantidad <= stockDisponible) {
            setCantidad(inputCantidad);
          } else if (inputCantidad > stockDisponible) {
            setCantidad(stockDisponible);
          } else {
            setCantidad(1); // En caso de que el valor sea negativo, establecer en cero o manejar según necesidades
          }
      };


  return (
   
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
    <form onSubmit={onSubmit}>
      <select className=" w-full bg-zinc-700 px-4 py-2 rounded-md my-2"{...register("referencia")} onChange={handleSelectChange}>
          <option value="">Selecciona un producto</option>
          {products.map((products) => (
            <option key={products.id} value={products._id}>
              {products.nombre}
            </option>
          ))}
        </select>
        <input
       
        value={ precioProductoSeleccionado}
         type="number"
         placeholder="precioUnitario"
         {...register("precioUnitario")}
         autoFocus
         className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
         
       />
      <input
       
        value={cantidad}
        type="number"
        placeholder={`Stock disponible: ${stockDisponible}`}
        {...register("cantidad")}
        autoFocus
        className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
         onChange={handleCantidadChange}
      />
       <input
        type="text"
        placeholder="cliente"
        {...register("cliente")}
        autoFocus
        className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
      />
      <br></br>
            <div className="flex justify-end">

        <button type="submit" className='bg-indigo-700 mt-4 rounded-lg px-4 py-1'>Save</button>
            </div>
    </form>
  </div>
  )
}

export default VentasFromPage;