import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes';
import { FaUpload, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useToast } from '../contexts/ToastContext';

export default function AddProduct() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [],
  });
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (formData.description.length < 10) {
      newErrors.description =
        'La descripción debe tener al menos 10 caracteres';
    }

    if (!formData.price) {
      newErrors.price = 'El precio es requerido';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser un número válido mayor a 0';
    }

    if (!formData.category) {
      newErrors.category = 'La categoría es requerida';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'Debe subir al menos una imagen';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageChange = e => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isValid = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max
      return isValid && isValidSize;
    });

    if (validFiles.length !== files.length) {
      const errorMessage =
        'Algunos archivos no son válidos. Use imágenes de hasta 5MB';
      setErrors(prev => ({
        ...prev,
        images: errorMessage,
      }));
      toast.warning(errorMessage);
    } else {
      setErrors(prev => ({
        ...prev,
        images: '',
      }));
      if (validFiles.length > 0) {
        toast.success(
          `${validFiles.length} ${validFiles.length === 1 ? 'imagen cargada' : 'imágenes cargadas'} correctamente`
        );
      }
    }

    setFormData(prev => ({
      ...prev,
      images: validFiles,
    }));

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = index => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setGlobalError('');

    if (!validateForm()) {
      toast.error(
        'Por favor, complete todos los campos requeridos correctamente'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement API call to save product
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Producto guardado exitosamente');
      navigate(routes.administrationHome);
    } catch (err) {
      const errorMessage =
        'Error al guardar el producto. Por favor, intente nuevamente.';
      setGlobalError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // preview component
  const ProductPreview = () => {
    const [activeImage, setActiveImage] = useState(0);
    const previewImage =
      previews.length > 0
        ? previews[activeImage]
        : 'https://via.placeholder.com/400x300?text=Sin+Imagen';

    return (
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
                {formData.price
                  ? `$${Number(formData.price).toLocaleString()}`
                  : '$0'}
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
                  className={`flex-shrink-0 relative ${
                    activeImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={preview}
                    alt={`Miniatura ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  {activeImage === index && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-lg" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Información del producto */}
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {formData.name || 'Nombre del producto'}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {formData.category || 'Categoría'}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500 text-sm">
                    {previews.length}{' '}
                    {previews.length === 1 ? 'imagen' : 'imágenes'}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Descripción
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {formData.description || 'Descripción del producto'}
                </p>
              </div>

              {/* Características adicionales */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-gray-500">Categoría</span>
                  <span className="font-medium text-gray-800">
                    {formData.category || 'No especificada'}
                  </span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-gray-500">ID</span>
                  <span className="font-medium text-gray-800">
                    #PRD-{String(Date.now()).slice(-4)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de vista previa */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">
            Vista previa de cómo se verá en el sitio web
          </span>
        </div>
      </div>
    );
  };

  // Agregar estas nuevas funciones de manejo de drag and drop
  const handleDragOver = e => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const handleDrop = e => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');

    const files = Array.from(e.dataTransfer.files);

    // Usar la misma lógica de validación que en handleImageChange
    const validFiles = files.filter(file => {
      const isValid = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max
      return isValid && isValidSize;
    });

    if (validFiles.length !== files.length) {
      setErrors(prev => ({
        ...prev,
        images: 'Algunos archivos no son válidos. Use imágenes de hasta 5MB',
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        images: '',
      }));
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));

    // Crear URLs de previsualización
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  return (
    <div className="min-h-screen">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Panel izquierdo - Formulario */}
          <div className="lg:col-span-3 lg:px-6">
            <div className="bg-white rounded-xl shadow-lg h-full border border-gray-100">
              <div className="p-6">
                {/* Título de la sección */}
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Información del Producto
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Complete todos los campos requeridos (*)
                  </p>
                </div>

                {globalError && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                    <p className="font-bold">Error</p>
                    <p>{globalError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nombre del Producto *
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
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Precio *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                          errors.price ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.price && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.price}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Categoría *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.category ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Seleccione una categoría</option>
                      <option value="casa">Casa</option>
                      <option value="departamento">Departamento</option>
                      <option value="oficina">Oficina</option>
                      <option value="local">Local Comercial</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

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
                      Imágenes *
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
                      <p className="text-red-500 text-xs mt-1">
                        {errors.images}
                      </p>
                    )}

                    {previews.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {previews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="h-24 w-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <FaTimes size={12} />
                            </button>
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
                        isSubmitting
                          ? 'bg-blue-400'
                          : 'bg-blue-500 hover:bg-blue-700'
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
                          Guardando...
                        </>
                      ) : (
                        'Guardar Producto'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(routes.administration)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Panel derecho - Vista previa */}
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

                <ProductPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
