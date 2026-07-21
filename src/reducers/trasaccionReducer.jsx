const initialState = {
  cierreDiarioRealizado: false,
  VentasFiltradas: {},
  ComprasFiltradas: {},
  cierresDiarios: []
};




const trasaccionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CERRAR_DIA':
      return {
        ...state,
        cierreDiarioRealizado: true,
        cierresDiarios: [
          ...state.cierresDiarios,
          {
            fecha: action.payload.fecha,
            ventas: action.payload.ventas,
            compras: action.payload.compras,
          },
        ],
      };
    case 'GUARDAR_VENTAS_FILTRADAS':
      return {
        ...state,
        VentasFiltradas: action.payload,
      };
    case 'GUARDAR_COMPRAS_FILTRADAS':
      return {
        ...state,
        ComprasFiltradas: action.payload,
      };
    default:
      return state;
  }
};

export default trasaccionReducer;
