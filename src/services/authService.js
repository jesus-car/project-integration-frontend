import {API_URLS} from "../utils/apiConfig";
import axios from "axios";

async function login(email, password) {
    try {
        const response = await axios.post(API_URLS.LOGIN, { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Almacenar el token en localStorage
        }
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Lanzar el error para manejarlo en el componente
    }
}

export const authService = {
    login
}