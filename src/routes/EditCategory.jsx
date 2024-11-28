import { useState } from "react"



export const EditCategory = () => {
    const [loading, setLoading] = useState(false)
    const [name, setname] = useState();
    const [description, setDescription] = useState();
    
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
                    Editar Categoría
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
                    
                    type="text"
                    name="name"
                    className= "shadow appearance-none border rounded w-4/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-9"
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Descripción*
                    </label> 
                    <input
                    value={description}
                    
                    type="text"
                    name="description"
                    className= "shadow appearance-none border rounded w-4/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-9"
                    />                   
                </div>
                <button type="submit" className="bg-blue-500 text-white font-bold rounded-lg w-24 h-10 mt-12">Guardar</button>
            </div>
        </div>
    </div>
  )
}
