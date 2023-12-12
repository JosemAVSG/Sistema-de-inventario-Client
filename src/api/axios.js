import axios from 'axios';
const url = "https://sistema-de-inventario-client-production.up.railway.app/api";

const instance = axios.create({
    // baseURL:'http://localhost:3000/api',
    baseURL:url,
    withCredentials:true,
})


export default instance;