import React, { useEffect, useState } from 'react';
import { propertyService } from '../services/propertyService';
import PropertyHomeCard from '../Components/PropertyHomeCard';

const PropertiesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await propertyService.getPaginatedProperties(currentPage);
      setProducts(response.properties);
      setTotalPages(response.totalPages);
    };

    fetchProperties();
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      scrollToTop();
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      scrollToTop();
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Listado de Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(property => (
          <PropertyHomeCard key={property.id} property={property} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`bg-[rgb(72,101,60)] text-white px-4 py-2 rounded-lg shadow-md transition duration-200 hover:bg-[rgb(58,80,48)] ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            disabled={currentPage === index + 1}
            className={`border rounded-lg px-3 py-1 transition duration-200 ${
              currentPage === index + 1
                ? 'bg-[rgb(72,101,60)] text-white'
                : 'bg-white text-[rgb(72,101,60)] border-[rgb(72,101,60)] hover:bg-[rgb(72,101,60)] hover:text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`bg-[rgb(72,101,60)] text-white px-4 py-2 rounded-lg shadow-md transition duration-200 hover:bg-[rgb(58,80,48)] ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PropertiesList;
