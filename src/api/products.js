import instance from './axios';

export const getproductsRequest = () => instance.get('/products');
export const createproductsRequest = (product) => instance.post('/products', product);
export const updateproductsRequest = (id,product) => instance.put(`/products/${id}`,product);
export const deletegetproductsRequest = (id) => instance.delete(`/products/${id}`);
export const getproductRequest = (id) => instance.get(`/products/${id}`);