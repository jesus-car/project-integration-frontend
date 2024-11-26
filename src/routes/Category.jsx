import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { features } from "../utils/fakeData";
import { getAllCategories } from "../services/categoryService";

const Category = () => {
    const navigate = useNavigate(); 
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [currentDelete, setCurrentDelete] = useState();
    const [categories, setCategories] = useState();

    
    useEffect(() => {
        fetchCategories();
    }, [])

    const fetchCategories = async() =>{
       let result = await getAllCategories();
       setCategories(result);
    }
    const onDelete = () => {
        if(currentDelete){
            /* onDeleteFeature(currentDelete); */
            setShowDeleteModal(false);
        }
    }

    const DeleteConfirmationModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold mb-4">Confirmar eliminación</h3>
            <p className="mb-6">
            ¿Estás seguro de que deseas eliminar ?  Esta categoría esta asociada a varias porpiedades.
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
            <h1 className="text-3xl font-bold mb-6">Categorías</h1>
            <table className="min-w-full bg-white">
                
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                        onClick={() => {setShowDeleteModal(true); setCurrentDelete(category.id)}}
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

export default Category