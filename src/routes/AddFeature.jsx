import { GiCctvCamera } from "react-icons/gi";
import { FaCarSide, FaTv } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa6";
import { FaComputer } from "react-icons/fa6";
import { FaKitchenSet } from "react-icons/fa6";
import { FaPaw } from "react-icons/fa";
import { FaWaterLadder } from "react-icons/fa6";
import { TbAirConditioning, TbTreadmill } from "react-icons/tb";
import { TbPawOff } from "react-icons/tb";
import { Select, MenuItem } from "@mui/material";
import "../styles/addFeature.css"
import { useState } from "react";
import { features } from "../utils/fakeData";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import { PiSwimmingPoolFill } from "react-icons/pi";



const AddFeature = () => {
    const [newname, setnewname] = useState("");
    const [newicon, setnewicon] = useState("");
    const navigate = useNavigate();
    const { success, error } = useToast();
    const [loading, setLoading] = useState(false)


    const handleChangeName = (e) =>{
        let value = e.currentTarget.value;
        setnewname(value);
    }

    const handleChangeIcon = (e) =>{
        let value = e.target.value;
        setnewicon(value);
    }

    const saveNewFeature = async() =>{
        let newfeature = {
            name: newname,
            iconName: newicon,
            description: ""
        };
        setLoading(true);
        try {
            const response = await fetch("http://100.29.91.166:8080/roomly-services/api/v1/features/new", {
                method: "POST",
                body: JSON.stringify(newfeature),
                headers: {'Content-Type': 'application/json' }
            });
            
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            success("Caracteristica agregada exitosamente");
            navigate('/administration/feature'); 
        } catch (err) {
            error("No fue posible crear la caracteristica")
            console.log(err);
        }finally{
            setLoading(false)
        }
    
    }



   
  return (
    <div>
        {loading &&
            <div className="fixed top-1/4 left-1/2 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        }
        <div className="lg:col-span-3 lg:px-6">
            <div className="bg-white rounded-xl shadow-lg h-full border border-gray-100 pt-10 pl-16 pb-14">
                <h2 className="text-xl font-semibold text-gray-700">
                    Agregar Caracteristicas
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    Complete todos los campos requeridos (*)
                </p>
                <div className="flex gap-x-12 mt-11">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre*
                    </label>
                    <input
                    value={newname}
                    onChange={handleChangeName}
                    type="text"
                    name="name"
                    className= "shadow appearance-none border rounded w-4/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-9"
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Icono*
                    </label>
                    <Select value={newicon} onChange={handleChangeIcon} className="w-24 h-9">
                        <MenuItem value={"GiCctvCamera"}>
                        <GiCctvCamera/> 
                        </MenuItem>

                        <MenuItem value={"FaWifi"}>
                        <FaWifi/> 
                        </MenuItem>

                        <MenuItem value={"FaCarSide"}>
                        <FaCarSide/> 
                        </MenuItem>

                        <MenuItem value={"FaTv"}>
                        <FaTv /> 
                        </MenuItem>

                        <MenuItem value={"FaComputer"}>
                        <FaComputer/>
                        </MenuItem>

                        <MenuItem value={"FaPaw"}>
                        <FaPaw />
                        </MenuItem>

                        <MenuItem value={"FaKitchenSet"}>
                        <FaKitchenSet />
                        </MenuItem>

                        <MenuItem value={"FaWaterLadder"}>
                        <FaWaterLadder />
                        </MenuItem>

                        <MenuItem value={"TbTreadmill"}>
                        <TbTreadmill />
                        </MenuItem>

                        <MenuItem value={"TbPawOff"}>
                        <TbPawOff />
                        </MenuItem>

                        <MenuItem value={"TbAirConditioning"}>
                        <TbAirConditioning />
                        </MenuItem>

                        <MenuItem value={"PiSwimmingPoolFill"}>
                        <PiSwimmingPoolFill />
                        </MenuItem>
                        
                    </Select>                    
                </div>
                <div>
                    <button
                        type="submit"
                        onClick={saveNewFeature} 
                        className="bg-blue-500 text-white font-bold rounded-lg w-24 h-10 mt-12" 
                        >
                            Guardar
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/administration/feature")}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 mx-8"
                    >
                        Cancelar
                    </button>
                </div>
                
            </div>
        </div>
        
    </div>
  )
}

export default AddFeature