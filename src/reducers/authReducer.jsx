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
      // case "SET_USER":
      //   return {
      //     ...state,
      //     user: action.payload,
      //   };
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
         return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          user: action.payload,
        };
      case "SIGNUP_FAILURE":
        return {
          ...state,

          errors: action.payload,
        }
      case "LOGIN_FAILURE":
        return {
          ...state,

          errors: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  