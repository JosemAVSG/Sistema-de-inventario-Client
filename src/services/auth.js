import apiClient from "../services/apiClient.js";

export const registerRequest = (user) => apiClient.post(`/register`, user);

export const loginRequest = (user) => apiClient.post(`/login`,user);

export const verifyToken = () => apiClient.get('/verify');
