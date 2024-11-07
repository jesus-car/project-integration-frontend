import {useNavigate} from "react-router-dom"
import {formatCurrency} from "../utils/utils.js";

const PropertyCard = ({property}) => {


    const navigate = useNavigate();

    const goToPropertyDetails = () => {
        navigate(`/properties/${property.id}`);
    }

    return (
        <div
            className="shadow-md grid grid-cols-1 md:flex-row items-center p-3 md:p-5 gap-4 rounded-lg cursor-pointer hover:shadow-primary hover:shadow-md transition duration-300"
            onClick={() => goToPropertyDetails()}>
            <div className="relative aspect-square">
                <img className="rounded-lg w-full h-full object-cover" src={property.images[0]} alt={property.name}/>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-primaryHover font-semibold">
                     {formatCurrency(property.pricePerNight)} noche
                    </span>
                </div>
            </div>
            <div className="flex flex-col">
                <p className="font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">{property.city}, {property.country}</p>
                <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">{property.name}</p>
                <p className="mt-3 px-3 py-1 border border-primaryHover text-primaryHover rounded-full text-sm w-fit">{property.category}</p>
            </div>
        </div>
    )
}

export default PropertyCard
