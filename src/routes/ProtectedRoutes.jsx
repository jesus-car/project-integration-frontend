// ProtectedRoutes.jsx
import {Navigate, Outlet} from 'react-router-dom';
import {useAuthContext} from "../contexts/AuthContext.jsx";
import Spinner from "../Components/Spinner.jsx";

const ProtectedRoutes = ({ allowedRoles }) => {
    const { user, loading } = useAuthContext();

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
