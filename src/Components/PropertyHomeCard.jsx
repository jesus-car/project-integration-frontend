import {useNavigate} from "react-router-dom"

const PropertyHomeCard = ({property}) => {


    const navigate = useNavigate();

    const goToPropertyDetails = () => {
        navigate(`/properties/${property.id}`);
    }

    return (
        <div
            className="shadow-md flex text-center items-center p-3 md:p-5 gap-4 rounded-lg flex-col md:flex-row md:text-left cursor-pointer hover:shadow-primary hover:shadow-md transition duration-300"
            onClick={() => goToPropertyDetails()}>
            <div className="w-36 h-36 md:w-40 md:h-40 lg:w-52 lg:h-52">
                <img className="rounded-lg w-full h-full object-cover" src={property.image} alt={property.name}/>
            </div>
            <div className="flex flex-col gap-5">
                <div>
                    <p className="font-semibold text-lg">{property.name}</p>
                    <p className="text-xs text-gray-500">{property.city}, {property.country}</p>
                </div>
                <p className="text-sm mt-2">{property.description}</p>
            </div>
        </div>
    )
}

export default PropertyHomeCard
