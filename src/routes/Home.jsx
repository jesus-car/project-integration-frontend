import { useEffect, useState } from 'react';
import PropertyCard from '../Components/PropertyCard';
import { propertyService } from '../services/propertyService';
import CategoryHomeCard from '../Components/CategoryHomeCard';
import Spinner from '../Components/Spinner';
import HeroSection from '../Components/HeroSection';
import PropertyCardSkeleton from '../Components/PropertyCardSkeleton';
import CategorySkeletonCard from '../Components/CategorySkeletonCard';
import { getAllCategories } from '../services/categoryService';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [loadingProperties, setLoadingProperties] = useState(true);
  const [properties, setProperties] = useState({ content: [] });
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Array de imágenes de respaldo
  const fallbackImages = [
    'https://a0.muscache.com/im/pictures/miso/Hosting-13590317/original/4156c16a-850d-4266-81a5-d8a84effe5f8.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-899107319521368227/original/597eefed-5e88-4b41-9d05-85793e765936.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-1969781/original/c7cdcddb-438a-4224-871d-6431c72cceb3.jpeg?im_w=720',
    'https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-818365624854945234/original/284b081e-4487-4f15-9d00-97b35fdcbadd.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-13590317/original/4156c16a-850d-4266-81a5-d8a84effe5f8.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-899107319521368227/original/597eefed-5e88-4b41-9d05-85793e765936.jpeg?im_w=720',
  ];

  // Función para validar URL de imagen
  const isValidImageUrl = (url) => {
    if (!url) return false;
    
    // Validar si es una URL de S3
    if (url.includes('dh-integration-s3.s3.amazonaws.com')) {
      return true;
    }
    
    // Validar otros formatos de imagen para URLs genéricas
    return url.match(/(jpg|jpeg|png|webp|avif|gif|svg)/i);
  };

  // Función auxiliar para obtener elementos aleatorios de un array
  const getRandomItems = (array, count) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Obtener 8 propiedades para la sección principal
        const principalProperties = await propertyService.getFilteredProperties({}, 0, 12);
        console.log(principalProperties);
        setProperties(principalProperties);
        
        // Seleccionar 4 propiedades aleatorias para recomendados
        if (principalProperties.content && principalProperties.content.length > 0) {
          const randomProperties = principalProperties.content.slice(8, 12);
          setRecommendedProperties(randomProperties);
        }
      } catch (error) {
        console.error('Error en Home:', error);
      } finally {
        setTimeout(() => {
          setLoadingProperties(false);
        }, 1000);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        const processedCategories = categoriesData.slice(0, 6).map((category, index) => ({
          ...category,
          imageUrl: isValidImageUrl(category.imageUrl) ? category.imageUrl : fallbackImages[index]
        }));
        setCategories(processedCategories);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <HeroSection />
      <div className=" container mx-auto px-4 sm:px-16 lg:px-8 max-w-[1360px]">
        {/* Sección de Casas y Fincas */}
        <section className="mb-16">
          <div className="py-8">
            <h2 className="font-bold text-3xl md:text-4xl mb-3 text-gray-900">
              Conoce nuestras casas y fincas vacacionales
            </h2>
            <p className="text-lg text-gray-600">Planea tu alojamiento perfecto</p>
          </div>
          
          {loadingProperties ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="mx-auto justify-items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.content?.slice(0, 8).map(property => (
                <div key={property.id} className="transform transition duration-200 hover:scale-[1.02]">
                  <PropertyCard 
                    property={{
                      ...property,
                      images: [property.mainPhotoUrl, ...(property.photoUrls || [])],
                      price: property.pricePerNight,
                      title: property.name,
                      location: `ID Ciudad: ${property.cityId}`,
                      features: {
                        rooms: property.numRooms,
                        bathrooms: property.numBathrooms,
                        capacity: property.maxCapacity
                      }
                    }} 
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Sección de Categorías */}
        <section className="mb-16">
          <div className="py-8">
            <h2 className="font-bold text-3xl md:text-4xl mb-3 text-gray-900">
              Conoce nuestras categorías
            </h2>
            <p className="text-lg text-gray-600">Escoge tu tipo de alojamiento ideal</p>
          </div>

          {loadingCategories ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="h-auto bg-gray-200 rounded-lg animate-pulse p-8"></div>
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <CategorySkeletonCard key={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-8 flex flex-col justify-center gap-6 shadow-lg relative overflow-hidden h-full">
                {/* Elementos decorativos sutiles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full -ml-12 -mb-12 blur-lg"></div>
                
                {/* Contenido principal */}
                <div className="relative z-10">
              <div className='mb-[20px]'>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center mt-[-20px]">
                    Los mejores alojamientos para ti
                  </h3>
              </div>
                  
                  <div className="text-white/90 space-y-3">
                    <p className="flex items-start gap-2 text-base">
                      <span className="w-2 h-2 bg-white rounded-full mt-2"></span>
                      Sabemos que cada persona es diferente, por eso te ofrecemos
                      una amplia variedad de alojamientos.
                    </p>
                    <p className="flex items-start gap-2 text-base">
                      <span className="w-[7px] h-[8px] bg-white rounded-full mt-2"></span>
                      En la sección de filtros podrás seleccionar una o varias
                      categorías para encontrar tu lugar ideal.
                    </p>
                  </div>

                  {/* Botón más sutil */}
                  <button 
                    onClick={() => navigate('/properties')} 
                    className="mt-6 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 text-sm border border-white/20"
                  >
                    Ver todas las categorías
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map(category => (
                  <div key={category.id} className="transform transition duration-200 hover:scale-[1.03]">
                    <CategoryHomeCard
                      img={category.imageUrl}
                      category={category.name}
                      categoryId={category.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Sección de Recomendados */}
        <section className="mb-16">
          <div className="py-8 ">
            <h2 className="font-bold text-3xl md:text-4xl mb-3 text-gray-900">
              Nuestros recomendados
            </h2>
            <p className="text-lg text-gray-600">Te presentamos nuestras mejores opciones</p>
          </div>

          {loadingProperties ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedProperties.map(property => (
                <div key={property.id} className="transform transition duration-200 hover:scale-[1.02]">
                  <PropertyCard 
                    property={{
                      ...property,
                      images: [property.mainPhotoUrl, ...(property.photoUrls || [])],
                      price: property.pricePerNight,
                      title: property.name,
                      location: `ID Ciudad: ${property.cityId}`,
                      features: {
                        rooms: property.numRooms,
                        bathrooms: property.numBathrooms,
                        capacity: property.maxCapacity
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
