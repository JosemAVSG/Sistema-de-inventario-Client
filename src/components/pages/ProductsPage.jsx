import { useEffect } from "react";
import { getproducts } from "@/redux/actionProducts";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "@/components/organisms/DataTable";

const ProductsPage = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproducts());
  }, []);

 
  return (
    <>
      {products.length === 0 && (
        <div>
          <h1 className="font-bold text-xl">
            No products yet, please add a new product
          </h1>
        </div>
      )}
      {products.length > 0 && (
        
        <div className="flex w-full ">
          <DataTable data={products}></DataTable>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
