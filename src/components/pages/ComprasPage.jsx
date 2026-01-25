import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getbuys } from "@/redux/actionTransaccion";
import DataTableSell from "@/components/organisms/DataTableSell";
const ComprasPage = () => {
  const compras = useSelector((state) => state.transacciones.compras);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getbuys());
  }, [dispatch]);
  return (
    <>
      {compras.length === 0 && (
        <div>
          <h1 className="font-bold text-xl">No hay Ninguna Compras</h1>
        </div>
      )}
      {compras.length > 0 && (
        <div className="flex w-full ">
          <DataTableSell data={compras}  ></DataTableSell>
        </div>
      )}
    </>
  );
}

export default ComprasPage