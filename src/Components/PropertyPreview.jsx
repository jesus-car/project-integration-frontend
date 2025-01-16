import { useState } from 'react';
import { GetIcon } from './ListFeature';

export default function PropertyPreview({
  formData,
  previews,
  categories = [],
  countries = [],
  features = []
}) {
  const [activeImage, setActiveImage] = useState(formData.mainImage || 0);

  const previewImage =
    previews.length > 0
      ? previews[activeImage]
      : 'https://via.placeholder.com/400x300?text=Sin+Imagen';

  const categoryName =
    categories?.find(c => c.id === Number(formData.categoryId))?.title ||
    'Categoría';

  const selectedCountry = countries?.find(
    country => country.id === Number(formData.countryId)
  );

  const selectedCity = selectedCountry?.cities?.find(
    city => city.id === Number(formData.cityId)
  );

  const locationInfo = {
    country: selectedCountry?.name || 'País no seleccionado',
    city: selectedCity?.name || 'Ciudad no seleccionada',
    address: formData.exactAddress || 'Dirección no especificada',
  };

  return (
    <div className="hidden lg:block lg:col-span-2">
      <div className="bg-white rounded-xl shadow-lg h-full border border-gray-100">
        <div className="p-6">
          {/* Título de la sección */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">
              Vista Previa
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Visualización en tiempo real
            </p>
          </div>

          <div className="">
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              {/* Imagen Principal */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={previewImage}
                  alt="Vista previa principal"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />

                {/* Navegación de imágenes */}
                {previews.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImage(prev =>
                          prev > 0 ? prev - 1 : previews.length - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={() =>
                        setActiveImage(prev =>
                          prev < previews.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                    >
                      →
                    </button>
                  </>
                )}

                {/* Indicador de precio */}
                <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg">
                  <span className="text-xl font-bold text-blue-600">
                    ${Number(formData.pricePerNight).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Miniaturas de imágenes */}
              {previews.length > 0 && (
                <div className="px-4 py-3 border-b flex gap-2 overflow-x-auto">
                  {previews.map((preview, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 relative ${activeImage === index ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <img
                        src={preview}
                        alt={`Miniatura ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      {activeImage === index && (
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-lg" />
                      )}
                      {formData.mainImage === index && (
                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-xs px-1 rounded-tl">
                          Principal
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Información del producto */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Encabezado con nombre y categoría */}
                  <div className="border-b pb-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {formData.name || 'Nombre de la propiedad'}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {categoryName}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span className="w-1 h-1 bg-gray-500 rounded-full mx-2"></span>
                        {previews.length}{' '}
                        {previews.length === 1 ? 'imagen' : 'imágenes'}
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                      Descripción
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {formData.description || 'Descripción de la propiedad'}
                    </p>
                  </div>

                  {/* Características principales */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      Propiedades
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <span className="block text-gray-500 text-xs uppercase tracking-wide mb-1">
                          Capacidad
                        </span>
                        <span className="font-medium text-gray-800 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          {formData.maxCapacity || '0'} personas
                        </span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <span className="block text-gray-500 text-xs uppercase tracking-wide mb-1">
                          Habitaciones
                        </span>
                        <span className="font-medium text-gray-800 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formData.numRooms || '0'} habitaciones
                        </span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <span className="block text-gray-500 text-xs uppercase tracking-wide mb-1">
                          Camas
                        </span>
                        <span className="font-medium text-gray-800 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7z" />
                          </svg>
                          {formData.numBeds || '0'} camas
                        </span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <span className="block text-gray-500 text-xs uppercase tracking-wide mb-1">
                          Baños
                        </span>
                        <span className="font-medium text-gray-800 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {formData.numBathrooms || '0'} baños
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Información de ubicación */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Ubicación
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="flex items-center">
                        <span className="text-gray-500 text-sm w-20">
                          País:
                        </span>
                        <span className="font-medium text-gray-800">
                          {locationInfo.country}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 text-sm w-20">
                          Ciudad:
                        </span>
                        <span className="font-medium text-gray-800">
                          {locationInfo.city}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 text-sm w-20">
                          Dirección:
                        </span>
                        <span className="font-medium text-gray-800">
                          {locationInfo.address}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='ml-9 mr-9 flex flex-col'>
                    <h4 className="font-semibold text-gray-700 mb-2 ">
                      Caracteristicas
                    </h4>
                    <div className='flex grid grid-cols-2 gap-4'>
                      {features.map((feature) => 
                        <div className='flex gap-x-9' key={feature.id}>
                          <div className='flex items-center gap-x-5'>
                            {GetIcon(feature.iconName)}
                            {feature.name}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
