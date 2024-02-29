import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getsells } from "../redux/actionTransaccion";
import DataTableSell from "../components/DataTableSell";

const VentasPage = () => {
  const ventas = useSelector((state) => state.transacciones.ventas);
  const dispatch = useDispatch();
  console.log(ventas);
  useEffect(() => {
    dispatch(getsells());
  }, [dispatch]);
  return (
    <>
      {ventas.length === 0 && (
        <div>
          <h1 className="font-bold text-xl">NO hay Ninguna Ventas</h1>
        </div>
      )}
      {ventas.length > 0 && (
        <div className="flex w-full ">
          <DataTableSell data={ventas}></DataTableSell>
        </div>
      )}
    </>
  );
};

export default VentasPage;
