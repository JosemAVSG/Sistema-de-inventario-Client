import apiClient from './axios';

export const getProveedorsRequest = () => apiClient.get('/proveedor');
export const createProveedorRequest = (proveedor) => apiClient.post('/proveedor', proveedor);
export const updateProveedorRequest = (id,proveedor) => apiClient.put(`/proveedor/${id}`,proveedor);
export const deletegetProveedorRequest = (id) => apiClient.delete(`/proveedor/${id}`);
export const getProveedorRequest = (id) => apiClient.get(`/proveedor/${id}`);