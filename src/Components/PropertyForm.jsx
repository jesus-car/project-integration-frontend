import { FaUpload, FaTimes } from 'react-icons/fa';
import MultiSelect from './MultiSelect';

export default function PropertyForm({
  formData,
  errors,
  previews,
  isSubmitting,
  isLoadingCategories,
  categories,
  categoriesError,
  handleInputChange,
  handleImageChange,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  removeImage,
  setMainImage,
  handleSubmit,
  handleCancel,
  submitButtonText = 'Guardar',
  title = 'Información de la Propiedad',
  countries,
  isLoadingCountries,
  countriesError,
  handleFeature,
  featureValue,
  featureList
}) {
  const selectedCountry = countries.find(
    country => country.id === Number(formData.countryId)
  );

  const availableCities = selectedCountry ? selectedCountry.cities : [];

  return (
    <div className="lg:col-span-3 lg:px-6">
      <div className="bg-white rounded-xl shadow-lg h-full border border-gray-100">
        <div className="p-6">
          {/* Título de la sección */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
            <p className="text-gray-500 text-sm mt-1">
              Complete todos los campos requeridos (*)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre de la Propiedad *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Precio por Noche *
                </label>
                <input
                  type="number"
                  name="pricePerNight"
                  value={formData.pricePerNight}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.pricePerNight ? 'border-red-500' : ''
                  }`}
                />
                {errors.pricePerNight && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.pricePerNight}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Dirección Exacta *
                </label>
                <input
                  type="text"
                  name="exactAddress"
                  value={formData.exactAddress}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.exactAddress ? 'border-red-500' : ''
                  }`}
                />
                {errors.exactAddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.exactAddress}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Capacidad Máxima *
                </label>
                <input
                  type="number"
                  name="maxCapacity"
                  value={formData.maxCapacity}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.maxCapacity ? 'border-red-500' : ''
                  }`}
                />
                {errors.maxCapacity && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.maxCapacity}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Número de Habitaciones *
                </label>
                <input
                  type="number"
                  name="numRooms"
                  value={formData.numRooms}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.numRooms ? 'border-red-500' : ''
                  }`}
                />
                {errors.numRooms && (
                  <p className="text-red-500 text-xs mt-1">{errors.numRooms}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Número de Camas *
                </label>
                <input
                  type="number"
                  name="numBeds"
                  value={formData.numBeds}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.numBeds ? 'border-red-500' : ''
                  }`}
                />
                {errors.numBeds && (
                  <p className="text-red-500 text-xs mt-1">{errors.numBeds}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Número de Baños *
                </label>
                <input
                  type="number"
                  name="numBathrooms"
                  value={formData.numBathrooms}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.numBathrooms ? 'border-red-500' : ''
                  }`}
                />
                {errors.numBathrooms && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.numBathrooms}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Categoría *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  disabled={isLoadingCategories}
                  className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.categoryId ? 'border-red-500' : ''
                  } ${isLoadingCategories ? 'bg-gray-100' : ''}`}
                >
                  <option value="">
                    {isLoadingCategories
                      ? 'Cargando categorías...'
                      : 'Seleccione una categoría'}
                  </option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.categoryId}
                  </p>
                )}
                {categoriesError && (
                  <p className="text-red-500 text-xs mt-1">{categoriesError}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  País *
                </label>
                <select
                  name="countryId"
                  value={formData.countryId || ''}
                  onChange={e => {
                    const country = countries.find(
                      c => c.id === Number(e.target.value)
                    );
                    handleInputChange({
                      target: {
                        name: 'countryId',
                        value: e.target.value,
                      },
                    });
                    if (country && country.cities.length > 0) {
                      handleInputChange({
                        target: {
                          name: 'cityId',
                          value: country.cities[0].id.toString(),
                        },
                      });
                    }
                  }}
                  disabled={isLoadingCountries}
                  className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.countryId ? 'border-red-500' : ''
                  } ${isLoadingCountries ? 'bg-gray-100' : ''}`}
                >
                  <option value="">
                    {isLoadingCountries
                      ? 'Cargando países...'
                      : 'Seleccione un país'}
                  </option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.countryId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.countryId}
                  </p>
                )}
                {countriesError && (
                  <p className="text-red-500 text-xs mt-1">{countriesError}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Ciudad *
                </label>
                <select
                  name="cityId"
                  value={formData.cityId || ''}
                  onChange={handleInputChange}
                  disabled={!selectedCountry || isLoadingCountries}
                  className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.cityId ? 'border-red-500' : ''
                  } ${!selectedCountry || isLoadingCountries ? 'bg-gray-100' : ''}`}
                >
                  <option value="">
                    {isLoadingCountries
                      ? 'Cargando ciudades...'
                      : !selectedCountry
                        ? 'Primero seleccione un país'
                        : 'Seleccione una ciudad'}
                  </option>
                  {selectedCountry?.cities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.cityId && (
                  <p className="text-red-500 text-xs mt-1">{errors.cityId}</p>
                )}
              </div>
            </div>
            <MultiSelect onChange={handleFeature} value={featureValue ?? []} featureList={featureList} />
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descripción *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-32 focus:outline-none focus:shadow-outline ${
                  errors.description ? 'border-red-500' : ''
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Imágenes * (Mínimo 5, máximo 6)
              </label>
              <div
                className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md transition-colors duration-200"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-1 text-center">
                  <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Subir archivos</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">o arrastrar y soltar</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF hasta 5MB
                  </p>
                </div>
              </div>
              {errors.images && (
                <p className="text-red-500 text-xs mt-1">{errors.images}</p>
              )}

              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className={`h-24 w-full object-cover rounded-lg ${
                          formData.mainImage === index
                            ? 'ring-2 ring-blue-500'
                            : ''
                        }`}
                      />
                      <div className="absolute top-1 right-1 flex gap-1">
                        <button
                          type="button"
                          onClick={() => setMainImage(index)}
                          className={`${
                            formData.mainImage === index
                              ? 'bg-blue-500'
                              : 'bg-gray-700 hover:bg-blue-600'
                          } text-white rounded-full p-1 transition-colors duration-200`}
                          title={
                            formData.mainImage === index
                              ? 'Imagen principal'
                              : 'Establecer como principal'
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-3 h-3"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                      {formData.mainImage === index && (
                        <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          Principal
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-700'
                } text-white font-bold py-2 px-6 rounded-lg transition duration-200 flex items-center`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isSubmitting ? 'Guardando...' : submitButtonText}
                  </>
                ) : (
                  submitButtonText
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
