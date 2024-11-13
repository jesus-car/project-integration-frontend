import * as FaContainer from "react-icons/fa6";
import * as GiContainer from "react-icons/gi";
import * as TbContainer from "react-icons/tb";
import * as PiContainer from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { features } from "../utils/fakeData";
import { useToast } from "../contexts/ToastContext";


export const GetIcon = (name) => {
    let content = name.substring(0, 2)
    let ResultContent = <></>;
    
    switch (content) {
        case "Gi":
            ResultContent = GiContainer[name];
            break;
        case "Tb":
            ResultContent = TbContainer[name];
            break;
        case "Pi":
            ResultContent = PiContainer[name];
            break;
        case "Fa":
            ResultContent = FaContainer[name];
            break;
    }
    return <ResultContent />
}

const ListFeature = () => {

    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [currentDelete, setCurrentDelete] = useState();
    const {success} = useToast();

    const handleEdit = (featureId) => {
        navigate(`/administration/edit-feature/${featureId}`);
    };

    
    const onDelete = () => {
        if(currentDelete){
            let featureIndex = features.findIndex(x => x.id == currentDelete);
            features.splice(featureIndex, 1);
            setShowDeleteModal(false);
            success("Caracteristica eliminada exitosamente")
        }
    }

    const DeleteConfirmationModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
            <p className="mb-6">
            ¿Estás seguro de que deseas eliminar ?  Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-4">
            <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
                Cancelar
            </button>
            <button
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Eliminar
            </button>
            </div>
        </div>
        </div>
    );
        

    return (
        <div>
            <div className="overflow-x-auto">
            <h1 className="text-3xl font-bold mb-6">Caracteristicas</h1>
                <table className="min-w-full bg-white">
                    
                <thead className="bg-gray-50">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Icono
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {features.map((feature) => (
                    <tr key={feature.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                            {GetIcon(feature.icon)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{feature.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                            onClick={() => handleEdit(feature.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => {setShowDeleteModal(true); setCurrentDelete(feature.id)}}
                            className="text-red-600 hover:text-red-900"
                        >
                            Eliminar
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
        </div>
        {showDeleteModal && <DeleteConfirmationModal/>}
        </div>
    )
}

export default ListFeature