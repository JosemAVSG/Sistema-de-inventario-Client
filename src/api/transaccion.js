import instance from './axios';

export const getVentas = () => instance.get('/ventas',);
export const getCompras = () => instance.get('/compras');
export const createTransaccionRequest = (tipo) => instance.post('/crear', tipo);
