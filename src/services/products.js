import apiClient from './axios';

export const getproductsRequest = () => apiClient.get('/products');
export const createproductsRequest = (product) => apiClient.post('/products', product);
export const updateproductsRequest = (id,product) => apiClient.put(`/products/${id}`,product);
export const deletegetproductsRequest = (id) => apiClient.delete(`/products/${id}`);
export const getproductRequest = (id) => apiClient.get(`/products/${id}`);