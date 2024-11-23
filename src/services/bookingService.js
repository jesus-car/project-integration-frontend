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
        //return await api.get(`${API_URLS.MY_BOOKINGS}/${userId}`, {});
        let json = [
            {
                "userId": 2,
                "property": {
                    "id": 7,
                    "name": "Casa Rústica en la Montaña",
                    "description": "Una acogedora casa de madera en la montaña, ideal para desconectar de la ciudad.",
                    "city": {
                        "id": 2,
                        "name": "Cancún",
                        "country": {
                            "id": 1,
                            "name": "México"
                        }
                    },
                    "exactAddress": "Camino de los Pinos 123",
                    "mainPhotoUrl": "https://dh-integration-s3.s3.amazonaws.com/1e713b42-dd64-47c6-b446-076287b078b5_1119846702.jpg",
                },
                "startDate": "2024-11-28",
                "endDate": "2024-12-02",
                "totalPrice": 2500,
                "numGuest": 2,
                "status": "CONFIRMED",
                "date": "2024-11-23T14:34:22"
            },
            {
                "userId": 2,
                "property": {
                    "id": 8,
                    "name": "Cabaña Acogedora",
                    "description": "Perfecta para una escapada romántica en medio de la naturaleza.",
                    "city": {
                        "id": 1,
                        "name": "Ciudad de México",
                        "country": {
                            "id": 1,
                            "name": "México"
                        }
                    },
                    "exactAddress": "Ruta del Bosque 99",
                    "mainPhotoUrl": "https://dh-integration-s3.s3.amazonaws.com/2bbea6b0-5a82-4fb0-81d4-f078f21ccd03_355746054.jpg",
                },
                "startDate": "2024-12-10",
                "endDate": "2024-12-13",
                "totalPrice": 1200,
                "numGuest": 1,
                "status": "COMPLETED",
                "date": "2024-11-23T14:38:07"
            }
        ]
        return json;
    } catch (error) {
        throw new Error("Error al obtener las reservas: " + error.response.data.details || 'Error del servidor');
    }
}

export const bookingService = {
    bookingProperty,
    getUserBookings
}