const BASE_URL = 'http://100.29.91.166:8080/roomly-services/api/v1';

export const getAllCountries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/countries/all`);
        if (!response.ok) throw new Error('Error al obtener los países');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const getCountryById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/countries/${id}`);
        if (!response.ok) throw new Error('Error al obtener el país');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const locationService = {
    getAllCountries,
    getCountryById
}; 