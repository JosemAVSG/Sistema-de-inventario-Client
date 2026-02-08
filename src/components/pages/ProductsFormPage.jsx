import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from "react-router-dom";
import { editproduct, addproduct, getproduct } from "@/redux/actionProducts";
import { getCategories } from "@/redux/actionCategories";
import { getProveedors } from "@/redux/actionProveedor";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faDollarSign, faTags, faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ProductsFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const params = useParams();

  const product = useSelector((state) => state.product.products);
  const categorias = useSelector((state) => state.category.categories);
  const proveedores = useSelector((state) => state.proveedor.proveedors);

  const onSubmit = handleSubmit((data) => {
    if (typeof data.stock === 'string') {
      data.stock = parseInt(data.stock, 10);
    }
    if (typeof data.precio === 'string') {
      data.precio = parseFloat(data.precio);
    }
    
    if (params.id !== "new") {
      dispatch(editproduct(params.id, data));
    } else {
      dispatch(addproduct(data));
    }
    setTimeout(() => {
      navigation("/products");
    }, 500);
  });

  useEffect(() => {
    const loadProduct = async () => {
      if (params.id !== "new") {
        await dispatch(getproduct(params.id));
        setValue("nombre", product.nombre);
        setValue("descripcion", product.descripcion);
        setValue("precio", product.precio);
        setValue("stock", product.stock);
        setValue("categoria", product.categoria?._id || product.categoria);
        setValue("proveedor", product.proveedor?._id || product.proveedor);
      }
    };
    loadProduct();
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProveedors());
  }, []);

  const isEditing = params.id !== "new";

  return (
    <div className="animate-fade-in">
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
      <div className="max-w-2xl">
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
                  {...register("nombre", { required: true })}
                  className="input-field pl-10"
                  autoFocus
                />
              </div>
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
                    <FontAwesomeIcon icon={faDollarSign} className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...register("precio", { required: true })}
                    className="input-field pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="label">Stock</label>
                <input
                  type="number"
                  placeholder="0"
                  {...register("stock", { required: true })}
                  className="input-field"
                />
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

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-secondary-700">
              <Link
                to="/products"
                className="btn-secondary"
              >
                Cancelar
              </Link>
              <button type="submit" className="btn-primary">
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                {isEditing ? "Guardar Cambios" : "Crear Producto"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsFormPage;
