// dashboard/Topbar.jsx
import { useAuth } from "context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-700">
        Panel de Gestión
      </h1>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-primary-primary text-white flex items-center justify-center font-bold">
          {user?.nombre?.charAt(0)}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {user?.nombre}
        </span>
      </div>
    </header>
  );
};

export default Topbar;
