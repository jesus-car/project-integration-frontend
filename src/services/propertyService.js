// todo: servicio para encapsular la interacción con la API de propiedades
import { API_URLS } from "../utils/apiConfig";

const API_URL = "https://api.example.com/properties";

export const propertyService = {
    getProperties,
    getRandomNProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
};

async function getProperties() {
    // todo
    try {
        const response = await fetch(API_URLS.PROPERTIES);
        if (!response.ok) {
            throw new Error("Error al obtener propiedades");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getProperties:", error);
        throw error;
    }
};

async function getRandomNProperties(n) {
    // todo
    const properties = [
        {
            id: 1,
            name: "Chalet en la playa",
            pricePerNigth: 100000,
            description: "Casa en la playa con vista al mar",
            city: "Santa Marta",
            country: "Colombia",
            category: "playa",
            image: "https://images.adsttc.com/media/images/5a58/a660/f197/cc25/0900/02b1/newsletter/S3_CDS--6.jpg?1515759188",
        },
        {
            id: 2,
            name: "Casa en la montaña",
            pricePerNigth: 80000,
            description: "Casa en la montaña con vista al valle",
            city: "Monterrey",
            country: "México",
            image: "https://content.arquitecturaydiseno.es/medio/2024/01/29/patrio-casa-en-seattle-de-mwworks_d9bcc98b_240129113523_600x600.jpg",
        },
        {
            id: 3,
            name: "Finca en el bosque",
            pricePerNigth: 120000,
            description: "Casa en el bosque con vista al río",
            city: "Bariloche",
            country: "Argentina",
            image: "https://img.freepik.com/foto-gratis/casa-fotorrealista-arquitectura-madera-estructura-madera_23-2151302705.jpg",
        },
        {
            id: 4,
            name: "Casa en la ciudad",
            pricePerNigth: 90000,
            description: "Casa en la ciudad con vista a la plaza",
            city: "Cali",
            country: "Colombia",
            image: "https://images.adsttc.com/media/images/5a58/a660/f197/cc25/0900/02b1/newsletter/S3_CDS--6.jpg?1515759188",
        },
        {
            id: 5,
            name: "Casa en el campo",
            pricePerNigth: 110000,
            description: "Casa en el campo con vista a las montañas",
            city: "Cusco",
            country: "Perú",
            image: "https://content.arquitecturaydiseno.es/medio/2024/01/29/patrio-casa-en-seattle-de-mwworks_d9bcc98b_240129113523_600x600.jpg",
        },
        {
            id: 6,
            name: "Casa en la playa",
            pricePerNigth: 100000,
            description: "Casa en la playa con vista al mar",
            city: "Santa Marta",
            country: "Colombia",
            image: "https://images.adsttc.com/media/images/5a58/a660/f197/cc25/0900/02b1/newsletter/S3_CDS--6.jpg?1515759188",
        },
        {
            id: 7,
            name: "Hermosa casa en la montaña",
            pricePerNigth: 80000,
            description: "Casa en la montaña con vista al valle",
            city: "Monterrey",
            country: "México",
            image: "https://a0.muscache.com/im/pictures/miso/Hosting-643173334088204492/original/3f1c54b5-93c4-414a-b5a8-6da72136806a.jpeg?im_w=720",
        },
        {
            id: 8,
            name: "Casa en el bosque",
            pricePerNigth: 120000,
            description: "Casa en el bosque con vista al río",
            city: "Bariloche",
            country: "Argentina",
            image: "https://img.freepik.com/foto-gratis/casa-fotorrealista-arquitectura-madera-estructura-madera_23-2151302705.jpg",
        },
        {
            id: 9,
            name: "Sencilla casa en la ciudad",
            pricePerNigth: 90000,
            description: "Casa en la ciudad con vista a la plaza",
            city: "Cali",
            country: "Colombia",
            image: "https://a0.muscache.com/im/pictures/miso/Hosting-643173334088204492/original/3f1c54b5-93c4-414a-b5a8-6da72136806a.jpeg?im_w=720",
        },
        {
            id: 10,
            name: "Casa en el campo",
            pricePerNigth: 110000,
            description: "Casa en el campo con vista a las montañas",
            city: "Cusco",
            country: "Perú",
            image: "https://content.arquitecturaydiseno.es/medio/2024/01/29/patrio-casa-en-seattle-de-mwworks_d9bcc98b_240129113523_600x600.jpg",
        },
    ]

    return properties;
}

async function getPropertyById(id) {
    // todo
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