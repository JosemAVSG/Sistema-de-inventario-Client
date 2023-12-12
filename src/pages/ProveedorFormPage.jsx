import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { addProveedor,getProveedor,editProveedor} from '../redux/actionProveedor';
import { useEffect } from "react";

const ProveedorFormPage = () => {
    const { register, handleSubmit, setValue} = useForm();
      const dispatch = useDispatch();
      const navigation = useNavigate();
      const params = useParams();
    
     const Proveedor = useSelector((state) => state.proveedor.proveedor); // Obtener la categoría del estado Redux
        console.log(Proveedor);
      const onSubmit = handleSubmit((data) => {
        console.log(params.id);
        
        console.log(data);
        if (params.id !=='new') {
            dispatch(editProveedor(params.id, data))}
            else{
                dispatch(addProveedor(data));
            }
    
        setTimeout(() => {
          navigation("/proveedor");
        }, 500);
      });
      useEffect(() => {
        const loadCategorie = async () => {
          if (params.id !=='new') {
            console.log(params.id);
            await dispatch(getProveedor(params.id));
            console.log(Proveedor);
            setValue("name", Proveedor.nombre);
            setValue("Direccion",Proveedor.direccion)
          }
        };
        loadCategorie();
      }, []);
      return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Name"
              {...register("nombre")}
              autoFocus
              className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
            />
             <input
              type="text"
              placeholder="Direccion"
              {...register("direccion")}
              autoFocus
              className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      );
    };

export default ProveedorFormPage;