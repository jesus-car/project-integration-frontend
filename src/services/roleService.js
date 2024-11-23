import {API_URLS} from "../utils/apiConfig.js";
import api from "./api.js";


async function getAllRoles() {
    try {
        return await api.get(`${API_URLS.ROLES}`, {});
    } catch (error) {
        throw new Error("Error al obtener los roles: " + error.response.data.details || 'Error del servidor');
    }
}

async function changeUserRole(userId, roleId) {
    try {
        return await api.patch(`${API_URLS.USERS}/${userId}/role`, {roleId});
    } catch (e) {
        throw new Error("Error al cambiar el rol del usuario: " + e.response.data.details || 'Error del servidor');
    }
}

export const roleService = {
    getAllRoles,
    changeUserRole
}