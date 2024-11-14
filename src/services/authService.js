import {API_URLS} from "../utils/apiConfig";
import axios from "axios";

async function login(credentials) {
    try {
        return await axios.post(API_URLS.LOGIN, credentials);
    } catch (e) {
        throw new Error("Error al iniciar sesión: " + e.response.data.details || 'Error del servidor');
    }
}

export const authService = {
    login
}