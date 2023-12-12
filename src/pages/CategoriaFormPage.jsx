import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { addCategory, editCategory, getCategory} from '../redux/actionCategories'
import { useEffect } from "react";

const CategoriaFormPage = () => {
    const { register, handleSubmit, setValue} = useForm();
      const dispatch = useDispatch();
      const navigation = useNavigate();
      const params = useParams();
    
     const category = useSelector((state) => state.category.category); // Obtener la categoría del estado Redux
        console.log(category);

      const onSubmit = handleSubmit((data) => {
        console.log(params.id);
        console.log(data);
        if (params.id !== 'new') {
            dispatch(editCategory(params.id, data))}
            else{
                dispatch(addCategory(data));
            }
    
        setTimeout(() => {
          navigation("/categoria");
        }, 500);
      });
      useEffect(() => {
        const loadCategorie = async () => {
          if (params.id !== 'new') {
            console.log(params.id);
            await dispatch(getCategory(params.id));
            console.log(category);
            setValue("name", category.name);
          }
        };
        loadCategorie();
      }, []);
      return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              autoFocus
              className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      );
    };

export default CategoriaFormPage