
const initialState = {
    products: [],
    product: null,
    loading: true,
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_product_SUCCESS":
        return {
          ...state,
          product: action.payload,
          error: null,
        };
      case "GET_product_FAILURE":
        return {
          ...state,
          product: null,
          error: action.payload,
        };
      case "UPDATE_product_SUCCESS":
        // Lógica para actualizar una categoría existente en el estado
        return {
          ...state,
          product: action.payload,
          error: null,
        };
      case "UPDATE_product_FAILURE":
        return {
          ...state,
          error: action.payload,
        };
      case "GET_products_SUCCESS":
        return {
          ...state,
          products: action.payload,
          error: null,
        };
      case "GET_products_FAILURE":
        return {
          ...state,
          products: [],
          error: action.payload,
        };
      case "CREATE_product_SUCCESS":
        // Lógica para agregar una nueva categoría al estado
        return {
          ...state,
          product: action.payload,
          error: null,
        };
      case "CREATE_product_FAILURE":
        return {
          ...state,
          error: action.payload,
        };
      case "DELETE_product_SUCCESS":
        // Lógica para eliminar una categoría del estado
        return {
          ...state,
          products: state.products.filter((product) => product._id !== action.payload),
          error: null,
        };
      case "DELETE_product_FAILURE":
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  