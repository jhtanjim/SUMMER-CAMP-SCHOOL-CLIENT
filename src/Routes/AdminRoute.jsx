import { Navigate, useLocation } from "react-router";
import UseAdmin from "../Hooks/UseAdmin";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";




const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = UseAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56 mx-auto"></progress>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;