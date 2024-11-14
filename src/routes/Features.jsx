import { useEffect, useState } from "react"
import ListFeature from "../Components/ListFeature"
import { useToast } from "../contexts/ToastContext";


const Features = () => {

  const [features, setFeatures] = useState([])
  const {success, error} = useToast();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getFeatures()
  }, [])

  const getFeatures = async() => {
    setLoading(true);
    try {

      const response = await fetch('http://100.29.91.166:8080/roomly-services/api/v1/features/all', {
        method: 'GET'
      });

      const data = await response.json();
      setFeatures(data);
    } catch (err) {
      console.error(err);
      error("No fue posible cargar el listado de caracteristicas")  
    } finally{
      setLoading(false);
    }
  }

  const handleDelete = async(featureId) => {
    await fetch(`http://100.29.91.166:8080/roomly-services/api/v1/features/delete/${featureId}`, {
      method: 'DELETE'
    }).catch(() => {
      error("No fue posible eliminar la caracteristica")
    }).then(() => {
      getFeatures();
      success("Caracteristica eliminada exitosamente")
    });
  }

  return (
    <div>
      {loading &&
        <div className="fixed top-1/4 left-1/2 flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      }
        <ListFeature features={features} onDeleteFeature={handleDelete}/>

    </div>
  )
}

export default Features