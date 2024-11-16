import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaGlobe, FaTags } from 'react-icons/fa';

const SearchFilters = ({
  search,
  handleChange,
  handleSearch,
  countries,
  cities,
  categories,
  variant = 'default',
}) => {
  const containerClass = variant === 'properties' 
    ? "bg-white rounded-xl shadow-[0_2px_16px_rgba(0,0,0,0.12)] p-4 sm:p-6 mb-8 max-w-[940px] mx-auto"
    : "bg-white rounded-xl shadow-2xl p-5 sm:p-7 mb-8 sm:mb-12 backdrop-blur-sm bg-white/90";

  return (
    <div className={containerClass}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* País Select */}
        <div className="relative">
          <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
            <FaGlobe className="mr-2 text-primary" />
            País
          </label>
          <select
            name="country"
            value={search.country}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
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

        {/* Ciudad Select */}
        <div className="relative">
          <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
            <FaMapMarkerAlt className="mr-2 text-primary" />
            Ciudad
          </label>
          <select
            name="city"
            value={search.city}
            onChange={handleChange}
            className={`w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
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

        {/* Categoría Select */}
        <div className="relative">
          <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
            <FaTags className="mr-2 text-primary" />
            Categoría
          </label>
          <select
            name="category"
            value={search.category}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     bg-white appearance-none cursor-pointer transition-all duration-300 hover:border-primary"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de búsqueda */}
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium
                     transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                     flex items-center justify-center space-x-2 shadow-md h-[42px]"
          >
            <FaSearch className="text-lg" />
            <span>Buscar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters; 