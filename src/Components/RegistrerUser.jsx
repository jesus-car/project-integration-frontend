import { useNavigate } from "react-router-dom"
import Button from "./Button"
import InputField from "./InputField"
import { useState } from "react";
import { useToast } from "../contexts/ToastContext";
import "../styles/registrerUser.css"

const RegistrerUser = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { success, error} = useToast();
    const [registerForm, setRegisterForm] = useState({
        firstName: "",
        lastName: "",
        identificationNumber: "",
        typeId: 1,
        phoneNumber: "",
        cityId: 1,
        email: "",
        password: ""
    })


    const [errorList, setErrorList] = useState({})

    const validateUser = (field, value) =>{
        
        switch(field){
            case "firstName":
            case "lastName":
                if (!/^[a-zA-Z\s]+$/.test(value) && value.trim()) return 'Solo letras y espacios.';
                break; 

            case "identificationNumber":
                if (!value.trim()) return 'El DNI es obligatorio.';
                if (!/^\d{8}$/.test(value)) return 'Debe tener 8 dígitos.';
                break; 
                
            case "phoneNumber":
                if (!/^\d{10}$/.test(value)) return 'Debe tener 10 dígitos.';
                break; 

            case "email":
                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
                    return 'Correo no válido.';
                  break;

            case "password":
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)){
                    return 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter';
                }
                if (value.length < 8) {
                    return "Debe tener al menos 8 caracteres.";
                  }  
                break;

              default:
                break;
        }


    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm({...registerForm, [name]: value})

        const messageError = validateUser(name, value);
        setErrorList({ ...errorList, [name]: messageError });
    }
    
    const handleCancel = () => {
        navigate("/login")
    }
    

    const handleSave = async() => {
        
       try {
            const response = await fetch(`http://100.29.91.166:8080/roomly-services/api/v1/auth/register`, {
                method: "POST",
                body: JSON.stringify(registerForm),
                headers: {'Content-Type': 'application/json' }
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            success("Registro de usuario exitoso");
            navigate('/administration/feature'); 
        } catch (err) {
            error("No fue posible crear el usuario")
            console.log(err);
        } finally{
            setLoading(false)
        } 
    }

    

    return (
        <>
        {loading &&
            <div className="fixed top-1/4 left-1/2 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        }
        <div className="container-user flex flex-row justify-center h-screen">
            <div className=" img-re bg-cover w-3/6 relative"
                 style={{backgroundImage: 'url(/images/login_bg.jpg)'}}>
                <img className=" img-ab absolute left-[35%] top-[40%]" src="/images/logo_primary_light.png" alt="roomly" width={150}/>
            </div>

            <div className=" container-form w-3/6 pt-16 pl-16 pr-16">
                <div>
                    <div className="flex flex-col gap-4">
                        <h2 className=" h2-res text-2xl text-center font-bold text-primaryHover">Registro de
                            usuario</h2>
                    </div>
                </div>
                <div className="flex flex-col gap-5 pt-3.5">
                    <InputField 
                        label="Nombre"
                        name="firstName"
                        type="name"
                        placeholder="Ingresa tu nombre"
                        onChange={(e) => handleChange(e)}
                        value={registerForm.firstName}
                        required
                    />
                    {errorList["firstName"] && <p style={{ color: 'red' }}>{errorList["firstName"]}</p>}


                    <InputField
                        label="Apellido"
                        name="lastName"
                        type="lastName"
                        placeholder="Ingresa tu apellido"
                        onChange={(e) => handleChange(e)}
                        value={registerForm.lastName}
                        required
                    />
                    {errorList["lastName"] && <p style={{ color: 'red' }}>{errorList["lastName"]}</p>}

                    <div style={{marginBottom: "15px"}}>
                        <label htmlFor="DNI" className="block text-gray-700 text-sm">DNI</label>
                        <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"name="" id="">

                            <option value="1">DNI</option>
                            
                        </select>
                    </div>
                    <div className="input-field">
            
                    <InputField
                        
                        label="Numero de documento"
                        name="identificationNumber"
                        type="number"
                        placeholder="Ingresa tu número de documento"
                        onChange={(e) => handleChange(e)}
                        value={registerForm.identificationNumber}
                        required
                        
                    />
                    {errorList["identificationNumber"] && <p style={{ color: 'red', fontSize: "12px"}}>{errorList["identificationNumber"]}</p>}

                    </div>
                    <div className="input-field">

                    <InputField
                        
                        label="Numero de teléfono"
                        name="phoneNumber"
                        type="number"
                        placeholder="Ingresa tu número de teléfono"
                        onChange={(e) => handleChange(e)}
                        value={registerForm.phoneNumber}
                        required
                    />
                    {errorList["phoneNumber"] && <p style={{ color: 'red', fontSize: "12px"}}>{errorList["phoneNumber"]}</p>}
                    </div>

                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Ingresa tu email"
                        onChange={(e) => handleChange(e)}
                        value={registerForm.email}
                        required
                    />
                
                    <div className="input-field">
                    <InputField
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={registerForm.password}
                        onChange={(e) => handleChange(e)}
                                            />
                    {errorList["password"] && <p style={{ color: 'red', paddingBottom: "0px", fontSize: "12px"}}>{errorList["password"]}</p>}

                    </div>
                    
                </div>
                <div className="btn-res gao-x-4 pt-8 pb-10"  style={{width: "10em", display: "grid", gridTemplateColumns: "10em 10em", columnGap: "1em"}}>
                    <Button type="primary"
                        disabled={Object.values(errorList).some((error) => error || loading)}
                        label="Registrarse" onClick={handleSave}/>
                    <Button type="secondary" label="Volver" onClick={handleCancel} />
                </div>
                    
            
            </div>
        </div>
        </>
    )
}

export default RegistrerUser