// ProtectedRoutes.jsx
import {Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from "../contexts/AuthContext.jsx";

const ProtectedRoutes = ({ requiredRole }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/forbidden" />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
