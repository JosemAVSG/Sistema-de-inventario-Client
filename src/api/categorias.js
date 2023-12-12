import instance from './axios.js';

export const getCategorysRequest = () => instance.get('/categorias');
export const createCategorysRequest = (categoria) => instance.post('/categorias', categoria);
export const updateCategorysRequest = (id,categoria) => instance.put(`/categorias/${id}`,categoria);
export const deletegetCategorysRequest = (id) => instance.delete(`/categorias/${id}`);
export const getCategoryRequest = (id) => instance.get(`/categorias/${id}`);