import apiClient from './axios';

export const getVentas = () => apiClient.get('/ventas',);
export const getCompras = () => apiClient.get('/compras');
export const createTransaccionRequest = (tipo) => apiClient.post('/crear', tipo);
