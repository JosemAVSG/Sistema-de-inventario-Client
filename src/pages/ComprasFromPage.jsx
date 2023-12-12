import { useDispatch,useSelector} from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { addTransaccion } from "../redux/actionTransaccion";
import { getproducts } from "../redux/actionProducts";
import { useEffect,useState } from "react";
import { getProveedors } from "../redux/actionProveedor";


const ComprasFromPage = () => {
    const { register, handleSubmit, } = useForm();
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const params = useParams();

    const products = useSelector(state => state.product.products);
    const proveedores = useSelector((state) => state.proveedor.proveedors);
       const [precioProductoSeleccionado, setPrecioProductoSeleccionado] = useState();


     

      
      const onSubmit = handleSubmit((data) => {

        const datosVenta = {
            ...data, // Agregar otros datos del formulario
            tipo: 'Compra', // Establecer tipo como Venta
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
        dispatch(getProveedors());
        
      }, []);
      
      const handleSelectChange = (event) => {
        const selectedProductId = event.target.value;
        const selectedProduct = products.find((product) => product._id === selectedProductId);
        const precioParsed = parseFloat(selectedProduct.precio)
        console.log(precioParsed);
        setPrecioProductoSeleccionado(precioParsed);
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
       
        value={precioProductoSeleccionado}
         type="number"
         placeholder="precioUnitario"
         {...register("precioUnitario")}
         autoFocus
         className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
       />
      <input
        type="number"
        placeholder={`Cantidad`}
        {...register("cantidad")}
        autoFocus
        className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
    
      />
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

        <button type="submit" className='bg-indigo-700 mt-4 rounded-lg px-4 py-1'>Save</button>
            </div>
    </form>
  </div>
  )
}

export default ComprasFromPage;