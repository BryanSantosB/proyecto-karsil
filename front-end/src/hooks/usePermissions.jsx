import { useAuth } from "context/AuthContext";

export const usePermissions = () => {
  const { user } = useAuth();

  const hasRole = (role) =>
    user?.roles?.includes(role);

  const hasPermission = (permission) =>
    user?.permissions?.includes(permission);

  const hasAnyPermission = (permissions = []) =>
    permissions.some(p => user?.permissions?.includes(p));

  const hasAllPermissions = (permissions = []) =>
    permissions.every(p => user?.permissions?.includes(p));

  return {
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  };
};
