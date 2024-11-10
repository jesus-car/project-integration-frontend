import {useAuthContext} from "../contexts/AuthContext.jsx";
import {useState} from "react";
import InputField from "../Components/InputField.jsx";
import Button from "../Components/Button.jsx";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes.js";


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const {login} = useAuthContext();



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEmailValid && isPasswordValid) {
            console.log('Formulario enviado:', { email, password });
            await login({ email, password });
            navigate(routes.home);
        } else {
            console.log('Por favor, complete los campos correctamente.');
        }
    };

    // Función para redirigir a la página de registro
    const handleGoToRegister = () => {
        navigate(routes.register);
    };

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            <div className="bg-cover bg-center flex justify-center items-center"
                 style={{backgroundImage: 'url(/images/login_bg.jpg)'}}>
                <img className="brightnes" src="/images/logo_primary_light.png" alt="roomly" width={150}/>
            </div>

            <div className="flex flex-col justify-center gap-10 p-16 lg:p-32">
                <h2 className="text-3xl text-center md:text-left font-bold text-primaryHover">¡Bienvenido!</h2>
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

                        minLength={6}
                    />

                </div>
                <div className="flex justify-between gap-14">
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
