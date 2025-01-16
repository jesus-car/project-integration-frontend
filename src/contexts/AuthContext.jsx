import {createContext, useContext, useEffect, useState} from 'react'
import {authService} from "../services/authService.js";
import {useNavigate} from "react-router-dom";
import {routes} from "../utils/routes.js";
import {decodeJWT, isTokenExpired} from "../utils/utils.js";
import {roleService} from "../services/roleService.js";
import { favoriteService } from '../services/favoriteService.js';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState('');
    const [favorites, setFavorites] = useState([]);

    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    const clearError = () => setError('');

    // Al inicializar la aplicación, verifica si hay un token válido en localStorage y carga el usuario si existe.
    useEffect(() => {
        const storedToken = localStorage.getItem('token');


        if (storedToken && !isTokenExpired(storedToken)) {
            const decodedUser = decodeJWT(storedToken);
            // validar si el token ya expiró
            setUser(decodedUser);
        }
        fetchRoles();
    }, []);

    useEffect(() => {
        if(user){
            fetchFavorites();
        }

    }, [user])

    const fetchFavorites = async () => {
        try {
            const response = await favoriteService.getFavoritesByUser();
            setFavorites(response.data);
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    const refreshFavorites = async() => {
        await fetchFavorites();
    }

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
        clearError();
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
        <AuthContext.Provider value={{user, roles, error, favorites, refreshFavorites, clearError, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);
