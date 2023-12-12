const initialState = {
    isAuthenticated: false,
    user: null,
    errors: [],
    loading: true,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_AUTHENTICATION":
        return {
          ...state,
          isAuthenticated: action.payload,
        };
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
        };
        case "SET_LOADING":
            return {
                ...state,
                loading:action.payload,
            };
      case "LOGOUT":
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      case "SIGNUP_SUCCESS":
      case "LOGIN_SUCCESS":
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case "SIGNUP_FAILURE":
      case "LOGIN_FAILURE":
        return {
          ...state,
          isAuthenticated: false,
          errors: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  