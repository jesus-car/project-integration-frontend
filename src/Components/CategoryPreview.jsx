import { FaUpload } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CategoryPreview = ({
    handleSubmit,
    handleChange,
    handleChangeImg,
    handleRemoveImg,
    errorList,
    loading,
    values
}) => {
    const navigate = useNavigate();
  return (
    <div className="lg:col-span-3 lg:px-6">
        <div className="bg-white rounded-xl shadow-lg h-full border border-gray-100 pt-10 pl-16 pr-16 pb-14">
            <h2 className="text-xl font-semibold text-gray-700">
                Agregar categorías                </h2>
            <p className="text-gray-500 text-sm mt-1">
                Complete todos los campos requeridos (*)
            </p>
            <div className="grid grid-cols-2 gap-x-12 mt-11">
                <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre*
                </label>
                <input
                value={values.title}
                onChange={handleChange}
                type="text"
                name="title"
                className= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-9"
                />
                {errorList["title"] && <p style={{ color: 'red' }}>{errorList["title"]}</p>}
                </div>
                <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Descripción*
                </label>
                <textarea
                    value={values.description}
                    onChange={handleChange}
                    name="description"
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-20 focus:outline-none focus:shadow-outline`}
                />
                {errorList["description"] && <p style={{ color: 'red' }}>{errorList["description"]}</p>}
                </div>
            </div>
            <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Imagen
            </label>
                <div
                    className="w-80 mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md transition-colors duration-200"
                >
                    <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex justify-center text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Subir archivo</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChangeImg}
                            className="sr-only"
                        />
                        </label>
                    </div>
                    <p className="text-xs text-gray-500">
                        PNG, JPG, GIF hasta 5MB
                    </p>
                    </div>
                    {(values.image || values.imageUrl) && (
                    <div className="mt-4 ml-4 gap-4">
                        <div  className="relative group">
                        <img
                            src={values.image ? URL.createObjectURL(values.image) : values.imageUrl}
                            alt={"img"}
                            className={`h-24 w-full object-cover rounded-lg`}
                        />
                        <div className="absolute top-1 right-1 flex gap-1">
                    
                            <button
                            type="button"
                            onClick={handleRemoveImg}
                            className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                            <FaTimes size={12} />
                            </button>
                        </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
            <div>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    disabled={Object.values(errorList).some((error) => error || loading)}
                    className="bg-blue-500 text-white font-bold rounded-lg w-24 h-10 mt-12" 
                    >
                        Guardar
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/administration/category")}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 mx-8"
                >
                    Cancelar
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default CategoryPreview