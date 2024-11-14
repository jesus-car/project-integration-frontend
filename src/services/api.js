import axios from 'axios';
import {API_URLS} from "../utils/apiConfig.js";

const api = axios.create({
    baseURL: API_URLS.BASE
});

// Interceptor para añadir el token a las cabeceras
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Opcional: Lógica para desloguear al usuario si el token ha expirado
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirige a la página de login
        }
        return Promise.reject(error);
    }
);

export default api;
