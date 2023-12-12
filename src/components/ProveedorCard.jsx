/* eslint-disable react/prop-types */
import { removeProveedor } from "../redux/actionProveedor";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


export function ProveedorCard({ proveedors}) {
    const dispatch = useDispatch();
    console.log(proveedors);
  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      <h1 className="text-2xl font-bold my-2">{proveedors.nombre}</h1>
      <h1 className="text-2xl font-bold my-2">{proveedors.direccion}</h1>
      <div className="flex justify-between">
        <button className=" my-5 bg-red-700 text-white rounded-sm py-2 px-3" onClick={()=>{
           dispatch(removeProveedor(proveedors._id));
        }}>delete</button>
        <Link to={`/provedor/${proveedors._id}`} className=" my-5 bg-indigo-700 rounded-md py-2 px-3">edit</Link>
       
      </div>

      
    </div>
  );
}

export default ProveedorCard;