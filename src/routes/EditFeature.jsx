import { GiCctvCamera } from "react-icons/gi";
import { FaCarSide } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa6";
import { FaComputer } from "react-icons/fa6";
import { FaKitchenSet } from "react-icons/fa6";
import { FaPaw } from "react-icons/fa";
import { FaWaterLadder } from "react-icons/fa6";
import { FaTv } from "react-icons/fa";
import { TbTreadmill } from "react-icons/tb";
import { TbPawOff } from "react-icons/tb";
import { Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { features } from "../utils/fakeData";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";

const EditFeature = () => {
    const [name, setname] = useState();
    const [icon, seticon] = useState("");
    const [currentFeature, setCurrentFeature] = useState();
    const { id } = useParams();
    const { success } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        let current = features.find(x => x.id == id);
        setCurrentFeature(current);
        setname(current.name);
        seticon(current.icon);
    }, [id])


    const handleChangeName = (e) =>{
        let value = e.currentTarget.value;
        setname(value);
    }

    const handleChangeIcon = (e) =>{
        let value = e.target.value;
        seticon(value);
    }

    const onSave = () => {
        let result = currentFeature;
        result.name = name;
        result.icon = icon;

        const index = features.findIndex(item => item.id.toString() === id);
        features[index].name = result.name;
        features[index].icon = result.icon;

        success("Caracteristica agregada exitosamente");
        navigate('/administration/feature');
    }

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
                    value={name}
                    onChange={handleChangeName}
                    type="text"
                    name="name"
                    className= "shadow appearance-none border rounded w-4/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-9"
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Icono*
                    </label>
                    <Select className="w-24 h-9" value={icon} onChange={handleChangeIcon}>
                        <MenuItem value="GiCctvCamera">
                        <GiCctvCamera/> 
                        </MenuItem>

                        <MenuItem value="FaWifi">
                        <FaWifi/> 
                        </MenuItem>

                        <MenuItem value="FaCarSide">
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

                    </Select>                    
                </div>
                <button type="submit" onClick={onSave} className="bg-blue-500 text-white font-bold rounded-lg w-24 h-10 mt-12">Guardar</button>
            </div>
        </div>
    </div>
  )
}

export default EditFeature