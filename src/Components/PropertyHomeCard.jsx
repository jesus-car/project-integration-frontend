import { useNavigate } from "react-router-dom"

const PropertyHomeCard = ({ property }) => {


  const navigate = useNavigate();

  const goToPropertyDetails = () => {
    navigate(`/properties/${property.id}`);
  }

  return (
    <div className="shadow-primary shadow-sm flex text-center items-center p-3 md:p-5 gap-4 rounded-lg flex-col md:flex-row md:text-left cursor-pointer hover:shadow-primary hover:shadow-md transition duration-300"
      onClick={() => goToPropertyDetails()}>
      <img className="rounded-lg lg:w-52 md:w-40 w-36" src={property.image} alt={property.name} />
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
