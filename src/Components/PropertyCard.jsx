import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaBath, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { locationService } from '../services/locationService';
import { formatPrice } from '../utils/formatters';

const PropertyCard = ({ property }) => {
    const [countryName, setCountryName] = useState('');
    const [cityName, setCityName] = useState('');

    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const countryData = await locationService.getCountryById(property.countryId);
                setCountryName(countryData.name);
                const city = countryData.cities.find(c => c.id === property.cityId);
                if (city) {
                    setCityName(city.name);
                }
            } catch (error) {
                console.error('Error al obtener datos de ubicación:', error);
            }
        };

        fetchLocationData();
    }, [property.countryId, property.cityId]);

    return (
        <div className="h-full max-w-[400px] bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] 
                        hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 
                        overflow-hidden flex flex-col group">
            <Link to={`/properties/${property.id}`} className="h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                    <img 
                        src={property.mainPhotoUrl} 
                        alt={property.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
                        {formatPrice(property.pricePerNight)}
                    </div>
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                    <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                {property.name}
                            </h3>
                        </div>
                        
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                            <FaMapMarkerAlt className="text-primary mr-1" />
                            <span>{cityName && countryName ? `${cityName}, ${countryName}` : 'Cargando ubicación...'}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {property.description}
                        </p>
                    </div>

                    <div className="border-t pt-4">
                        <div className="grid grid-cols-3 gap-1 sm:gap-2 text-gray-600 text-sm">
                            <div className="flex items-center gap-1 justify-center bg-gray-50 p-1.5 sm:p-2 rounded-lg">
                                <FaBed className="text-primary" />
                                <span className="whitespace-nowrap text-xs sm:text-sm">{property.numRooms} hab.</span>
                            </div>
                            <div className="flex items-center gap-1 justify-center bg-gray-50 p-1.5 sm:p-2 rounded-lg">
                                <FaBath className="text-primary" />
                                <span className="whitespace-nowrap text-xs sm:text-sm">{property.numBathrooms} baños</span>
                            </div>
                            <div className="flex items-center gap-1 justify-center bg-gray-50 p-1.5 sm:p-2 rounded-lg">
                                <FaUsers className="text-primary" />
                                <span className="whitespace-nowrap text-xs sm:text-sm">Max. {property.maxCapacity}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PropertyCard;
