import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../Components/PropertyCard';
import { filterProperties } from '../services/propertyService';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';

const Properties = () => {
    const location = useLocation();
    const { appliedFilters } = location.state || {};
    
    const [currentPage, setCurrentPage] = useState(0);
    const [properties, setProperties] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProperties = async (page) => {
        setLoading(true);
        const results = await filterProperties(appliedFilters, page, 10);
        setProperties(results);
        setLoading(false);
    };

    useEffect(() => {
        fetchProperties(currentPage);
    }, [currentPage, appliedFilters]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="animate-pulse space-y-8">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-200 h-[400px] rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {properties?.content ? (
                <>
                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                        <div className="flex items-center gap-3 text-gray-600">
                            <FaSearch className="text-primary text-xl" />
                            <div>
                                
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {properties.totalElements} propiedades encontradas
                                </h2>
                                <p className="text-sm mt-1">
                                    Mostrando página {currentPage + 1} de {properties.totalPages}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {properties.content.map(property => (
                            <div key={property.id} className="h-full">
                                <PropertyCard property={property} />
                            </div>
                        ))}
                    </div>

                    {properties.totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                                className={`p-3 rounded-lg transition-all duration-200 ${
                                    currentPage === 0 
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                    : 'bg-primary text-white hover:bg-primary/90 hover:scale-105'
                                }`}
                            >
                                <FaChevronLeft />
                            </button>

                            <div className="flex items-center gap-2 flex-wrap justify-center">
                                {[...Array(properties.totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index)}
                                        className={`w-10 h-10 rounded-lg transition-all duration-200 ${
                                            currentPage === index
                                            ? 'bg-primary text-white scale-110'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === properties.totalPages - 1}
                                className={`p-3 rounded-lg transition-all duration-200 ${
                                    currentPage === properties.totalPages - 1
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-primary text-white hover:bg-primary/90 hover:scale-105'
                                }`}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-md">
                    <FaSearch className="text-gray-400 text-5xl mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                        No se encontraron propiedades
                    </h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Intenta ajustar tus criterios de búsqueda o explorar diferentes ubicaciones
                    </p>
                </div>
            )}
        </div>
    );
};

export default Properties;
