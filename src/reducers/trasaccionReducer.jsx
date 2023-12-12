const initialState = {
  compras: [],
  ventas: [],
  transaccion:null,
  loading: true,
  error: null,
};

const trasaccionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_VENTAS_SUCCESS":
      return {
        ...state,
        ventas: action.payload,
        error: null,
      };
    case "GET_VENTAS_FAILURE":
      return {
        ...state,
        ventas: [],
        error: action.payload,
      };
    case "GET_COMPRAS_SUCCESS":
      return {
        ...state,
        compras: action.payload,
        error: null,
      };
    case "GET_COMPRAS_FAILURE":
      return {
        ...state,
        compras: [],
        error: action.payload,
      };
    case "CREATE_TRASACCION_SUCCESS":
      return {
        ...state,
        transaccion: action.payload,
        error: null,
      };
    case "CREATE_TRASACCION_FAILURE":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default trasaccionReducer;
