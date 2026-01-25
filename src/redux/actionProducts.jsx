import {getproductRequest,getproductsRequest,updateproductsRequest,deletegetproductsRequest,createproductsRequest} from '../services/products'
export const getproductSuccess = (product) => ({
    type: "GET_product_SUCCESS",
    payload: product,
  });
  
  export const getproductFailure = (error) => ({
    type: "GET_product_FAILURE",
    payload: error,
  });
  
  export const getproduct = (id) => {
    return async (dispatch) => {
      try {
        const res = await getproductRequest(id);
        console.log(res);
        dispatch(getproductSuccess(res.data));
      } catch (error) {
        dispatch(getproductFailure(error));
      }
    };
  };
  
  // Acciones para actualizar categoría
  export const updateproductSuccess = (product) => ({
    type: "UPDATE_product_SUCCESS",
    payload: product,
  });
  
  export const updateproductFailure = (error) => ({
    type: "UPDATE_product_FAILURE",
    payload: error,
  });
  
  export const editproduct = (id, updatedproduct) => {
    return async (dispatch) => {
      try {
        const res = await updateproductsRequest(id, updatedproduct);
        console.log(res);
        dispatch(updateproductSuccess(res.data));
      } catch (error) {
        dispatch(updateproductFailure(error));
      }
    };
  };


// Acciones para obtener categorías
export const getproductsSuccess = (products) => ({
  type: "GET_products_SUCCESS",
  payload: products,
});

export const getproductsFailure = (error) => ({
  type: "GET_products_FAILURE",
  payload: error,
});

export const getproducts = () => {
  return async (dispatch) => {
    try {
      const res = await getproductsRequest();
      console.log(res);
      dispatch(getproductsSuccess(res.data));
    } catch (error) {
      dispatch(getproductsFailure(error));
    }
  };
};

// Acciones para crear categoría
export const createproductSuccess = (product) => ({
  type: "CREATE_product_SUCCESS",
  payload: product,
});

export const createproductFailure = (error) => ({
  type: "CREATE_product_FAILURE",
  payload: error,
});

export const addproduct = (product) => {
  return async (dispatch) => {
    try {
      console.log(product);
      const res = await createproductsRequest(product);
      console.log(res.data);
      dispatch(createproductSuccess(res.data));
    } catch (error) {
      dispatch(createproductFailure(error));
    }
  };
};

// Acciones para eliminar categoría
export const deleteproductSuccess = (id) => ({
  type: "DELETE_product_SUCCESS",
  payload: id,
});

export const deleteproductFailure = (error) => ({
  type: "DELETE_product_FAILURE",
  payload: error,
});

export const removeproduct = (id) => {
  return async (dispatch) => {
    try {
     const res = await deletegetproductsRequest(id);
     console.log(res);
      dispatch(deleteproductSuccess(id));
    } catch (error) {
      dispatch(deleteproductFailure(error));
    }
  };
};
