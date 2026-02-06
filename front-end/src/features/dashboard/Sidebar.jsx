// dashboard/Sidebar.jsx
import { NavLink } from "react-router-dom";

const items = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Reclamos", to: "/dashboard/reclamos" },
  { label: "Envíos", to: "/dashboard/envios" },
  { label: "Usuarios", to: "/dashboard/usuarios" },
  { label: "Reportes", to: "/dashboard/reportes" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-primary-primary text-white flex flex-col">
      <div className="h-16 flex items-center px-6 font-bold text-lg border-b border-white/20">
        Karsil Admin
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition
               ${isActive
                ? "bg-white text-primary-primary font-semibold"
                : "hover:bg-white/10"}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
