// categoryReducer.js

const initialState = {
    categories:[],
    category: null,
    loading: true,
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_CATEGORY_SUCCESS":
        return {
          ...state,
          category: action.payload,
          error: null,
        };
      case "GET_CATEGORY_FAILURE":
        return {
          ...state,
          category: null,
          error: action.payload,
        };
      case "UPDATE_CATEGORY_SUCCESS":
        // Lógica para actualizar una categoría existente en el estado
        return {
          ...state,
          category: action.payload,
          error: null,
        };
      case "UPDATE_CATEGORY_FAILURE":
        return {
          ...state,
          error: action.payload,
        };
      case "GET_CATEGORIES_SUCCESS":
        return {
          ...state,
          categories: action.payload,
          error: null,
        };
      case "GET_CATEGORIES_FAILURE":
        return {
          ...state,
          categories: [],
          error: action.payload,
        };
      case "CREATE_CATEGORY_SUCCESS":
        // Lógica para agregar una nueva categoría al estado
        return {
          ...state,
          category: action.payload,
          error: null,
        };
      case "CREATE_CATEGORY_FAILURE":
        return {
          ...state,
          error: action.payload,
        };
      case "DELETE_CATEGORY_SUCCESS":
        // Lógica para eliminar una categoría del estado
        return {
          ...state,
          categories: state.categories.filter((category) => category._id !== action.payload),
          error: null,
        };
      case "DELETE_CATEGORY_FAILURE":
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  