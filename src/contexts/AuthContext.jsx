// todo: contexto para manejar el estado del usuario (si está autenticado, la información del usuario, token de autenticación, roles, etc.)

import {createContext, useContext, useEffect, useState} from 'react'
import {authService} from "../services/authService.js";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Para saber si los datos están cargando
    const navigate = useNavigate();

    const login = async (credentials) => {
        setError(null)
        try {

            const userData = await authService.login(credentials);
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            navigate(routes.home);


            const fakeUser = {
                token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlc3RlZmFuaWFhZ3Vhc0BnbWFpbC5jb20iLCJpYXQiOjE3MzEzNDUxOTEsImV4cCI6MTczMTMzNDYyOH0.rMY-VaVYdBj6YBHgWXZ9uTLzMNPdVGfqmPvvbR_t1vA'
            };
            //setUser(fakeUser);
            //localStorage.setItem('user', JSON.stringify(fakeUser));
            setError(null);
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
