import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../services/categoryService';
import { getAllCountries } from '../services/locationService';
import { filterProperties } from '../services/propertyService';
import SearchFilters from './SearchFilters';

const HeroSection = () => {
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
      try {
        const [countriesData, categoriesData] = await Promise.all([
          getAllCountries(),
          getAllCategories(),
        ]);

        setCountries(countriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
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

          <SearchFilters
            search={search}
            handleChange={handleChange}
            handleSearch={handleSearch}
            countries={countries}
            cities={cities}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
