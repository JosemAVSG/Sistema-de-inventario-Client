/* eslint-disable react/prop-types */
import { removeCategory } from "@/redux/actionCategories";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export function CategoriesCard({ categories }) {
  const dispatch = useDispatch();
  console.log(categories);
  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary-500/20 rounded-xl">
          <FontAwesomeIcon icon={faTags} className="text-primary-400 text-xl" />
        </div>
      </div>
      <h1 className="text-xl font-bold text-white mb-4">{categories.name}</h1>
      <div className="flex gap-3">
        <button
          className="flex-1 btn-danger inline-flex items-center justify-center gap-2"
          onClick={() => {
            dispatch(removeCategory(categories._id));
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
          Eliminar
        </button>
        <Link
          to={`/categoria/${categories._id}`}
          className="flex-1 btn-primary inline-flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faEdit} />
          Editar
        </Link>
      </div>
    </div>
  );
}

export default CategoriesCard;