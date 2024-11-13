import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes';
import { FaUpload, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useToast } from '../contexts/ToastContext';
import { useProducts } from '../context/ProductContext';
import PropertyForm from '../Components/PropertyForm';
import PropertyPreview from '../Components/PropertyPreview';

export default function AddProduct() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pricePerNight: '',
    exactAddress: '',
    maxCapacity: '',
    numRooms: '',
    numBeds: '',
    numBathrooms: '',
    categoryId: '',
    images: [],
    mainImage: null,
    cityId: 1,
    countryId: 1,
    ownerId: 1,
  });
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const { addProduct } = useProducts();
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState('');
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [countriesError, setCountriesError] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        'http://100.29.91.166:8080/roomly-services/api/v1/categories/all'
      );
      if (!response.ok) {
        throw new Error('Error al cargar las categorías');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategoriesError(
        'Error al cargar las categorías. Por favor, recarga la página.'
      );
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        'http://100.29.91.166:8080/roomly-services/api/v1/countries/all'
      );
      if (!response.ok) {
        throw new Error('Error al cargar los países');
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setCountriesError(
        'Error al cargar los países. Por favor, recarga la página.'
      );
    } finally {
      setIsLoadingCountries(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchCategories(), fetchCountries()]);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (!/^[a-záéíóúñ\s]+$/i.test(formData.name)) {
      newErrors.name =
        'Debe contener solo letras, incluyendo tildes, y espacios entre palabras';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    } else if (formData.description.length < 10) {
      newErrors.description =
        'La descripción debe tener al menos 10 caracteres';
    }

    if (!formData.pricePerNight) {
      newErrors.pricePerNight = 'El precio por noche es requerido';
    } else if (
      isNaN(formData.pricePerNight) ||
      Number(formData.pricePerNight) <= 0
    ) {
      newErrors.pricePerNight =
        'El precio por noche debe ser un número válido mayor a 0';
    }

    if (!formData.exactAddress.trim()) {
      newErrors.exactAddress = 'La dirección exacta es requerida';
    } else if (formData.exactAddress.length < 10) {
      newErrors.exactAddress =
        'La dirección exacta debe tener al menos 10 caracteres';
    }

    if (!formData.maxCapacity) {
      newErrors.maxCapacity = 'La capacidad máxima es requerida';
    } else if (
      isNaN(formData.maxCapacity) ||
      Number(formData.maxCapacity) <= 0
    ) {
      newErrors.maxCapacity =
        'La capacidad máxima debe ser un número válido mayor a 0';
    } else if (Number(formData.maxCapacity) > 255) {
      newErrors.maxCapacity = 'La capacidad máxima no debe ser mayor a 255';
    }

    if (!formData.numRooms) {
      newErrors.numRooms = 'El número de habitaciones es requerido';
    } else if (isNaN(formData.numRooms) || Number(formData.numRooms) <= 0) {
      newErrors.numRooms =
        'El número de habitaciones debe ser un número válido mayor a 0';
    } else if (Number(formData.numRooms) > 255) {
      newErrors.numRooms = 'El número de habitaciones no debe ser mayor a 255';
    }

    if (!formData.numBeds) {
      newErrors.numBeds = 'El número de camas es requerido';
    } else if (isNaN(formData.numBeds) || Number(formData.numBeds) <= 0) {
      newErrors.numBeds =
        'El número de camas debe ser un número válido mayor a 0';
    }

    if (!formData.numBathrooms) {
      newErrors.numBathrooms = 'El número de baños es requerido';
    } else if (
      isNaN(formData.numBathrooms) ||
      Number(formData.numBathrooms) <= 0
    ) {
      newErrors.numBathrooms =
        'El número de baños debe ser un número válido mayor a 0';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'La categoría es requerida';
    }

    if (formData.images.length < 5) {
      newErrors.images = 'Debe subir al menos 5 imágenes';
    } else if (formData.images.length > 6) {
      newErrors.images = 'No puede subir más de 6 imágenes';
    }

    if (formData.mainImage === null) {
      newErrors.images = 'Debe seleccionar una imagen principal';
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

    if (formData.images.length + files.length > 6) {
      const currentImages = formData.images.length;
      const remainingSlots = 6 - currentImages;
      const errorMessage = `Ya tiene ${currentImages} ${currentImages === 1 ? 'imagen' : 'imágenes'}. Solo puede agregar ${remainingSlots} ${remainingSlots === 1 ? 'imagen más' : 'imágenes más'} (máximo 6)`;
      setErrors(prev => ({
        ...prev,
        images: errorMessage,
      }));
      toast.warning(errorMessage);
      return;
    }

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
      images: [...prev.images, ...validFiles],
    }));

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = index => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => {
      let newMainImage = prev.mainImage;

      // Si la imagen eliminada era la principal
      if (prev.mainImage === index) {
        newMainImage = null;
      }
      // Si la imagen eliminada estaba antes que la principal, ajustar el índice
      else if (prev.mainImage > index) {
        newMainImage = prev.mainImage - 1;
      }

      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
        mainImage: newMainImage,
      };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setGlobalError('');
    setErrors({});

    if (!validateForm()) {
      toast.error(
        'Por favor, complete todos los campos requeridos correctamente'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();

      const propertyData = {
        name: formData.name,
        description: formData.description,
        pricePerNight: Number(formData.pricePerNight),
        cityId: formData.cityId,
        exactAddress: formData.exactAddress,
        maxCapacity: Number(formData.maxCapacity),
        numRooms: Number(formData.numRooms),
        numBeds: Number(formData.numBeds),
        numBathrooms: Number(formData.numBathrooms),
        ownerId: formData.ownerId,
        categoryId: Number(formData.categoryId),
      };

      formDataToSend.append('property', JSON.stringify(propertyData));
      formDataToSend.append('mainImage', formData.images[formData.mainImage]);

      formData.images.forEach((image, index) => {
        if (index !== formData.mainImage) {
          formDataToSend.append('images', image);
        }
      });

      const response = await fetch(
        'http://100.29.91.166:8080/roomly-services/api/v1/properties/new',
        {
          method: 'POST',
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.details && Array.isArray(data.details)) {
          const backendErrors = {};
          data.details.forEach(detail => {
            const [field, message] = detail.split(': ');
            backendErrors[field.toLowerCase()] = message;
          });
          setErrors(backendErrors);
          throw new Error(data.details.join('\n'));
        } else {
          throw new Error(data.message || 'Error al crear la propiedad');
        }
      }

      toast.success('Propiedad creada exitosamente');
      navigate('/administration/properties');
    } catch (err) {
      console.error('Error:', err);
      const errorMessage =
        err.message ||
        'Error al guardar la propiedad. Por favor, intente nuevamente.';
      setGlobalError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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

    if (formData.images.length + files.length > 6) {
      const currentImages = formData.images.length;
      const remainingSlots = 6 - currentImages;
      const errorMessage = `Ya tiene ${currentImages} ${currentImages === 1 ? 'imagen' : 'imágenes'}. Solo puede agregar ${remainingSlots} ${remainingSlots === 1 ? 'imagen más' : 'imágenes más'} (máximo 6)`;
      setErrors(prev => ({
        ...prev,
        images: errorMessage,
      }));
      toast.warning(errorMessage);
      return;
    }

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

    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const setMainImage = index => {
    setFormData(prev => ({
      ...prev,
      mainImage: index,
    }));
    toast.success('Imagen principal establecida');
  };

  return (
    <div className="min-h-screen">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <PropertyForm
            formData={formData}
            errors={errors}
            previews={previews}
            isSubmitting={isSubmitting}
            isLoadingCategories={isLoadingCategories}
            categories={categories}
            categoriesError={categoriesError}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            removeImage={removeImage}
            setMainImage={setMainImage}
            handleSubmit={handleSubmit}
            handleCancel={() => navigate(routes.administration)}
            submitButtonText="Guardar Producto"
            title="Crear Nueva Propiedad"
            countries={countries}
            isLoadingCountries={isLoadingCountries}
            countriesError={countriesError}
          />

          <PropertyPreview
            formData={formData}
            previews={previews}
            categories={categories}
            countries={countries}
          />
        </div>
      </div>
    </div>
  );
}
