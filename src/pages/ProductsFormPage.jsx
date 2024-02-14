import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { editproduct, addproduct, getproduct } from "../redux/actionProducts";
import { getCategories } from "../redux/actionCategories";
import { getProveedors } from "../redux/actionProveedor";
import { useEffect } from "react";

const ProductsFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const params = useParams();

  const product = useSelector((state) => state.product.products); // Obtener la categoría del estado Redux
  const categorias = useSelector((state) => state.category.categories);
  const proveedores = useSelector((state) => state.proveedor.proveedors);
  
 

  const onSubmit = handleSubmit((data) => {
   
    if (typeof data.stock === 'string') {
      data.stock = parseInt(data.stock, 10); // Es buena práctica especificar la base para parseInt
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
    const loadCategorie = async () => {
      if (params.id !== "new") {
        console.log(params.id);
        await dispatch(getproduct(params.id));
        console.log(product);
        setValue("name", product.nombre);
      }
    };
    loadCategorie();
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProveedors());
  }, []);

  return (
    <div className="bg-zinc-800 max-w-md w-full justify-center p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          {...register("nombre")}
          autoFocus
          className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
        />
        <input
          type="text"
          placeholder="Descripcion"
          {...register("descripcion")}
          autoFocus
          className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
        
        />

        <input
          type="number"
          placeholder="Precio"
          {...register("precio")}
          autoFocus
          className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
  
        />
        <input
          type="number"
          placeholder="Stock"
          {...register("stock")}
          autoFocus
          className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
        />
        <select className=" w-full bg-zinc-700 px-4 py-2 rounded-md my-2"{...register("categoria")}>
          <option value="" >Selecciona una categoría</option>
          {categorias.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <select className=" w-full bg-zinc-700 px-4 py-2 rounded-md my-2"{...register("proveedor")}>
          <option value="">Selecciona un proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor._id} value={proveedor._id}>
              {proveedor.nombre}
            </option>
          ))}
        </select>
            <br></br>
            <div className="flex justify-end">

        <button type="submit" className='bg-indigo-700 mt-4 rounded-lg px-4 py-1'>Save</button>
            </div>
      </form>
    </div>
  );
};

export default ProductsFormPage;
