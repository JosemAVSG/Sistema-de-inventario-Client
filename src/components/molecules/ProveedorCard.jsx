/* eslint-disable react/prop-types */
import { removeProveedor } from "@/redux/actionProveedor";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export function ProveedorCard({ proveedors }) {
  const dispatch = useDispatch();
  console.log(proveedors);
  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-blue-500/20 rounded-xl">
          <FontAwesomeIcon icon={faUserTie} className="text-blue-400 text-xl" />
        </div>
      </div>
      <h1 className="text-xl font-bold text-white mb-2">{proveedors.nombre}</h1>
      <p className="text-sm text-gray-400 mb-4">{proveedors.direccion}</p>
      <div className="flex gap-3">
        <button
          className="flex-1 btn-danger inline-flex items-center justify-center gap-2"
          onClick={() => {
            dispatch(removeProveedor(proveedors._id));
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
          Eliminar
        </button>
        <Link
          to={`/provedor/${proveedors._id}`}
          className="flex-1 btn-primary inline-flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faEdit} />
          Editar
        </Link>
      </div>
    </div>
  );
}

export default ProveedorCard;