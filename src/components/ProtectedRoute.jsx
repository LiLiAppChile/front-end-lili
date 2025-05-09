import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, userData, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userData?.role)) {
    const defaultRoutes = {
      admin: '/admin/home',
      professional: '/home',
      client: '/client/home'
    };
    return <Navigate to={defaultRoutes[userData?.role] || '/login'} replace />;
  }

  return children;
};

export default ProtectedRoute;