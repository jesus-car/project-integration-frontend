import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <div className="w-full h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=80&w=2070&auto=format&fit=crop')",
          transform: 'scale(1.1)',

        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-8 sm:mb-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 
                         text-shadow-lg tracking-tight leading-tight">
              Encuentra tu lugar ideal
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 px-4 font-light 
                         text-shadow-sm max-w-2xl mx-auto leading-relaxed">
              Explora las mejores propiedades en tu destino preferido
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <SearchFilters
              search={search}
              handleChange={handleChange}
              handleSearch={handleSearch}
              countries={countries}
              cities={cities}
              categories={categories}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
