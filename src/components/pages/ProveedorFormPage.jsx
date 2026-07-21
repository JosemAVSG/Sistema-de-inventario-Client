import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faMapMarkerAlt, faPhone, faEnvelope, faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/atoms/Button";
import { Skeleton } from "@/components/atoms/Skeleton";
import {
  useProvider,
  useCreateProvider,
  useUpdateProvider,
} from "@/hooks/useProviders";

export const ProveedorFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const navigation = useNavigate();
  const params = useParams();
  const isEditing = params.id !== "new";

  const { data: proveedor, isLoading } = useProvider(isEditing ? params.id : null);
  const createProvider = useCreateProvider();
  const updateProvider = useUpdateProvider();

  const onSubmit = handleSubmit(async (data) => {
    if (isEditing) {
      await updateProvider.mutateAsync({ id: params.id, data });
    } else {
      await createProvider.mutateAsync(data);
    }
    navigation("/proveedor");
  });

  useEffect(() => {
    if (proveedor && isEditing) {
      setValue("nombre", proveedor.nombre || "");
      setValue("empresa", proveedor.empresa || "");
      setValue("direccion", proveedor.direccion || "");
      setValue("telefono", proveedor.telefono || "");
      setValue("email", proveedor.email || "");
    }
  }, [proveedor, isEditing, setValue]);

  if (isLoading) {
    return (
      <div className="animate-fade-in flex flex-col gap-4">
        <div className="page-header">
          <Skeleton variant="text" className="w-48" />
          <Skeleton variant="text" className="w-64" />
        </div>
        <div className="max-w-2xl">
          <Skeleton variant="rectangular" className="h-[600px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in flex flex-col gap-4">
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
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-gray-400"
                  />
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
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-gray-400"
                    />
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
              <Link to="/proveedor" className="btn-secondary">
                Cancelar
              </Link>
              <Button type="submit">
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                {isEditing ? "Guardar Cambios" : "Crear Proveedor"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
