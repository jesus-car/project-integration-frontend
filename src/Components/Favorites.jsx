import { useEffect, useState } from "react"
import { properties } from "../utils/fakeData"
import PropertyCard from "./PropertyCard"
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";


const Favorites = () => {
  const [listFav, setlistFav] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setlistFav(properties);
  }, [])

  return (
    <div className="mt-12 flex flex-col">
      <div className="gap-y-8 flex flex-col ml-12">
        <FaArrowLeftLong onClick={() => navigate("/home")}  className="w-5 h-5 text-gray-700 cursor-pointer"/>
        <h2 className="text-3xl font-semibold">Mis favoritos</h2>
      </div>

      <div className="mt-12 w-full flex flex-wrap gap-y-14 gap-x-16 ml-[60px]">
        {listFav.map((property, i) => 
          <div key={i} className="w-[300px]">
              <PropertyCard key={i} property={property} />
          </div>
          
        )}
      </div>
        
    </div>
  )
}

export default Favorites