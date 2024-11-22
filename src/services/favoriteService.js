import axios from "axios";
import { API_URLS } from "../utils/apiConfig";

async function getFavoritesByUser(id) {
    try {
        return await axios.get(`${API_URLS.FAVORITES}/all/${id}`);
    } catch (error) {
        throw new Error("Error al obtener los favoritos: " + error.response.data.details || 'Error del servidor');
    }
}

async function addFavorite(propertyId) {
    try {
        return await axios.post(`${API_URLS.FAVORITES}/add/${propertyId}`);
    } catch (error) {
        throw new Error("Error al añadir favorito: " + error.response.data.details || 'Error del servidor');
    }
}

async function removeFavorite(propertyId) {
    try {
        return await axios.delete(`${API_URLS.FAVORITES}/remove/${propertyId}`);
    } catch (error) {
        throw new Error("Error al eliminar favorito: " + error.response.data.details || 'Error del servidor');
    }
}

export const favoriteService = {
    getFavoritesByUser,
    addFavorite,
    removeFavorite
}
