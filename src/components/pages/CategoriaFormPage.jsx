import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addCategory, editCategory, getCategory } from '@/redux/actionCategories';
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/atoms/Button";

export const CategoriaFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const params = useParams();
  
  const category = useSelector((state) => state.category.category);

  const onSubmit = handleSubmit((data) => {
    if (params.id !== 'new') {
      dispatch(editCategory(params.id, data));
    } else {
      dispatch(addCategory(data));
    }
    setTimeout(() => {
      navigation("/categoria");
    }, 500);
  });

  useEffect(() => {
    const loadCategory = async () => {
      if (params.id !== 'new') {
        await dispatch(getCategory(params.id));
        setValue("name", category.name);
        setValue("descripcion", category.descripcion);
      }
    };
    loadCategory();
  }, []);

  const isEditing = params.id !== "new";

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex items-center gap-4">
          <Link
            to="/categoria"
            className="p-2 bg-secondary-700 rounded-lg hover:bg-secondary-600 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-gray-400" />
          </Link>
          <div>
            <h1 className="page-title">
              {isEditing ? "Editar Categoría" : "Nueva Categoría"}
            </h1>
            <p className="page-subtitle">
              {isEditing
                ? "Modifica los datos de la categoría"
                : "Crea una nueva categoría para tus productos"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl">
        <div className="card p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="label">Nombre de la Categoría</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faTags} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Nombre de la categoría"
                  {...register("name", { required: true })}
                  className="input-field pl-10"
                  autoFocus
                />
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="label">Descripción</label>
              <textarea
                placeholder="Describe la categoría..."
                {...register("descripcion")}
                rows="3"
                className="input-field resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-secondary-700">
              <Link
                to="/categoria"
                className="btn-secondary"
              >
                Cancelar
              </Link>
              <Button type="submit">
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                {isEditing ? "Guardar Cambios" : "Crear Categoría"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
