import { API_URLS } from "../utils/apiConfig";
import api from "./api";

async function getFavoritesByUser() {
    try {
        return await api.get(`${API_URLS.FAVORITES}/all`);
    } catch (error) {
        throw new Error("Error al obtener los favoritos: " + error.response.data.details || 'Error del servidor');
    }
}

async function addFavorite(propertyId) {
    try {
        return await api.post(`${API_URLS.FAVORITES}/add/${propertyId}`,{}, {headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),

            "Content-Type": "application/json"
        }});
    } catch (error) {
        throw new Error("Error al añadir favorito: " + error.response.data.details || 'Error del servidor');
    }
}

async function removeFavorite(propertyId) {
    try {
        return await api.delete(`${API_URLS.FAVORITES}/remove/${propertyId}`, {headers: {
            "Authorization": localStorage.getItem("token")
        }});
    } catch (error) {
        throw new Error("Error al eliminar favorito: " + error.response.data.details || 'Error del servidor');
    }
}

export const favoriteService = {
    getFavoritesByUser,
    addFavorite,
    removeFavorite
}
