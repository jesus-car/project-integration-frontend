// ProtectedRoutes.jsx
import {Navigate, Outlet, useNavigate} from 'react-router-dom';
import {useAuthContext} from "../contexts/AuthContext.jsx";
import Spinner from "../Components/Spinner.jsx";
import {useEffect} from "react";
import {isTokenExpired} from "../utils/utils.js";

const ProtectedRoutes = ({ allowedRoles }) => {
    const { user, loading, logout } = useAuthContext();

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Validar si el token ha expirado
        if (isTokenExpired(token)) {
            console.log('Token expirado');
            logout(); // Desloguea al usuario
            navigate('/login'); // Redirige a la página de login
        }
    }, [navigate]);

    if (loading) {
        return <Spinner/>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/forbidden" />;
    }

    return <Outlet />;
};
export default ProtectedRoutes;
