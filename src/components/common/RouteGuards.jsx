import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";

export const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const RoleRoute = ({ allow = [] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return allow.includes(user.role) ? <Outlet /> : <Navigate to="/" replace />;
};
