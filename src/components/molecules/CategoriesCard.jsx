/* eslint-disable react/prop-types */
import { removeCategory } from "@/redux/actionCategories";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export function CategoriesCard({ categories }) {
    const dispatch = useDispatch();
    console.log(categories);
  return (
    <div>
        <div className="bg-zinc-800 max-w-md  p-10 rounded-md">
      <h1 className="text-2xl font-bold my-2">{categories.name}</h1>
      <div className="flex justify-between ">
        <button className=" my-5 bg-red-600 text-white rounded-sm py-2 px-2" onClick={()=>{
           dispatch( removeCategory(categories._id));
        }}>delete</button>
        
        <Link to={`/categoria/${categories._id}`} className=" my-5 ml-5 bg-indigo-700 rounded-md py-2 px-3">edit</Link>
       
      </div>

      
    </div>
    </div>
  
  );
}

export default CategoriesCard;