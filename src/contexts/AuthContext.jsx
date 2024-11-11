// todo: contexto para manejar el estado del usuario (si está autenticado, la información del usuario, token de autenticación, roles, etc.)

import {createContext, useContext, useEffect, useState} from 'react'
import {authService} from "../services/authService.js";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes.js";
import {decodeJWT} from "../utils/utils.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Para saber si los datos están cargando
    const navigate = useNavigate();

    const login = async (credentials) => {
        setError(null)
        try {

            const userData = await authService.login(credentials);

            const temporalToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlc3RlZmFuaWFhZ3Vhc0BnbWFpbC5jb20iLCJpYXQiOjE3MzEzNjU5OTMsImV4cCI6MTczMTM2OTIxOCwiaWQiOjEsImZpcnN0TmFtZSI6IkVzdGVmYW7DrWEiLCJsYXN0TmFtZSI6IkFndWFzIFPDoW5jaGV6Iiwicm9sZSI6IlJPTEVfQURNSU4ifQ.iCx2wa1FHolgY0tMhj0bYkonNuuI3Ha3oV_GCdrhgz8"

            localStorage.setItem('token', temporalToken);

            const userToken =  decodeJWT(temporalToken);
            console.log("userToken", userToken);

            localStorage.setItem('user', JSON.stringify(userToken)); // Guardamos el usuario en localStorage

            setUser(userToken);
            navigate(routes.home);

        } catch (err) {
            setError(err.message);
        }

    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Removemos el usuario de localStorage
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Recuperamos el usuario del localStorage
        }
        setLoading(false); // Terminamos de cargar los datos
    }, []);


    return (
        <AuthContext.Provider value={{user, error, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);
