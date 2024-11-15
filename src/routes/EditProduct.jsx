import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../utils/routes';
import { FaUpload, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useToast } from '../contexts/ToastContext';
import { useProducts } from '../context/ProductContext';
import PropertyForm from '../Components/PropertyForm';
import PropertyPreview from '../Components/PropertyPreview';

export default function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
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
    featureIds: []
  });
  const [features, setfeatures] = useState([]);
  const [listFeatures, setListFeatures] = useState([])
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState('');
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

  const fetchProperty = async () => {
    try {
      const response = await fetch(
        `http://100.29.91.166:8080/roomly-services/api/v1/properties/${productId}`
      );
      if (!response.ok) {
        throw new Error('Error al cargar la propiedad');
      }
      const data = await response.json();

      setFormData({
        name: data.name,
        description: data.description,
        pricePerNight: data.pricePerNight,
        exactAddress: data.exactAddress,
        maxCapacity: data.maxCapacity,
        numRooms: data.numRooms,
        numBeds: data.numBeds,
        numBathrooms: data.numBathrooms,
        categoryId: data.category.id,
        cityId: data.city.id,
        countryId: data.city.country.id,
        ownerId: data.owner.id,
        images: [],
        mainImage: null,
        originalMainPhotoUrl: data.mainPhotoUrl,
        originalPhotoUrls: data.photoUrls || [],
        featureIds: data.features.map(f => f.id)
      });

      const allImages = [];

      if (data.mainPhotoUrl) {
        allImages.push(data.mainPhotoUrl);
      }
      if (data.photoUrls) {
        const otherImages = data.photoUrls.filter(
          url => url !== data.mainPhotoUrl
        );
        allImages.push(...otherImages);
      }

      setPreviews(allImages);
      
      if (data.mainPhotoUrl) {
        setFormData(prev => ({
          ...prev,
          mainImage: 0,
        }));
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al cargar la propiedad');
      navigate('/administration/properties');
    } finally {
      setIsLoading(false);
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

  
  const fetchFeatures = async() => {
    try {

      const response = await fetch('http://100.29.91.166:8080/roomly-services/api/v1/features/all', {
        method: 'GET'
      });

      const data = await response.json();
      setListFeatures(data);
    } catch (err) {
      console.error(err);
      toast.error("No fue posible cargar el listado de caracteristicas")  
    }
  }

  useEffect(() => {
    Promise.all([fetchCategories(), fetchCountries(), fetchProperty(), fetchFeatures()]);
  }, [productId]);

  if (isLoading || isLoadingCategories || isLoadingCountries) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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

    if (!formData.pricePerNight) {
      newErrors.pricePerNight = 'El precio es requerido';
    } else if (
      isNaN(formData.pricePerNight) ||
      Number(formData.pricePerNight) <= 0
    ) {
      newErrors.pricePerNight = 'El precio debe ser un número válido mayor a 0';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'La categoría es requerida';
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

  const handleImageChange = async e => {
    const files = Array.from(e.target.files);
    const currentImageCount = previews.length;
    const remainingSlots = 6 - currentImageCount;

    if (files.length > remainingSlots) {
      const errorMessage = `Ya tiene ${currentImageCount} ${
        currentImageCount === 1 ? 'imagen' : 'imágenes'
      }. Solo puede agregar ${remainingSlots} ${
        remainingSlots === 1 ? 'imagen más' : 'imágenes más'
      } (máximo 6)`;
      setErrors(prev => ({
        ...prev,
        images: errorMessage,
      }));
      toast.warning(errorMessage);
      // Limpiar el input de archivos
      e.target.value = '';
      return;
    }

    const validFiles = files.filter(file => {
      const isValid = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024;
      return isValid && isValidSize;
    });

    if (validFiles.length !== files.length) {
      const errorMessage = 'Algunos archivos no son válidos. Use imágenes de hasta 5MB';
      setErrors(prev => ({
        ...prev,
        images: errorMessage,
      }));
      toast.warning(errorMessage);
      // Limpiar el input de archivos
      e.target.value = '';
    } else {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...validFiles],
      }));

      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = index => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
    
    // Si el índice es menor que la cantidad de URLs originales, es una URL
    const isUrlImage = index < formData.originalPhotoUrls.length;
    
    if (isUrlImage) {
      // Remover de originalPhotoUrls
      setFormData(prev => ({
        ...prev,
        originalPhotoUrls: prev.originalPhotoUrls.filter((_, i) => i !== index)
      }));
    } else {
      // Remover de images (binarios)
      const binaryIndex = index - formData.originalPhotoUrls.length;
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== binaryIndex)
      }));
    }

    // Ajustar mainImage si es necesario
    if (formData.mainImage === index) {
      setFormData(prev => ({
        ...prev,
        mainImage: 0
      }));
    } else if (formData.mainImage > index) {
      setFormData(prev => ({
        ...prev,
        mainImage: prev.mainImage - 1
      }));
    }
  };

  const setMainImage = index => {
    setFormData(prev => ({
      ...prev,
      mainImage: index,
    }));
    toast.success('Imagen principal establecida');
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
    const currentImageCount = previews.length;
    const remainingSlots = 6 - currentImageCount;

    if (files.length > remainingSlots) {
      const errorMessage = `Ya tiene ${currentImageCount} ${
        currentImageCount === 1 ? 'imagen' : 'imágenes'
      }. Solo puede agregar ${remainingSlots} ${
        remainingSlots === 1 ? 'imagen más' : 'imágenes más'
      } (máximo 6)`;
      setErrors(prev => ({
        ...prev,
        images: errorMessage,
      }));
      toast.warning(errorMessage);
      return;
    }

    const validFiles = files.filter(file => {
      const isValid = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024;
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

  const handleFeaturesChange = (features) => {
    setFormData(prev => ({
      ...prev,
      featureIds: features.map((x) => x.id),
    }));
    setfeatures(features);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setGlobalError('');
    setErrors({});

    if (!validateForm()) {
      toast.error('Por favor, complete todos los campos requeridos correctamente');
      return;
    }

    // Validar el número total de imágenes
    if (previews.length < 5 || previews.length > 6) {
      const errorMessage = `Debe tener entre 5 y 6 imágenes. Actualmente tiene ${previews.length}`;
      setErrors(prev => ({
        ...prev,
        images: errorMessage,
      }));
      toast.error(errorMessage);
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
        featureIds: formData.featureIds
      };

      formDataToSend.append('property', JSON.stringify(propertyData));

      // Determinar si la imagen principal es una URL o un archivo binario
      const isMainImageUrl = formData.mainImage < formData.originalPhotoUrls.length;

      if (isMainImageUrl) {
        // Si es una URL existente
        const mainImageUrl = formData.originalPhotoUrls[formData.mainImage];
        formDataToSend.append('mainImageUrl', mainImageUrl);
      } else {
        // Si es un archivo binario nuevo
        const binaryIndex = formData.mainImage - formData.originalPhotoUrls.length;
        formDataToSend.append('mainImage', formData.images[binaryIndex]);
      }

      // Agregar las URLs restantes (excluyendo la principal)
      formData.originalPhotoUrls.forEach((url, index) => {
        if (index !== formData.mainImage) {
          formDataToSend.append('imageUrls', url);
        }
      });

      // Agregar los archivos binarios restantes (excluyendo el principal)
      formData.images.forEach((file, index) => {
        const absoluteIndex = index + formData.originalPhotoUrls.length;
        if (absoluteIndex !== formData.mainImage) {
          formDataToSend.append('images', file);
        }
      });

      const response = await fetch(
        `http://100.29.91.166:8080/roomly-services/api/v1/properties/${productId}`,
        {
          method: 'PUT',
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
          throw new Error(data.message || 'Error al actualizar la propiedad');
        }
      }

      toast.success('Propiedad actualizada exitosamente');
      navigate('/administration/properties');
    } catch (err) {
      console.error('Error:', err);
      const errorMessage =
        err.message ||
        'Error al actualizar la propiedad. Por favor, intente nuevamente.';
      setGlobalError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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
            handleCancel={() => navigate('/administration/properties')}
            submitButtonText="Guardar Cambios"
            title="Editar Propiedad"
            countries={countries}
            isLoadingCountries={isLoadingCountries}
            countriesError={countriesError}
            handleFeature={handleFeaturesChange}
            featureValue={features}
            featureList={listFeatures}
          />

          <PropertyPreview
            formData={formData}
            previews={previews}
            categories={categories}
            countries={countries}
            features={features}
          />
        </div>
      </div>
    </div>
  );
}
