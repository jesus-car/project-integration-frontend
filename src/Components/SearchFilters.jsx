import React, { useState, useEffect, useRef } from 'react';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaGlobe,
  FaTags,
  FaCalendarAlt,
  FaFilter,
} from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import DoubleCalendar from './DoubleCalendar';
import { format } from 'date-fns';

const SearchFilters = ({
  search,
  handleChange,
  handleSearch,
  countries,
  cities,
  categories,
  variant = 'default',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDates, setSelectedDates] = useState(search.dates || { startDate: null, endDate: null });
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const searchRef = useRef(null);
  const [tempFilters, setTempFilters] = useState(search);
  const [modalCities, setModalCities] = useState([]);
  const modalRef = useRef(null);

  const containerClass =
    variant === 'properties'
      ? 'bg-white rounded-xl shadow-[0_2px_16px_rgba(0,0,0,0.12)] p-4 sm:p-6 mb-8 max-w-[1200px] mx-auto'
      : 'bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-5 sm:p-7 mb-8 sm:mb-12 max-w-[1000px]';

  const getAllSuggestions = term => {
    if (!term) return [];

    const normalizedTerm = term.toLowerCase();

    const countrySuggestions = countries
      .filter(country => country.name.toLowerCase().includes(normalizedTerm))
      .map(country => ({
        id: country.id,
        name: country.name,
        type: 'country',
      }));

    const citySuggestions = cities
      .filter(city => city.name.toLowerCase().includes(normalizedTerm))
      .map(city => ({
        id: city.id,
        name: city.name,
        type: 'city',
      }));

    const categorySuggestions = categories
      .filter(category => category.name.toLowerCase().includes(normalizedTerm))
      .map(category => ({
        id: category.id,
        name: category.name,
        type: 'category',
      }));

    return [
      ...countrySuggestions,
      ...citySuggestions,
      ...categorySuggestions,
    ].slice(0, 5);
  };

  const handleSearchInput = e => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      const newSuggestions = getAllSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = suggestion => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);

    const newSearch = { ...search };
    if (suggestion.type === 'country') {
      newSearch.country = suggestion.id.toString();
      newSearch.city = '';
      handleChange({
        target: { name: 'country', value: suggestion.id.toString() },
      });
    } else if (suggestion.type === 'city') {
      newSearch.city = suggestion.id.toString();
      handleChange({
        target: { name: 'city', value: suggestion.id.toString() },
      });
    } else if (suggestion.type === 'category') {
      newSearch.category = suggestion.id.toString();
      handleChange({
        target: { name: 'category', value: suggestion.id.toString() },
      });
    }
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    if (handleChange) {
      handleChange({
        target: {
          name: 'dates',
          value: dates
        }
      });
    }
  };

  const handleSearchClick = () => {
    const filters = {
      cityId: search.city,
      countryId: search.country,
      categoryId: search.category,
      startDate: selectedDates.startDate ? format(selectedDates.startDate, "yyyy-MM-dd") : null,
      endDate: selectedDates.endDate ? format(selectedDates.endDate, "yyyy-MM-dd") : null
    };

    handleSearch(filters);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowFiltersModal(false);
      }
    };

    if (showFiltersModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFiltersModal]);

  const handleTempFilterChange = e => {
    const { name, value } = e.target;
    setTempFilters(prev => {
      const newFilters = { ...prev, [name]: value };

      if (name === 'country') {
        const selectedCountry = countries.find(
          country => country.id === parseInt(value)
        );
        setModalCities(selectedCountry ? selectedCountry.cities : []);
        newFilters.city = ''; 
      }

      return newFilters;
    });
  };

  const applyFilters = () => {
    handleChange({ target: { name: 'country', value: tempFilters.country } });
    handleChange({ target: { name: 'city', value: tempFilters.city } });
    handleChange({ target: { name: 'category', value: tempFilters.category } });
    setShowFiltersModal(false);
  };

  useEffect(() => {
    if (showFiltersModal) {
      setTempFilters(search);
      if (search.country) {
        const selectedCountry = countries.find(
          country => country.id === parseInt(search.country)
        );
        setModalCities(selectedCountry ? selectedCountry.cities : []);
      } else {
        setModalCities([]);
      }
    }
  }, [showFiltersModal, search, countries]);

  return (
    <div className={containerClass}>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
        <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 lg:w-[45%]">
          <button
            onClick={() => setShowFiltersModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg 
                      hover:border-gray-400 transition-colors h-[42px] bg-white w-full sm:w-auto"
          >
            <FaFilter className="text-gray-400 text-sm" />
            <span className="text-sm font-medium text-gray-600">Filtros</span>
          </button>

          <div className="w-full lg:w-[calc(100%-120px)]">
            <div className="bg-white rounded-lg">
              <DoubleCalendar 
                onDateChange={handleDateChange} 
                initialDates={selectedDates}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-2 lg:w-[55%]">
          <div className="flex-1 relative" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInput}
                placeholder="Buscar por país, ciudad o categoría..."
                className="w-full h-[42px] p-2.5 pl-10 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {suggestions.map(suggestion => (
                  <div
                    key={`${suggestion.type}-${suggestion.id}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                  >
                    {suggestion.type === 'country' && (
                      <FaGlobe className="text-primary" />
                    )}
                    {suggestion.type === 'city' && (
                      <FaMapMarkerAlt className="text-primary" />
                    )}
                    {suggestion.type === 'category' && (
                      <FaTags className="text-primary" />
                    )}
                    <span>{suggestion.name}</span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {suggestion.type === 'country' && 'País'}
                      {suggestion.type === 'city' && 'Ciudad'}
                      {suggestion.type === 'category' && 'Categoría'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleSearchClick}
            className="bg-primary hover:bg-primary/90 text-white px-4 lg:px-6 py-2.5 rounded-lg font-medium
                     transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 
                     focus:ring-primary focus:ring-offset-2 flex items-center justify-center gap-2
                     shadow-md h-[42px] min-w-[42px] sm:min-w-[42px] lg:min-w-[100px]"
          >
            <FaSearch className="text-lg" />
            <span className="hidden lg:inline">Buscar</span>
          </button>
        </div>
      </div>

      {showFiltersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-[99999] flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full mx-4 my-4 max-h-[90vh] relative"
          >
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-semibold">Filtros</h2>
              <button
                onClick={() => setShowFiltersModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            <div className="space-y-6 overflow-y-auto max-h-[calc(90vh-200px)] pr-2">
              {/* País Select */}
              <div className="relative mx-2">
                <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                  <FaGlobe className="mr-2 text-primary" />
                  País
                </label>
                <select
                  name="country"
                  value={tempFilters.country}
                  onChange={handleTempFilterChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           bg-white appearance-none cursor-pointer hover:border-gray-400 transition-all"
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
              <div className="relative mx-2">
                <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                  <FaMapMarkerAlt className="mr-2 text-primary" />
                  Ciudad
                </label>
                <select
                  name="city"
                  value={tempFilters.city}
                  onChange={handleTempFilterChange}
                  className={`w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           bg-white appearance-none transition-all ${!tempFilters.country ? 'cursor-not-allowed bg-gray-50' : 'cursor-pointer hover:border-gray-400'}`}
                  disabled={!tempFilters.country}
                >
                  <option value="">Selecciona una ciudad</option>
                  {modalCities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Categoría Select */}
              <div className="relative mx-2 pb-2">
                <label className="flex items-center mb-2 text-sm font-medium text-gray-700">
                  <FaTags className="mr-2 text-primary" />
                  Categoría
                </label>
                <select
                  name="category"
                  value={tempFilters.category}
                  onChange={handleTempFilterChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                           bg-white appearance-none cursor-pointer hover:border-gray-400 transition-all"
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4 pt-4 border-t">
              <button
                onClick={() => setShowFiltersModal(false)}
                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={applyFilters}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
