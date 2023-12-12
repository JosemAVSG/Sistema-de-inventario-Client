import instance from "./axios.js";

export const registerRequest = (user) => instance.post(`/register`, user);

export const loginRequest = (user) => instance.post(`/login`,user);

export const verifyToken = () => instance.get('/verify');
