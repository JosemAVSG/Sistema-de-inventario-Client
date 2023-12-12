
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getsells } from "../redux/actionTransaccion";

const VentasPage = () => {
    const ventas = useSelector((state) => state.transacciones.ventas);
    const dispatch = useDispatch();
    console.log(ventas);
    useEffect(() => {
      dispatch(getsells());
    }, []);
  return (
    <div>VentasPage</div>
  )
}

export default VentasPage