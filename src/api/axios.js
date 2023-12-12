import axios from 'axios';
const url = "https://sistema-de-inventario-production-5e4e.up.railway.app/api";

const instance = axios.create({
    // baseURL:'http://localhost:3000/api',
    baseURL:url,
    withCredentials:true,
})


export default instance;