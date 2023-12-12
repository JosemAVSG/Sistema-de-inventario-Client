import instance from './axios';

export const getProveedorsRequest = () => instance.get('/proveedor');
export const createProveedorRequest = (proveedor) => instance.post('/proveedor', proveedor);
export const updateProveedorRequest = (id,proveedor) => instance.put(`/proveedor/${id}`,proveedor);
export const deletegetProveedorRequest = (id) => instance.delete(`/proveedor/${id}`);
export const getProveedorRequest = (id) => instance.get(`/proveedor/${id}`);