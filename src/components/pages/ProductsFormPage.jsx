import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useCreateProduct,
  useUpdateProduct,
  useProduct,
} from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useProviders } from "@/hooks/useProviders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faDollarSign,
  faTags,
  faSave,
  faArrowLeft,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/atoms/Button";
import { Skeleton } from "@/components/atoms/Skeleton";
import BarcodeScanner from "@/components/molecules/BarcodeScanner";

export const ProductsFormPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const navigation = useNavigate();
  const params = useParams();
  const isEditing = params.id !== "new";

  const { data: product, isLoading: isLoadingProduct } = useProduct(
    isEditing ? params.id : null
  );
  const { data: categorias = [], isLoading: isLoadingCategories } = useCategories();
  const { data: proveedores = [], isLoading: isLoadingProviders } = useProviders();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const [scannerOpen, setScannerOpen] = useState(false);

  const stockValue = watch("stock");
  const stockNumber = typeof stockValue === "string" ? parseInt(stockValue, 10) : Number(stockValue);
  const isLowStock = !Number.isNaN(stockNumber) && stockNumber < 2;
  const isInStock = !Number.isNaN(stockNumber) && stockNumber >= 2;

  useEffect(() => {
    if (product && isEditing) {
      setValue("nombre", product.nombre);
      setValue("descripcion", product.descripcion || "");
      setValue("precio", product.precio);
      setValue("stock", product.stock);
      setValue("categoria", product.categoria?._id || product.categoria || "");
      setValue("proveedor", product.proveedor?._id || product.proveedor || "");
      setValue("codigoBarras", product.codigoBarras || "");
    }
  }, [product, isEditing, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (typeof data.stock === "string") {
      data.stock = parseInt(data.stock, 10);
    }
    if (typeof data.precio === "string") {
      data.precio = parseFloat(data.precio);
    }

    if (!data.codigoBarras || data.codigoBarras.trim() === "") {
      delete data.codigoBarras;
    }

    if (isEditing) {
      await updateProduct.mutateAsync({ id: params.id, data });
    } else {
      await createProduct.mutateAsync(data);
    }
    navigation("/products");
  });

  const handleScan = (code) => {
    setValue("codigoBarras", code);
    setScannerOpen(false);
  };

  const isLoading = isLoadingProduct || isLoadingCategories || isLoadingProviders;

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
            to="/products"
            className="p-2 bg-secondary-700 rounded-lg hover:bg-secondary-600 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-gray-400" />
          </Link>
          <div>
            <h1 className="page-title">
              {isEditing ? "Editar Producto" : "Nuevo Producto"}
            </h1>
            <p className="page-subtitle">
              {isEditing
                ? "Modifica los datos del producto"
                : "Agrega un nuevo producto al inventario"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl gap-4">
        <div className="card p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="label">Nombre del Producto</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faBox} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  {...register("nombre", { required: "El nombre es obligatorio" })}
                  className="input-field pl-10"
                  autoFocus
                />
              </div>
              {errors.nombre && (
                <p className="mt-1 text-sm text-red-400">{errors.nombre.message}</p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="label">Descripción</label>
              <textarea
                placeholder="Describe el producto..."
                {...register("descripcion")}
                rows="3"
                className="input-field resize-none"
              />
            </div>

            {/* Precio y Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Precio</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="text-gray-400"
                    />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("precio", { required: "El precio es obligatorio" })}
                    className="input-field pl-10"
                  />
                </div>
                {errors.precio && (
                  <p className="mt-1 text-sm text-red-400">{errors.precio.message}</p>
                )}
              </div>
              <div>
                <label className="label">Stock</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="0"
                    {...register("stock", { required: "El stock es obligatorio" })}
                    className="input-field"
                  />
                  {isLowStock && (
                    <span className="badge badge-danger">Stock Bajo</span>
                  )}
                  {isInStock && (
                    <span className="badge badge-success">En Stock</span>
                  )}
                </div>
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-400">{errors.stock.message}</p>
                )}
              </div>
            </div>

            {/* Categoría */}
            <div>
              <label className="label">Categoría</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faTags} className="text-gray-400" />
                </div>
                <select
                  {...register("categoria")}
                  className="input-field pl-10 appearance-none"
                >
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name || category.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Proveedor */}
            <div>
              <label className="label">Proveedor</label>
              <select
                {...register("proveedor")}
                className="input-field appearance-none"
              >
                <option value="">Selecciona un proveedor</option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor._id} value={proveedor._id}>
                    {proveedor.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Código de barras */}
            <div>
              <label className="label">Código de barras</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Código de barras"
                  {...register("codigoBarras")}
                  className="input-field flex-1"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setScannerOpen(true)}
                  aria-label="Abrir escáner de códigos"
                  className="!px-3"
                >
                  <FontAwesomeIcon icon={faCamera} />
                </Button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 !pt-4 border-t border-secondary-700">
              <Link to="/products" className="btn-secondary">
                Cancelar
              </Link>
              <Button type="submit">
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                {isEditing ? "Guardar Cambios" : "Crear Producto"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <BarcodeScanner
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onDetect={handleScan}
      />
    </div>
  );
};
