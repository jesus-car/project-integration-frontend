import {API_URLS} from "../utils/apiConfig.js";
import api from "./api.js";

async function getAllUsers() {
    try {
        return await api.get(`${API_URLS.USERS}/all`, {});
    } catch (error) {
        throw new Error("Error al obtener los usuarios: " + error.response.data.details || 'Error del servidor');
    }
}


export const userService = {
    getAllUsers
}