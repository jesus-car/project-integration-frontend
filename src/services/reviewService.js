import api from "./api.js";
import {API_URLS} from "../utils/apiConfig.js";

async function createReview(review) {
    try {
        return await api.post(`${API_URLS.REVIEWS_RATE}`, review);
    } catch (error) {
        throw new Error("Error al crear la reseña: " + error.response.data.details || 'Error del servidor');
    }
}

export const reviewService = {
    createReview
}