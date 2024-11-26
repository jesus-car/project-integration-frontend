import {API_URLS} from "../utils/apiConfig.js";
import api from "./api.js";

async function bookingProperty(bookingData) {
    try {
        return await api.post(`${API_URLS.BOOKING}`, bookingData);
    } catch (error) {
        throw new Error("Error al reservar la propiedad: " + error.response.data.details || 'Error del servidor');
    }
}

async function getUserBookings(userId) {
    try {
        return await api.get(`${API_URLS.MY_BOOKINGS}/${userId}`);
    } catch (error) {
        throw new Error("Error al obtener las reservas: " + error.response.data.details || 'Error del servidor');
    }
}

export const bookingService = {
    bookingProperty,
    getUserBookings
}