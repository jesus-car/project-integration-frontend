import {useAuthContext} from "../contexts/AuthContext.jsx";
import {useEffect, useState} from "react";
import InputField from "../Components/InputField.jsx";
import Button from "../Components/Button.jsx";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes.js";
import {useToast} from "../contexts/ToastContext.jsx";


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const {login, error, clearError} = useAuthContext();
    const toast = useToast();

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearError();
        }
    }, [error, toast, clearError]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({email, password});
    };

    // Función para redirigir a la página de registro
    const handleGoToRegister = () => {
        navigate(routes.register);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            <div className="bg-cover bg-center flex justify-center items-center cursor-pointer"
                 onClick={() => navigate(routes.home)}
                 style={{backgroundImage: 'url(/images/login_bg.jpg)'}}>
                <img className="brightnes" src="/images/logo_primary_light.png" alt="roomly" width={150}/>
            </div>

            <div className="flex flex-col justify-center gap-14 p-12 lg:p-32">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl md:text-3xl text-center md:text-left font-bold text-primaryHover">Inicio de
                        sesión</h2>
                    <p className="md:text-lg text-center md:text-left">Ingresa con tu cuenta o crea una nueva</p>
                </div>

                <div className="flex flex-col gap-5">
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onValidChange={setIsEmailValid}
                        placeholder="Ingresa tu email"
                        required
                    />
                    <InputField
                        label="Contraseña"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onValidChange={setIsPasswordValid}
                        placeholder="Ingresa tu contraseña"
                        required
                        minLength={6}
                    />

                </div>
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-12">
                    <Button type="primary"
                            label="Ingresar"
                            onClick={handleSubmit}
                            disabled={!isEmailValid || !isPasswordValid}/>
                    <Button type="secondary" label="Crear cuenta" onClick={handleGoToRegister}/>
                </div>
            </div>
        </div>
    );

};

export default Login;
