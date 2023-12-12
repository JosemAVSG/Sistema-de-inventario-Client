// ProveedorActions.js

import {
  getProveedorRequest,
  getProveedorsRequest,
  updateProveedorRequest,
  deletegetProveedorRequest,
  createProveedorRequest,
} from "../api/Proveedor";

export const getProveedorSuccess = (Proveedor) => ({
  type: "GET_PROVEEDOR_SUCCESS",
  payload: Proveedor,
});

export const getProveedorFailure = (error) => ({
  type: "GET_PROVEEDOR_FAILURE",
  payload: error,
});

export const getProveedor = (id) => {
  return async (dispatch) => {
    try {
      const res = await getProveedorRequest(id);
      console.log(res);
      dispatch(getProveedorSuccess(res.data));
    } catch (error) {
      dispatch(getProveedorFailure(error));
    }
  };
};

// Acciones para actualizar categoría
export const updateProveedorSuccess = (Proveedor) => ({
  type: "UPDATE_PROVEEDOR_SUCCESS",
  payload: Proveedor,
});

export const updateProveedorFailure = (error) => ({
  type: "UPDATE_PROVEEDOR_FAILURE",
  payload: error,
});

export const editProveedor = (id, updatedProveedor) => {
  return async (dispatch) => {
    try {
      const res = await updateProveedorRequest(id, updatedProveedor);
      console.log(res);
      dispatch(updateProveedorSuccess(res.data));
    } catch (error) {
      dispatch(updateProveedorFailure(error));
    }
  };
};

// Acciones para obtener categorías
export const getProveedorsSuccess = (Proveedors) => ({
  type: "GET_PROVEEDORS_SUCCESS",
  payload: Proveedors,
});

export const getProveedorsFailure = (error) => ({
  type: "GET_PROVEEDORS_FAILURE",
  payload: error,
});

export const getProveedors = () => {
  return async (dispatch) => {
    try {
      const res = await getProveedorsRequest();
      console.log(res.data);
      dispatch(getProveedorsSuccess(res.data));
    } catch (error) {
      dispatch(getProveedorsFailure(error));
    }
  };
};

// Acciones para crear categoría
export const createProveedorSuccess = (proveedor) => ({
  type: "CREATE_PROVEEDOR_SUCCESS",
  payload: proveedor,
});

export const createProveedorFailure = (error) => ({
  type: "CREATE_PROVEEDOR_FAILURE",
  payload: error,
});

export const addProveedor = (Proveedor) => {
  return async (dispatch) => {
    try {
      console.log(Proveedor);
      const res = await createProveedorRequest(Proveedor);
      console.log(res.data);
      dispatch(createProveedorSuccess(res.data));
    } catch (error) {
      dispatch(createProveedorFailure(error));
    }
  };
};

// Acciones para eliminar categoría
export const deleteProveedorSuccess = (id) => ({
  type: "DELETE_PROVEEDOR_SUCCESS",
  payload: id,
});

export const deleteProveedorFailure = (error) => ({
  type: "DELETE_PROVEEDOR_FAILURE",
  payload: error,
});

export const removeProveedor = (id) => {
  return async (dispatch) => {
    try {
      const res = await deletegetProveedorRequest(id);
      console.log(res);
      dispatch(deleteProveedorSuccess(id));
    } catch (error) {
      dispatch(deleteProveedorFailure(error));
    }
  };
};

// Otras acciones como actualizar categoría, obtener categoría individual, etc.
