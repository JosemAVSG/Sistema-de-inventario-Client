// categoryActions.js

import {getCategoryRequest,getCategorysRequest,createCategorysRequest,updateCategorysRequest,deletegetCategorysRequest } from "../api/categorias";

export const getCategorySuccess = (category) => ({
    type: "GET_CATEGORY_SUCCESS",
    payload: category,
  });
  
  export const getCategoryFailure = (error) => ({
    type: "GET_CATEGORY_FAILURE",
    payload: error,
  });
  
  export const getCategory = (id) => {
    return async (dispatch) => {
      try {
        const res = await getCategoryRequest(id);
        console.log(res);
        dispatch(getCategorySuccess(res.data));
      } catch (error) {
        dispatch(getCategoryFailure(error));
      }
    };
  };
  
  // Acciones para actualizar categoría
  export const updateCategorySuccess = (category) => ({
    type: "UPDATE_CATEGORY_SUCCESS",
    payload: category,
  });
  
  export const updateCategoryFailure = (error) => ({
    type: "UPDATE_CATEGORY_FAILURE",
    payload: error,
  });
  
  export const editCategory = (id, updatedCategory) => {
    return async (dispatch) => {
      try {
        const res = await updateCategorysRequest(id, updatedCategory);
        console.log(res);
        dispatch(updateCategorySuccess(res.data));
      } catch (error) {
        dispatch(updateCategoryFailure(error));
      }
    };
  };


// Acciones para obtener categorías
export const getCategoriesSuccess = (categories) => ({
  type: "GET_CATEGORIES_SUCCESS",
  payload: categories,
});

export const getCategoriesFailure = (error) => ({
  type: "GET_CATEGORIES_FAILURE",
  payload: error,
});

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const res = await getCategorysRequest();
      console.log(res);
      dispatch(getCategoriesSuccess(res.data));
    } catch (error) {
      dispatch(getCategoriesFailure(error));
    }
  };
};

// Acciones para crear categoría
export const createCategorySuccess = (category) => ({
  type: "CREATE_CATEGORY_SUCCESS",
  payload: category,
});

export const createCategoryFailure = (error) => ({
  type: "CREATE_CATEGORY_FAILURE",
  payload: error,
});

export const addCategory = (category) => {
  return async (dispatch) => {
    try {
      const res = await createCategorysRequest(category);
      console.log(res);
      dispatch(createCategorySuccess(res.data));
    } catch (error) {
      dispatch(createCategoryFailure(error));
    }
  };
};

// Acciones para eliminar categoría
export const deleteCategorySuccess = (id) => ({
  type: "DELETE_CATEGORY_SUCCESS",
  payload: id,
});

export const deleteCategoryFailure = (error) => ({
  type: "DELETE_CATEGORY_FAILURE",
  payload: error,
});

export const removeCategory = (id) => {
  return async (dispatch) => {
    try {
     const res = await deletegetCategorysRequest(id);
     console.log(res);
      dispatch(deleteCategorySuccess(id));
    } catch (error) {
      dispatch(deleteCategoryFailure(error));
    }
  };
};

// Otras acciones como actualizar categoría, obtener categoría individual, etc.
