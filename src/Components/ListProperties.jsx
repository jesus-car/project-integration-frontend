import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { propertyService } from '../services/propertyService';
import Spinner from './Spinner';


const ListProperties = () => {

    const [loadingProperties, setLoadingProperties] = useState(true);

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        propertyService.getRandomNProperties(3).then((properties) => {
            setProperties(properties);
            setTimeout(() => {
                setLoadingProperties(false);
            }, 1000);
        }).catch((error) => {
            console.error("Error:", error);
            setLoadingProperties(false);
            setTimeout(() => {
                setLoadingProperties(false);
            }, 1000);
        });
    }, []);


    const onEdit = (id) => {
        // Lógica para editar
        console.log(`Edit property with id: ${id}`);
    };

    const onDelete = (id) => {
        // Lógica para eliminar
        console.log(`Delete property with id: ${id}`);
    };

    return (
        <div className='h-screen'>
            <div className='mb-5'>
                <p className='text-2xl font-semibold mb-4'>Todas las propiedades</p>
                <p>Aquí podrás gestionar todas las propiedades del sistema</p>
            </div>
            {loadingProperties ? (
                <Spinner />
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold whitespace-nowrap">ID</th>
                                <th className="px-6 py-3 border-b text-left text-gray-700 font-semibold whitespace-nowrap">Nombre</th>
                                <th className="px-6 py-3 border-b text-center text-gray-700 font-semibold whitespace-nowrap">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b text-gray-600 whitespace-nowrap">{item.id}</td>
                                    <td className="px-6 py-4 border-b text-gray-600 whitespace-nowrap">{item.name}</td>
                                    <td className="px-6 py-4 border-b text-center whitespace-nowrap">
                                        <button
                                            className="text-teal-600 hover:text-teal-900 mx-2"
                                            onClick={() => onEdit(item.id)}
                                            aria-label="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="text-red-500 hover:text-red-700 mx-2"
                                            onClick={() => onDelete(item.id)}
                                            aria-label="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ListProperties
