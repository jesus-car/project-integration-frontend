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
    // todo
};

async function updateProperty(id, property) {
    // todo
};

async function deleteProperty(id) {
    // todo
};