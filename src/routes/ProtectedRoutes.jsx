import {Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from "../contexts/AuthContext.jsx";

const ProtectedRoutes = () => {
    const { user, loading } = useAuthContext();

    if (loading) {
        return <div>Cargando...</div>; // Muestra un indicador mientras se carga la autenticación
    }

    return user ? <Outlet />: <Navigate to="/login" />; // Redirige si no está autenticado
};

export default ProtectedRoutes;
