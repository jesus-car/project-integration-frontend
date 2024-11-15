import { useNavigate } from "react-router-dom"
import Button from "./Button"
import InputField from "./InputField"
import { useState } from "react";
import { useToast } from "../contexts/ToastContext";

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
        <div className="flex flex-col justify-center gap-14 p-12 lg:p-32">
            <h2 className="text-2xl md:text-3xl text-center md:text-left font-bold text-primaryHover">Registro de usuario</h2>
            <div className="w-3/4">
                <InputField 
                    label="Nombre"
                    name="name"
                    type="name"
                    placeholder="Ingresa tu nombre"
                    onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                    value={registerForm.firstName}
                    required
                />

                <InputField
                    label="Apellido"
                    name="lastName"
                    type="lastName"
                    placeholder="Ingresa tu apellido"
                    onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                    value={registerForm.lastName}
                    required
                />
                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="DNI" className="block text-gray-700 text-sm">DNI</label>
                    <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"name="" id="">
                    
                        <option value="1">DNI</option>
                        
                    </select>
                </div>
                

                <InputField
                    
                    label="Numero de documento"
                    name="numero de documento"
                    type="number"
                    placeholder="Ingresa tu número de documento"
                    value={registerForm.identificationNumber}
                    onChange={(e) => setRegisterForm({...registerForm, identificationNumber: e.target.value})}
                    required
                />

                <InputField
                    
                    label="Numero de teléfono"
                    name="numerodetelefono"
                    type="number"
                    placeholder="Ingresa tu número de teléfono"
                    value={registerForm.phoneNumber}
                    onChange={(e) => setRegisterForm({...registerForm, phoneNumber: e.target.value})}
                    required
                />

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Ingresa tu email"
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                    value={registerForm.email}
                    required
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                    required
                />
                <div className="gao-x-4"  style={{width: "10em", display: "grid", gridTemplateColumns: "10em 10em", columnGap: "1em"}}>
                    <Button type="primary"
                        label="Registrarse" onClick={handleSave}/>
                    <Button type="secondary" label="Volver" onClick={handleCancel} />
                    </div>
                </div>
            

        </div>
        </>
    )
}

export default RegistrerUser