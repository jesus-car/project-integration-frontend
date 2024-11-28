import { useEffect, useState } from "react"
import CategoryPreview from "../Components/CategoryPreview";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { categoryService } from "../services/categoryService";



export const EditCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { success, error } = useToast();
    const [loading, setLoading] = useState(false)
    const [errorList, setErrorList] = useState({})

    const [categoryForm, setCategoryForm] = useState({
        id: 0,
        title: "",
        description: "",
        imageUrl: null
    })

    useEffect(() => {
        getCategory()
    }, [id])
    const getCategory = async() => {
        
        const response = await categoryService.getCategoryById(id);
        setCategoryForm({
            description: response.description,
            id: response.id,
            title: response.name,
            imageUrl: response.imageUrl
        });
    }

    const handleChangeImg = (e) =>{
        const file = e.target.files[0];
        setCategoryForm({...categoryForm, image: file})

        console.log(file);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryForm({...categoryForm, [name]: value})

        const messageError = validate(name, value);
        setErrorList({ ...errorList, [name]: messageError });
    }

    const validate = (field, value) =>{
        switch(field){
            case "title":
            case "description":
                if (value.length <= 0) return 'El campo es requerido';
                break; 
            default:
                break;
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
    
        try {
          const formDataToSend = new FormData();
    
          const categoryData = {
            title: categoryForm.title,
            description: categoryForm.description
          };
    
          formDataToSend.append("categoryDTOInput", JSON.stringify(categoryData));
          formDataToSend.append("image", categoryForm.image ?? "");
          console.log(formDataToSend)


          
          await categoryService.editCategory(categoryForm.id, formDataToSend)
    
          success('Categoria actualizada exitosamente');
          navigate('/administration/category');
        } catch (err) {
          console.error('Error:', err);
          const errorMessage =
            err.message ||
            'Error al actualizar la categoria. Por favor, intente nuevamente.';
          error(errorMessage);
        } finally {
          setLoading(false);
        }
    };
 
  return (
    <div>
        {loading &&
            <div className="fixed top-1/4 left-1/2 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        }
      <CategoryPreview 
            errorList={errorList}
            handleChange={handleChange}
            handleChangeImg={handleChangeImg}
            handleRemoveImg={() => setCategoryForm({...categoryForm, imageUrl: null, image: null})}
            handleSubmit={handleSubmit}
            loading={loading}
            values={categoryForm ?? {}}
        />
        
    </div>
  )
}
