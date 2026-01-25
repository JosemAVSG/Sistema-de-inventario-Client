import {
  getCompras,
  getVentas,
  createTransaccionRequest,
} from "../services/transaccion";

export const cerrarDia = (fecha, ventas, compras) => ({
  type: 'CERRAR_DIA',
  payload: {
    fecha,
    ventas,
    compras,
  },
});
export const getVentasSuccess = (ventas) => ({
    type: "GET_VENTAS_SUCCESS",
    payload: ventas,
  });
  export const getVentasFailure = (error) => ({
    type: "GET_PROVEEDORS_FAILURE",
    payload: error,
  });
  export const getsells = () => {
    return async (dispatch) => {
      try {
        const res = await getVentas();
       
        dispatch(getVentasSuccess(res.data));
      } catch (error) {
        dispatch(getVentasFailure(error));
      }
    };
  };

  export const getComprasSuccess = (compras) => ({
    type: "GET_COMPRAS_SUCCESS",
    payload: compras,
  });
  
  export const getComprasFailure = (error) => ({
    type: "GET_PROVEEDORS_FAILURE",
    payload: error,
  });
  
  export const getbuys = () => {
    return async (dispatch) => {
      try {
        const res = await getCompras();
       
        dispatch(getComprasSuccess(res.data));
      } catch (error) {
        dispatch(getComprasFailure(error));
      }
    };
  };

  export const createTransaccionSuccess = (proveedor) => ({
    type: "CREATE_TRANSACCION_SUCCESS",
    payload: proveedor,
  });
  
  export const createTransaccionFailure = (error) => ({
    type: "CREATE_TRANSSACION_FAILURE",
    payload: error,
  });
  
  export const addTransaccion = (tipo) => {
    return async (dispatch) => {

      try {
        console.log(tipo);
        const res = await createTransaccionRequest(tipo);
        console.log(res.data);
        dispatch(createTransaccionSuccess(res.data));
      } catch (error) {
        dispatch(createTransaccionFailure(error));
        console.log(error);
      }
    };
  };
  