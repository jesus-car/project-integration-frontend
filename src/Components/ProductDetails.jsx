import { FaArrowLeftLong } from 'react-icons/fa6';
import { TfiLayoutGrid2Alt } from 'react-icons/tfi';
import { FaStar } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import Spinner from './Spinner';
import '../styles/productDetail.css';
import { GetIcon } from './ListFeature';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { IoPeopleOutline, IoBedOutline } from 'react-icons/io5';
import { MdOutlineBedroomParent } from 'react-icons/md';
import { LuBath } from 'react-icons/lu';
import ImageSlider from './ImageSlider';
import { formatPrice } from '../utils/formatters';

const defaultIcon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const getCoordinates = async (address, city, country) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const searchQuery = `${address}, ${city}, ${country}`;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
      {
        headers: {
          'Accept-Language': 'es',
          'User-Agent': 'TuAplicacion/1.0'
        }
      }
    );
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon)
      };
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const cityResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        `${city}, ${country}`
      )}`,
      {
        headers: {
          'Accept-Language': 'es',
          'User-Agent': 'TuAplicacion/1.0'
        }
      }
    );
    const cityData = await cityResponse.json();
    
    if (cityData && cityData.length > 0) {
      return {
        lat: parseFloat(cityData[0].lat),
        lng: parseFloat(cityData[0].lon)
      };
    }
    
    throw new Error('No se encontraron coordenadas');
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};

const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState(null);
  const [mapLoading, setMapLoading] = useState(true);
  const [totalNights, setTotalNights] = useState(0);
  const [totalCost, setTotalCost] = useState({
    nights: 0,
    cleaning: 50,
    total: 0
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenImg = () => setOpenImg(true);
  const handleCloseImg = () => setOpenImg(false);

  useEffect(() => {
    propertyService.getPropertyById(id).then(property => {
      setDetail(property);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, [id]);

  useEffect(() => {
    if (detail) {
      setMapLoading(true);
      getCoordinates(
        detail.exactAddress,
        detail.city.name,
        detail.city.country.name
      ).then(coords => {
        if (coords) {
          setCoordinates(coords);
        }
        setMapLoading(false);
      });
    }
  }, [detail]);

  if (loading || !detail) return <Spinner />;

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const calculateCosts = (checkInDate, checkOutDate) => {
    if (checkInDate && checkOutDate) {
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      if (nights > 0) {
        const costPerNight = detail.pricePerNight * nights;
        setTotalNights(nights);
        setTotalCost({
          nights: costPerNight,
          cleaning: 50,
          total: costPerNight + 50
        });
      }
    }
  };

  const handleCheckInChange = (date) => {
    setCheckIn(date);
    calculateCosts(date, checkOut);
  };

  const handleCheckOutChange = (date) => {
    setCheckOut(date);
    calculateCosts(checkIn, date);
  };

  return (
<div className="mx-auto xs:px-4 sm:px-12 lg:px-14 xl:px-16 2xl:px-32 flex align-center flex-col container-detail">

      <div className="relative">
        <div className="flex justify-between items-center py-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-gray-900">{detail.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaStar className="w-4 h-4 text-[#91b07c]" />
              <span>4.9</span>
              <span>·</span>
              <span className="underline">{detail.city.name}, {detail.city.country.name}</span>
            </div>
          </div>
          <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <FaArrowLeftLong onClick={() => navigate(-1)} className="w-5 h-5 text-gray-700"/>
          </button>
        </div>

        <div className="detail-img mt-2 gap-x-2 gap-y-2">
          <div className="grid grid-cols-2 gap-4">
            <img
              className="col-span-2 w-full object-cover rounded-lg h-96 img-prin cursor-pointer"
              src={detail.mainPhotoUrl}
              alt="Principal"
              onClick={handleOpenImg}
            />
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            {detail.photoUrls.slice(0, 4).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Secondary ${index + 1}`}
                className="w-96 object-cover rounded-lg h-[188px] img-secun cursor-pointer"
                onClick={handleOpenImg}
              />
            ))}
            <div
              onClick={handleOpenImg}
              className="more-img cursor-pointer bg-white w-44 h-8 flex flex-row items-center rounded-md gap-x-4 pl-8 justify-self-end absolute bottom-5 mr-5"
            >
              <TfiLayoutGrid2Alt />
              <button>Más fotos</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 mt-8">
        <div className="w-full lg:w-[60%] xl:w-[2/3]">
          <div className="flex items-center justify-between py-6 border-b">
            <div className="flex items-center gap-4">
              {detail.owner.photoUrl ? (
                <img
                  src={detail.owner.photoUrl}
                  alt="Host"
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#91b07c] flex items-center justify-center text-white font-semibold">
                  {getInitials(detail.owner.firstName, detail.owner.lastName)}
                </div>
              )}
              <div>
                <p className="text-lg font-medium text-gray-900 xs:text-[1rem]">
                  Anfitrión: {detail.owner.firstName} {detail.owner.lastName}
                </p>
                <p className="text-sm text-gray-500">Miembro desde 2023</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 py-8 border-b xs:grid-cols-2">
            <div className="flex flex-col items-center text-center">
              <IoPeopleOutline className="w-6 h-6 sm:w-6 sm:h-6  text-gray-700 mb-2" />
              <p className="text-sm  font-medium text-gray-700">{detail.maxCapacity} huéspedes</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <MdOutlineBedroomParent className="w-6 h-6 sm:w-6 sm:h-6  text-gray-700 mb-2" />
              <p className="text-sm  font-medium text-gray-700">{detail.numRooms} dormitorios</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <IoBedOutline className="w-6 h-6 sm:w-6 sm:h-6  text-gray-700 mb-2" />
              <p className="text-sm  font-medium text-gray-700">{detail.numBeds} camas</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <LuBath className="w-6 h-6 sm:w-6 sm:h-6  text-gray-700 mb-2" />
              <p className="text-sm  font-medium text-gray-700">{detail.numBathrooms} baños</p>
            </div>
          </div>

          <div className="py-8 border-b">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Sobre este espacio</h3>
            <p className="text-gray-600 leading-relaxed">{detail.description}</p>
          </div>

          <div className="py-8 border-b">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Características que ofrece este lugar</h3>
            <div className="grid grid-cols-2 xs:grid-cols-1 gap-y-4 gap-x-8">
              {detail.features.map((feature, key) => (
                <div key={key} className="feature-item flex items-center gap-4 p-2">
                  <div className="feature-icon xs:w-8 xs:h-8">
                    {GetIcon(feature.iconName)}
                  </div>
                  <span className="text-gray-600 xs:text-sm">{feature.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="py-8 border-b">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ubicación</h3>
            <p className="text-gray-600 mb-4">
              {detail.exactAddress}, {detail.city.name}, {detail.city.country.name}
            </p>
            <div className="map-container shadow-sm">
              {mapLoading ? (
                <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
                  <Spinner />
                </div>
              ) : coordinates ? (
                <MapContainer
                  key={`${coordinates.lat}-${coordinates.lng}`}
                  center={[coordinates.lat, coordinates.lng]}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="h-[400px] rounded-lg"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[coordinates.lat, coordinates.lng]} icon={defaultIcon}>
                    <Popup>
                      {detail.exactAddress}
                      <br />
                      {detail.city.name}, {detail.city.country.name}
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
                  <p className="text-gray-500">No se pudo cargar el mapa</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className=" lg:w-[40%] xl:w-[1/3] mx-auto">
          <div className="sticky top-24 border rounded-xl shadow-lg p-6 bg-white">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-gray-900">
                  {formatPrice(detail.pricePerNight)}
                </span>
                <span className="text-gray-500 text-base">noche</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <FaStar className="text-[#91b07c] w-4 h-4" />
                <span className="font-medium">4.9</span>
              </div>
            </div>

            <div className="border rounded-xl">
              <div className="grid grid-cols-2 p-4">
                <div className="border-r">
                  <label className="block text-xs font-bold">LLEGADA</label>
                  <DatePicker
                    selected={checkIn}
                    onChange={handleCheckInChange}
                    className="w-full"
                    placeholderText="Añadir fecha"
                    minDate={new Date()}
                  />
                </div>
                <div className="pl-4">
                  <label className="block text-xs font-bold">SALIDA</label>
                  <DatePicker
                    selected={checkOut}
                    onChange={handleCheckOutChange}
                    className="w-full"
                    placeholderText="Añadir fecha"
                    minDate={checkIn || new Date()}
                  />
                </div>
              </div>

              <div className="border-t p-4">
                <label className="block text-xs font-bold">HUÉSPEDES</label>
                <select
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                  className="w-full mt-1 p-2"
                >
                  {[...Array(detail.maxCapacity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} huésped{i !== 0 ? 'es' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="w-full bg-[#91b07c] text-white py-3 rounded-lg mt-4 font-semibold">
              Reservar
            </button>

            <div className="mt-4">
              {totalNights > 0 && (
                <div className="flex justify-between py-2">
                  <span className="underline">
                    {formatPrice(detail.pricePerNight)} x {totalNights} noches
                  </span>
                  <span>{formatPrice(totalCost.nights)}</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="underline">Gastos de limpieza</span>
                <span>{formatPrice(totalCost.cleaning)}</span>
              </div>
              <div className="flex justify-between py-2 border-t mt-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{formatPrice(totalCost.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openImg && (
        <ImageSlider
          images={[detail.mainPhotoUrl, ...detail.photoUrls]}
          onClose={handleCloseImg}
        />
      )}
    </div>
  );
};

export default ProductDetails;
