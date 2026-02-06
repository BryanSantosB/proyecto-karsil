// components/routing/RouteGuard.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";

const RouteGuard = ({ route, children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (route.protected && !user) {
    return <Navigate to="/login" />;
  }

  if (route.roles && !route.roles.some((r) => user.roles.includes(r))) {
    return <Navigate to="/" />;
  }

  if (
    route.permissions &&
    !route.permissions.every((p) => user.permissions.includes(p))
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RouteGuard;
