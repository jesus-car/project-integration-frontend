import {API_URLS} from "../utils/apiConfig";
import axios from "axios";

async function login(email, password) {
    try {
        return await axios.post(API_URLS.LOGIN, {email, password});
    } catch (e) {
        throw new Error(e.response || 'Error al iniciar sesión');
    }
}

export const authService = {
    login
}