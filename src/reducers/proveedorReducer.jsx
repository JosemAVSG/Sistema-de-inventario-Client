const initialState = {
  proveedors: [],
  proveedor: null,
  loading: true,
  error: null,
};

const ProveedorReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case "GET_PROVEEDOR_SUCCESS":
      return {
        ...state,
        Proveedor: action.payload,
        error: null,
      };
    case "GET_PROVEEDOR_FAILURE":
      return {
        ...state,
        Proveedor: null,
        error: action.payload,
      };
    case "UPDATE_PROVEEDOR_SUCCESS":
      // Lógica para actualizar una categoría existente en el estado
      return {
        ...state,
        Proveedor: action.payload,
        error: null,
      };
    case "UPDATE_PROVEEDOR_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "GET_PROVEEDORS_SUCCESS":
      return {
        ...state,
        proveedors: action.payload,
        error: null,
      };
    case "GET_PROVEEDORS_FAILURE":
      return {
        ...state,
        proveedors: [],
        error: action.payload,
      };
    case "CREATE_PROVEEDOR_SUCCESS":
      return {
        ...state,
        proveedor: action.payload,
        error: null,
      };
    case "CREATE_PROVEEDOR_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_PROVEEDOR_SUCCESS":
      // Lógica para eliminar una categoría del estado
      return {
        ...state,
        proveedors: state.proveedors.filter(
          (proveedor) => proveedor._id === action.payload
        ),
        error: null,
      };
    case "DELETE_PROVEEDOR_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ProveedorReducer;
