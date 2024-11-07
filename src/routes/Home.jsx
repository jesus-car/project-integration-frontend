import { useEffect, useState } from 'react';
import PropertyCard from '../Components/PropertyCard.jsx';
import { propertyService } from '../services/propertyService';
import Searcher from '../Components/Searcher';
import CategoryHomeCard from '../Components/CategoryHomeCard';
import Spinner from '../Components/Spinner';
import { choiceRandomNFromList } from '../utils/utils';

const Home = () => {
  const [loadingProperties, setLoadingProperties] = useState(true);

  const [properties, setProperties] = useState([]);

  const [recommendedProperties, setRecommendedProperties] = useState([]);

  const categories = [
    {
      name: 'Playa',
      img: 'https://a0.muscache.com/im/pictures/miso/Hosting-13590317/original/4156c16a-850d-4266-81a5-d8a84effe5f8.jpeg?im_w=720',
    },
    {
      name: 'Montaña',
      img: 'https://a0.muscache.com/im/pictures/miso/Hosting-899107319521368227/original/597eefed-5e88-4b41-9d05-85793e765936.jpeg?im_w=720',
    },
    {
      name: 'Campo',
      img: 'https://a0.muscache.com/im/pictures/miso/Hosting-1969781/original/c7cdcddb-438a-4224-871d-6431c72cceb3.jpeg?im_w=720',
    },
    {
      name: 'Ciudad',
      img: 'https://a0.muscache.com/im/ml/photo_enhancement/pictures/hosting/Hosting-818365624854945234/original/284b081e-4487-4f15-9d00-97b35fdcbadd.jpeg?im_w=720',
    },
  ];

  useEffect(() => {
    propertyService
      .getFilteredProperties(10)
      .then(properties => {
        setProperties(properties);
        setRecommendedProperties(choiceRandomNFromList(properties, 2));
        setTimeout(() => {
          setLoadingProperties(false);
        }, 1000);
      })
      .catch(error => {
        console.error('Error en Home:', error);
        setLoadingProperties(false);
        setTimeout(() => {
          setLoadingProperties(false);
        }, 2000);
      });
  }, []);

  return (
    <div className="lg:mx-24 md:mx-14 mx-10">
      <div className="mt-5">
        <Searcher />
        
      </div>

      <section>
        <div className="py-5">
          <p className="font-semibold text-2xl mb-2">
            Conoce nuestras casas y fincas vacacionales
          </p>
          <p>Planea tu alojamiento perfecto</p>
        </div>
        {loadingProperties ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="py-5">
          <p className="font-semibold text-2xl mb-2">
            Conoce nuestras categorías
          </p>
          <p>Escoge tu tipo de alojamiento ideal</p>
        </div>

        {loadingProperties ? (
          <Spinner />
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              <div className="h-auto bg-primary rounded-lg p-5 flex flex-col justify-center gap-10">
                <p className="text-4xl font-semibold">
                  Los mejores alojamientos
                </p>
                <p>
                  Sabemos que cada persona es diferente, por eso te ofrecemos
                  una amplia variedad de alojamientos para que puedas escoger el
                  que más se adapte a tus necesidades.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {categories.map(category => (
                  <CategoryHomeCard
                    key={category.name}
                    img={category.img}
                    category={category.name}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="py-5">
          <p className="font-semibold text-2xl mb-2">Nuestros recomendados</p>
          <p>Te presentamos nuestras mejores opciones</p>
        </div>

        {loadingProperties ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {recommendedProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
