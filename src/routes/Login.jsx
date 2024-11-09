import {useAuthContext} from "../contexts/AuthContext.jsx";
import React, {useState} from "react";
import InputField from "../Components/InputField.jsx";
import Button from "../Components/Button.jsx";
import {FaSearch} from "react-icons/fa";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuthContext();

    const handleLogin = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
            {/* Mitad izquierda - Imagen */}
            <div className="bg-cover bg-center flex justify-center items-center"
                 style={{backgroundImage: 'url(/images/login_bg.jpg)'}}>
                <img className="brightnes" src="/images/logo_primary_light.png" alt="roomly" width={150}/>
            </div>

            <div className="flex flex-col justify-center gap-10 p-16 lg:p-32">
                <h2 className="text-3xl text-center md:text-left font-bold text-primaryHover">¡Bienvenido!</h2>
                <div className="flex flex-col gap-5" onSubmit={handleLogin}>
                    <InputField
                        label="Email"
                        name="city"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Escribe tu email"
                        required
                    />
                    <InputField
                        label="Contraseña"
                        name="country"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Escribe tu contraseña"
                    />

                </div>
                <div className="flex justify-between gap-14">
                    <Button type="primary" label="Ingresar" onClick={handleLogin}/>
                    <Button type="secondary" label="Crear cuenta" onClick={handleLogin}/>
                </div>
            </div>
        </div>
    );

};

export default Login;
