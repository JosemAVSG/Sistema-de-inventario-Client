import axios from 'axios';
const url = "sistema-de-inventario-backend-production.up.railway.app/api";

const instance = axios.create({
    // baseURL:'http://localhost:3000/api',
    baseURL:url,
    withCredentials:true,
})


export default instance;