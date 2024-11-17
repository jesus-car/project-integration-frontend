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

export const getCountryById = async id => {
  try {
    const response = await fetch(`${BASE_URL}/countries/${id}`);
    if (!response.ok) throw new Error('Error al obtener el país');
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      cities: data.cities.map(city => ({
        id: city.id,
        name: city.name,
        countryId: city.countryId,
      })),
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getCityById = async cityId => {
  try {
    const countries = await getAllCountries();
    let cityFound = null;

    for (const country of countries) {
      const countryData = await getCountryById(country.id);
      const city = countryData.cities.find(c => c.id === cityId);
      if (city) {
        cityFound = city;
        break;
      }
    }

    if (!cityFound) throw new Error('Ciudad no encontrada');
    return cityFound;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const locationService = {
  getAllCountries,
  getCountryById,
  getCityById,
};
