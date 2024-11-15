// todo: servicio para encapsular la interacción con la API de propiedades
import {API_URLS} from "../utils/apiConfig";
import {detail, properties} from "../utils/fakeData.js";
import {choiceRandomNFromList} from "../utils/utils.js";

const API_URL = "https://api.example.com/properties";
const BASE_URL = 'http://100.29.91.166:8080/roomly-services/api/v1';

export const filterProperties = async (filters = {}, page = 0, size = 10) => {
    try {
        const response = await fetch(
            `${BASE_URL}/properties/filter?page=${page}&size=${size}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cityId: filters.cityId ? parseInt(filters.cityId) : null,
                    countryId: filters.countryId ? parseInt(filters.countryId) : null,
                    categoryId: filters.categoryId ? parseInt(filters.categoryId) : null
                })
            }
        );

        if (!response.ok) {
            throw new Error('Error al obtener las propiedades');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en propertyService:', error);
        throw error;
    }
};

export const propertyService = {
    getFilteredProperties: filterProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    getPaginatedProperties
};

async function getPropertyById(id) {
    try {
        const response = await fetch(`${BASE_URL}/properties/${id}`);
        if (!response.ok) throw new Error('Error al obtener la propiedad');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function createProperty(property) {
    try {
        const response = await fetch(`${BASE_URL}/properties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(property)
        });
        if (!response.ok) throw new Error('Error al crear la propiedad');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function updateProperty(id, property) {
    try {
        const response = await fetch(`${BASE_URL}/properties/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(property)
        });
        if (!response.ok) throw new Error('Error al actualizar la propiedad');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function deleteProperty(id) {
    try {
        const response = await fetch(`${BASE_URL}/properties/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar la propiedad');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

async function getPaginatedProperties(page = 0, size = 10) {
    return filterProperties({}, page, size);
}
