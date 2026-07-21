import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTags } from "@fortawesome/free-solid-svg-icons";
import { useCategories } from "@/hooks/useCategories";
import { Skeleton } from "@/components/atoms/Skeleton";
import { EmptyState } from "@/components/molecules/EmptyState";

export const CategoriaPage = () => {
  const { data: categories = [], isLoading, error } = useCategories();

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

      {/* Loading */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="card p-4">
              <Skeleton variant="rectangular" className="h-40" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="card p-8 text-center text-red-400">
          <p>Error al cargar las categorías. Intenta de nuevo más tarde.</p>
          <p className="text-sm text-gray-400 mt-2">{error.message}</p>
        </div>
      )}

      {/* Categories Grid */}
      {!isLoading && !error && categories.length === 0 ? (
        <EmptyState
          icon={<FontAwesomeIcon icon={faTags} className="text-4xl" />}
          title="No hay categorías aún"
          description="Crea tu primera categoría para organizar tus productos"
          action={{ label: "Crear Categoría", to: "/add-categoria" }}
        />
      ) : (
        !isLoading &&
        !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category._id} className="card p-4 card-hover group">
                <div className="flex items-start justify-between">
                  <div className="p-3 flex items-center gap-2 bg-primary-500/20 rounded-xl group-hover:bg-primary-500/30 transition-colors">
                    <FontAwesomeIcon
                      icon={faTags}
                      className="text-primary-400"
                    />
                    <h3 className="text-lg font-semibold text-white">
                      {category.name || category.nombre}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/categoria/${category._id}`}
                      className="p-2 text-gray-400 hover:text-white hover:bg-secondary-700 rounded-lg transition-colors"
                    >
                      <FontAwesomeIcon icon={faTags} className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {category.descripcion || "Sin descripción"}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-secondary-700">
                  <span className="text-xs text-gray-500">
                    ID: {category._id?.slice(0, 8)}...
                  </span>
                  <Link
                    to={`/categoria/${category._id}`}
                    className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    Editar
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
