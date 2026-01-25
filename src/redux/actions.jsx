import { loginRequest, registerRequest, verifyToken } from "../services/auth";
import Cookie from "js-cookie";

export const signupUser = (userData) => {
  return async (dispatch) => {
    try {
      const res = await registerRequest(userData);
      dispatch(signupSuccess(res.data));
    } catch (error) {
      dispatch(signupFailure(error.response.data));
    }
  };
};

export const signinUser = (userData) => {
  return async (dispatch) => {
    try {
      const res = await loginRequest(userData);
      dispatch(signinSuccess(res.data));
      dispatch(verifyTokenAction()); // Verificar token después 6de iniciar sesión
    } catch (error) {
      dispatch(signinFailure(error.response.data));
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    Cookie.remove("token");
    dispatch(setLogout());
  };
};


export const verifyTokenAction = () => {
  return async (dispatch) => {
    const cookies = Cookie.get();
    console.log(cookies);
    // if (!cookies.token) {
    //   dispatch(setAuthentication(false));
    //   dispatch(setLoading(false));
    //   return;
    // }
    try {
      const res = await verifyToken(cookies.token);
      console.log(res);
      if (!res.data){
        dispatch(setAuthentication(false));
      } 
      dispatch(setAuthentication(true));
      dispatch(setLoading(false));
       dispatch(setUser(res.data));
    } catch (error) {
      dispatch(setAuthentication(false));
      dispatch(setLoading(false));
    }
  
  };

};

export const setLoading = (isLoading) => ({
    type: 'SET_LOADING',
    payload: isLoading,
  });
export const setAuthentication = (isAuthenticated) => ({
  type: 'SET_AUTHENTICATION',
  payload: isAuthenticated,
});

export const setUser = (userData) => ({
  type: 'SET_USER',
  payload: userData,
});

export const setLogout = () => ({
  type: 'LOGOUT',
});

export const signupSuccess = (userData) => ({
  type: "SIGNUP_SUCCESS",
  payload: userData,
});

export const signupFailure = (error) => ({
  type: "SIGNUP_FAILURE",
  payload: error,
});

export const signinSuccess = (userData) => ({
  type: "LOGIN_SUCCESS",
  payload: userData,
});

export const signinFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
