import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaGlobe, FaTags } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../services/categoryService';
import { getAllCountries } from '../services/locationService';
import { filterProperties } from '../services/propertyService';

const Searcher = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({
    city: '',
    country: '',
    category: '',
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [countriesData, categoriesData] = await Promise.all([
        getAllCountries(),
        getAllCategories(),
      ]);
      setCountries(countriesData);
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setSearch(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'country') {
      const selectedCountry = countries.find(
        country => country.id === parseInt(value)
      );
      setCities(selectedCountry ? selectedCountry.cities : []);
      setSearch(prev => ({ ...prev, city: '' }));
    }
  };

  const handleSearch = async () => {
    try {
      const filters = {
        cityId: search.city,
        countryId: search.country,
        categoryId: search.category,
      };

      const results = await filterProperties(filters);

      navigate('/properties', {
        state: {
          filterResults: results,
          appliedFilters: filters,
        },
      });
    } catch (error) {
      console.error('Error al buscar propiedades:', error);
    }
  };

  return (
    <div className="w-full">
      <div
        className="relative min-h-[500px] sm:min-h-[600px] bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 pt-16 sm:pt-0">
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Encuentra tu lugar ideal
            </h1>
            <p className="text-lg sm:text-xl text-white/90 px-4">
              Explora las mejores propiedades en tu destino preferido
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-5 sm:p-7 mb-8 sm:mb-12 backdrop-blur-sm bg-white/90">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
              <div className="sm:col-span-1 lg:col-span-3">
                <label className="flex items-center mb-2.5 text-sm font-medium text-gray-700">
                  <FaGlobe className="mr-2 text-primary" />
                  País
                </label>
                <select
                  name="country"
                  value={search.country}
                  onChange={handleChange}
                  className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           bg-white appearance-none cursor-pointer transition-all duration-300 hover:border-primary"
                >
                  <option value="">Selecciona un país</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-1 lg:col-span-3">
                <label className="flex items-center mb-2.5 text-sm font-medium text-gray-700">
                  <FaMapMarkerAlt className="mr-2 text-primary" />
                  Ciudad
                </label>
                <select
                  name="city"
                  value={search.city}
                  onChange={handleChange}
                  className={`w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           bg-white appearance-none transition-all duration-300 
                           ${!search.country ? 'cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:border-primary'}`}
                  disabled={!search.country}
                >
                  <option value="">Selecciona una ciudad</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-1 lg:col-span-3">
                <label className="flex items-center mb-2.5 text-sm font-medium text-gray-700">
                  <FaTags className="mr-2 text-primary" />
                  Categoría
                </label>
                <select
                  name="category"
                  value={search.category}
                  onChange={handleChange}
                  className="w-full p-2.5 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           bg-white appearance-none cursor-pointer transition-all duration-300 hover:border-primary"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-1 lg:col-span-3 flex items-end mt-2 sm:mt-0">
                <button
                  onClick={handleSearch}
                  className="w-full bg-primary hover:bg-primary/90 text-white px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium
                           transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                           flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl h-[42px] sm:h-[46px]"
                >
                  <FaSearch className="text-lg" />
                  <span>Buscar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searcher;
