import {API_URLS} from "../utils/apiConfig.js";
import axios from "axios";


async function getAllRoles() {
    try {
        return await axios.get(`${API_URLS.ROLES}`, {});
    } catch (error) {
        throw new Error("Error al obtener los roles: " + error.response.data.details || 'Error del servidor');
    }
}

async function changeUserRole(userId, roleId) {
    try {
        return await axios.patch(`${API_URLS.USERS}/${userId}/role`, {roleId});
    } catch (e) {
        throw new Error("Error al cambiar el rol del usuario: " + e.response.data.details || 'Error del servidor');
    }
}

export const roleService = {
    getAllRoles,
    changeUserRole
}