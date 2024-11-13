// todo: contexto para manejar el estado del usuario (si está autenticado, la información del usuario, token de autenticación, roles, etc.)

import {createContext, useContext, useEffect, useState} from 'react'
import {authService} from "../services/authService.js";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes.js";
import {decodeJWT} from "../utils/utils.js";
import {roleService} from "../services/roleService.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Al inicializar la aplicación, verifica si hay un token válido en localStorage y carga el usuario si existe.
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedUser = decodeJWT(storedToken);
            setUser(decodedUser);
        }
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await roleService.getAllRoles();
            setRoles(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const login = async (credentials) => {
        setError(null)
        setLoading(true);
        try {

            const response = await authService.login(credentials);

            const token = response.data.token
            localStorage.setItem('token', token);

            const userToken =  decodeJWT(token);

            await setUser(userToken);
            navigate(routes.home);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate(routes.login);
    };


    return (
        <AuthContext.Provider value={{user, roles, error, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);
