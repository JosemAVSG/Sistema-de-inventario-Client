import apiClient from './axios.js';

export const getCategorysRequest = () => apiClient.get('/categorias');
export const createCategorysRequest = (categoria) => apiClient.post('/categorias', categoria);
export const updateCategorysRequest = (id,categoria) => apiClient.put(`/categorias/${id}`,categoria);
export const deletegetCategorysRequest = (id) => apiClient.delete(`/categorias/${id}`);
export const getCategoryRequest = (id) => apiClient.get(`/categorias/${id}`);