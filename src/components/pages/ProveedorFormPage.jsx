import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  addProveedor,
  getProveedor,
  editProveedor,
} from "@/redux/actionProveedor";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faMapMarkerAlt, faPhone, faEnvelope, faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ProveedorFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const params = useParams();

  const proveedor = useSelector((state) => state.proveedor.proveedor);

  const onSubmit = handleSubmit((data) => {
    if (params.id !== "new") {
      dispatch(editProveedor(params.id, data));
    } else {
      dispatch(addProveedor(data));
    }
    setTimeout(() => {
      navigation("/proveedor");
    }, 500);
  });

  useEffect(() => {
    const loadProveedor = async () => {
      if (params.id !== "new") {
        await dispatch(getProveedor(params.id));
        setValue("nombre", proveedor.nombre);
        setValue("empresa", proveedor.empresa);
        setValue("direccion", proveedor.direccion);
        setValue("telefono", proveedor.telefono);
        setValue("email", proveedor.email);
      }
    };
    loadProveedor();
  }, []);

  const isEditing = params.id !== "new";

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex items-center gap-4">
          <Link
            to="/proveedor"
            className="p-2 bg-secondary-700 rounded-lg hover:bg-secondary-600 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-gray-400" />
          </Link>
          <div>
            <h1 className="page-title">
              {isEditing ? "Editar Proveedor" : "Nuevo Proveedor"}
            </h1>
            <p className="page-subtitle">
              {isEditing
                ? "Modifica los datos del proveedor"
                : "Agrega un nuevo proveedor"}
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
              <label className="label">Nombre del Contacto</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faUserTie} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Nombre del contacto"
                  {...register("nombre", { required: true })}
                  className="input-field pl-10"
                  autoFocus
                />
              </div>
            </div>

            {/* Empresa */}
            <div>
              <label className="label">Empresa</label>
              <input
                type="text"
                placeholder="Nombre de la empresa"
                {...register("empresa")}
                className="input-field"
              />
            </div>

            {/* Dirección */}
            <div>
              <label className="label">Dirección</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Dirección"
                  {...register("direccion")}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Teléfono y Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Teléfono</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    {...register("telefono")}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="label">Correo Electrónico</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    {...register("email")}
                    className="input-field pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-secondary-700">
              <Link
                to="/proveedor"
                className="btn-secondary"
              >
                Cancelar
              </Link>
              <button type="submit" className="btn-primary">
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                {isEditing ? "Guardar Cambios" : "Crear Proveedor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProveedorFormPage;
