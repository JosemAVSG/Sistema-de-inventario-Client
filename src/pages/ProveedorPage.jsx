import { useEffect } from "react";
import { getProveedors } from "../redux/actionProveedor";
import { useDispatch, useSelector } from "react-redux";
import ProveedorCard from "../components/ProveedorCard";

const ProveedorPage = () => {
  const proveedors = useSelector((state) => state.proveedor.proveedors);
  const dispatch = useDispatch();
  console.log(proveedors);
  useEffect(() => {
    dispatch(getProveedors());
  }, []);

  return (
    <>
      {proveedors.length === 0 && (
        <div>
          <h1 className="font-bold text-xl">
            No categories yet, please add a new category{" "}
          </h1>
        </div>
      )}
      <div className="grid grid-cols-3 grid-rows-6 gap-10 ml-9 pt-10">
        {proveedors.map((proveedors) => (
          <ProveedorCard
            key={proveedors._id}
            proveedors={proveedors}
          ></ProveedorCard>
        ))}
      </div>
    </>
  );
};

export default ProveedorPage;
