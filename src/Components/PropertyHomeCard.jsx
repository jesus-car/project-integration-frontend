import {useNavigate} from "react-router-dom"

const PropertyHomeCard = ({property}) => {


    const navigate = useNavigate();

    const goToPropertyDetails = () => {
        navigate(`/properties/${property.id}`);
    }

    return (
        <div
            className="shadow-md grid grid-cols-1 md:grid-cols-2 md:flex-row items-center p-3 md:p-5 gap-4 rounded-lg cursor-pointer hover:shadow-primary hover:shadow-md transition duration-300"
            onClick={() => goToPropertyDetails()}>
            <div className="aspect-square">
                <img className="rounded-lg w-full h-full object-cover" src={property.images[0]} alt={property.name}/>
            </div>
            <div className="flex flex-col gap-3">
                <p className="font-semibold">{property.city}, {property.country}</p>
                <p>{property.name}</p>


            </div>
        </div>
    )
}

export default PropertyHomeCard
