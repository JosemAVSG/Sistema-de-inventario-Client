
import { useEffect } from "react";
import { getCategories} from '../redux/actionCategories'
import { useDispatch, useSelector } from "react-redux";
import CategoriesCard from "../components/CategoriesCard";
const CategoriaPage = () => {
    
 // Asegúrate de utilizar las funciones y el estado adecuados del contexto de categorías
        const categories = useSelector(state => state.category.categories);
        const dispatch = useDispatch();
        console.log(categories);
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <>
      {categories.length === 0 && (
        <div>
          <h1 className="font-bold text-xl">
            No categories yet, please add a new category </h1>
        </div>
      )}
      <div className="grid grid-cols-4 grid-rows-6 gap-10 ml-9 pt-10">
        {categories.map((categories) => (
          <CategoriesCard key={categories._id} categories={categories}>
          
          </CategoriesCard>
        ))}
      </div>
    </>
  )
};

export default CategoriaPage;
