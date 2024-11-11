import { GiCctvCamera } from "react-icons/gi";
import { FaCarSide } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa6";
import { Select, MenuItem } from "@mui/material";

const EditFeature = () => {
  return (
    <div>
        <div className="lg:col-span-3 lg:px-6">
            <div className="bg-white rounded-xl shadow-lg h-full border border-gray-100 pt-10 pl-16 pb-14">
                <h2 className="text-xl font-semibold text-gray-700">
                    Editar Caracteristicas
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    Complete todos los campos requeridos (*)
                </p>
                <div className="flex gap-x-12 mt-11">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre*
                    </label>
                    <input
                    type="text"
                    name="name"
                    className= "shadow appearance-none border rounded w-4/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-9"
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Icono*
                    </label>
                    <Select className="w-24 h-9">
                        <MenuItem value={"segurity"}>
                        <GiCctvCamera/> 
                        </MenuItem>

                        <MenuItem value={"wifi"}>
                        <FaWifi/> 
                        </MenuItem>

                        <MenuItem value={"estacionamiento"}>
                        <FaCarSide/> 
                        </MenuItem>
                    </Select>                    
                </div>
                <button type="submit" className="bg-blue-500 text-white font-bold rounded-lg w-24 h-10 mt-12">Guardar</button>
            </div>
        </div>
    </div>
  )
}

export default EditFeature