import axios from 'axios';
import { toast } from 'react-toastify';

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de respuesta
apiClient.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa y no es un GET, mostrar toast de éxito
    if (response.config.method !== 'get') {
      toast.success('Operación realizada con éxito');
    }
    return response;
  },
  (error) => {
    // Manejar errores
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400) {
        toast.error(data.message || 'Error en la solicitud');
      } else if (status === 401) {
        toast.error('No autorizado. Inicia sesión nuevamente.');
      } else if (status === 403) {
        toast.error('Acceso denegado.');
      } else if (status === 404) {
        toast.error('Recurso no encontrado.');
      } else if (status === 500) {
        toast.error('Error interno del servidor.');
      } else {
        toast.error('Error desconocido.');
      }
    } else if (error.request) {
      toast.error('Error de conexión. Verifica tu internet.');
    } else {
      toast.error('Error en la solicitud.');
    }
    return Promise.reject(error);
  }
);

// Interceptor de solicitud (opcional, para agregar token si es necesario)
apiClient.interceptors.request.use(
  (config) => {
    // Agregar token de autenticación si existe
    const token = localStorage.getItem('token'); // O desde cookies, etc.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;