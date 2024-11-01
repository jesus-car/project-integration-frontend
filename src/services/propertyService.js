// todo: servicio para encapsular la interacción con la API de propiedades
import {API_URLS} from "../utils/apiConfig";
import {detail, properties} from "../utils/fakeData.js";
import {choiceRandomNFromList} from "../utils/utils.js";

const API_URL = "https://api.example.com/properties";

export const propertyService = {
    getProperties,
    getFilteredProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    getPaginatedProperties
};

async function getProperties() {
    // todo
    return properties
    /*
    try {
        const response = await fetch(API_URLS.PROPERTIES);
        if (!response.ok) {
            throw new Error("Error al obtener propiedades");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getProperties:", error);
        throw error;
    }*/
};

async function getFilteredProperties(n) {
    // todo
    return choiceRandomNFromList(properties, n)

    /*
    try {
        const response = await fetch(API_URLS.FILTERED_PROPERTIES+'?size='+n);
        if (!response.ok) {
            throw new Error("Error al obtener propiedades");
        }
        return await response.json()
    } catch (error) {
        console.error("Error en getFilteredProperties:", error);
        throw error;
    }

     */

};

async function getPropertyById(id) {
    // todo
    let property = properties.find(x => x.id == id);

    detail.title = property.name;
    detail.imgPrincipal = property.images[0];
    detail.city = property.city;
    detail.country = property.country;
    detail.description = property.description;
    detail.price = property.pricePerNight;


    return detail;
};

async function createProperty(property) {
    const newProperty = { id: Date.now(), ...property };
    properties.push(newProperty);
    return newProperty;
}

async function updateProperty(id, updatedProperty) {
    const index = properties.findIndex(x => x.id === id);
    if (index !== -1) {
        properties[index] = { ...properties[index], ...updatedProperty };
        return properties[index];
    }
    throw new Error("Propiedad no encontrada");
}

async function deleteProperty(id) {
    const index = properties.findIndex(x => x.id === id);
    if (index !== -1) {
        const deletedProperty = properties.splice(index, 1)[0];
        return deletedProperty;
    }
    throw new Error("Propiedad no encontrada");
}

async function getPaginatedProperties(page = 1, limit = 10) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProperties = properties.slice(startIndex, endIndex);
    
    return {
        total: properties.length,
        page,
        totalPages: Math.ceil(properties.length / limit),
        properties: paginatedProperties,
    };
}
