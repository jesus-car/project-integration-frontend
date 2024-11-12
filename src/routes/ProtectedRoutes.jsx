// ProtectedRoutes.jsx
import {Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from "../contexts/AuthContext.jsx";

const ProtectedRoutes = ({ allowedRoles }) => {
    const { user } = useAuthContext();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/forbidden" />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
