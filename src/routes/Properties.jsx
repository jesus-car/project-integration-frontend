import { useProducts } from '../context/ProductContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Properties() {
  const { products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const navigate = useNavigate();

  // Calcular productos para la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calcular total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Generar array de números de página
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Nuestras Propiedades
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handlePropertyClick(property.id)}
          >
            <div className="relative h-48">
              <img
                src={property.images[0]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                <span className="text-blue-600 font-semibold">
                  ${Number(property.price).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {property.name}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {property.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {property.category}
                </span>
                <span className="text-blue-600 hover:text-blue-800 font-medium">
                  Ver detalles →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Anterior</span>
              ←
            </button>

            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => handlePageClick(number)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === number
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className="sr-only">Siguiente</span>
              →
            </button>
          </nav>
        </div>
      )}

      {/* Indicador de resultados */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Mostrando {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} de {products.length} propiedades
      </div>
    </div>
  );
}
