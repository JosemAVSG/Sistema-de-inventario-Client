import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/redux/actionCategories";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTags } from "@fortawesome/free-solid-svg-icons";

export const CategoriaPage = () => {
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="animate-fade-in flex flex-col gap-4">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Categorías</h1>
            <p className="page-subtitle">
              Organiza tus productos por categorías
            </p>
          </div>
          <Link
            to="/add-categoria"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Nueva Categoría
          </Link>
        </div>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="p-4 bg-secondary-700/50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <FontAwesomeIcon icon={faTags} className="text-gray-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No hay categorías aún
          </h3>
          <p className="text-gray-400 mb-6">
            Crea tu primera categoría para organizar tus productos
          </p>
          <Link
            to="/add-categoria"
            className="btn-primary inline-flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Crear Categoría
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="card p-4 card-hover group">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-primary-500/20 rounded-xl group-hover:bg-primary-500/30 transition-colors">
                  <FontAwesomeIcon icon={faTags} className="text-primary-400" />
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/categoria/${category.id}`}
                    className="p-2 text-gray-400 hover:text-white hover:bg-secondary-700 rounded-lg transition-colors"
                  >
                    <FontAwesomeIcon icon={faTags} className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mt-4">
                {category.nombre}
              </h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {category.descripcion || "Sin descripción"}
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-secondary-700">
                <span className="text-xs text-gray-500">
                  ID: {category.id?.slice(0, 8)}...
                </span>
                <Link
                  to={`/categoria/${category.id}`}
                  className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
