import { useEffect, useState } from "react"
import PropertyCard from "./PropertyCard"
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import WhatsApp from "./WhatsApp";


const Favorites = () => {
  const [listFav, setlistFav] = useState([]);
  const navigate = useNavigate();
  const authContext = useAuthContext();

  useEffect(() => {
    setlistFav(authContext.favorites);
  }, [authContext.favorites])

  return (
    <>
        {listFav.length == 0 ?  
        <div className="flex justify-center flex-col items-center gap-y-5" style={{height: "calc(100vh - 270px)"}}>
          <h2 className="text-2xl">Tu lista de favoritos esta vacía</h2>
          <button onClick={() => navigate("/home")} className="w-36 h-9 rounded-md text-base border-2 text-white"
            style={{ backgroundColor: "rgb(145 176 124)" }}
            >Volver al inicio</button>

        </div>
      : 
      <div className="mt-12 flex flex-col ml-2.5">
      <div>
        <div className="gap-y-8 flex flex-col ml-12">
          <FaArrowLeftLong onClick={() => navigate("/home")}  className="w-5 h-5 text-gray-700 cursor-pointer"/>
          <h2 className="text-3xl font-semibold">Mis favoritos</h2>
        </div>
      </div>
      <div className="mt-12 w-full flex flex-wrap gap-y-14 gap-x-16 pl-[60px]">
        {listFav.map((property, i) => 
          <div key={i} className="w-[300px]">
              <PropertyCard key={i} property={property} />
          </div>
          
        )}
      </div>
      </div>
    }
    <WhatsApp/>
      </>
        
  )
}

export default Favorites