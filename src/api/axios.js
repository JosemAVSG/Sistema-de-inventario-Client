import axios from 'axios';
 const url = "https://sistema-de-inventario-backend.onrender.com/api";

const instance = axios.create({
    // baseURL:'http://localhost:3000/api',
    baseURL:url,
    withCredentials:true,
})


export default instance;