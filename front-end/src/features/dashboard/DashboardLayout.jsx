import React, { useState } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "context/AuthContext";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Package, label: "Envíos", path: "/dashboard/envios" },
    { icon: MessageSquare, label: "Reclamos", path: "/dashboard/reclamos" },
    { icon: BarChart3, label: "Reportes", path: "/dashboard/reportes" },
    {
      icon: Settings,
      label: "Configuración",
      path: "/dashboard/configuracion",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-64" : "w-20"}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div
            className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}
          >
            <Link
              to="/dashboard"
              className="flex items-center gap-2 lg:gap-3 group"
            >
              {/* Contenedor del Logo con Efecto Glow */}
              <div className="relative flex-shrink-0">
                <img
                  src={`${process.env.REACT_APP_API_UR}/public/logo_figura.png`}
                  alt="Karsil Cargo"
                  className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                {/* El blur de fondo cuando pasas el mouse */}
                <div className="absolute inset-0 bg-primary-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>

              {/* Textos del Logo */}
              <div className="flex flex-col">
                <span className="text-[16px] uppercase tracking-widest font-medium text-gray-800 leading-tight">
                  dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Mobile Close */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                // CAMBIO: Control dinámico de padding y ancho
                className={`
          flex items-center gap-3 rounded-lg transition-all duration-300
          ${active ? "bg-primary-primary text-white shadow-sm" : "text-gray-700 hover:bg-gray-100"}
          ${
            sidebarOpen
              ? "w-full px-3 py-2.5 justify-start"
              : "w-10 h-10 mx-auto justify-center p-0"
          } 
        `}
                title={!sidebarOpen ? item.label : ""} // Tooltip cuando está cerrado
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    active ? "text-white" : "text-gray-500"
                  }`}
                />

                {/* El span solo ocupa espacio si el sidebar está abierto */}
                {sidebarOpen && (
                  <span className="whitespace-nowrap font-medium opacity-100 transition-opacity duration-300">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-gray-700 hover:bg-gray-100 transition-colors
            ${sidebarOpen ? "justify-start" : "justify-center"}
          `}
          >
            <LogOut className="w-5 h-5 text-gray-500 flex-shrink-0" />
            <span
              className={`
              whitespace-nowrap transition-all duration-300 font-medium
              ${sidebarOpen ? "opacity-100" : "opacity-0 w-0"}
            `}
            >
              Cerrar Sesión
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}
      `}
      >
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="h-full px-4 lg:px-6 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <button className="flex items-center gap-3 pl-3 pr-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-primary to-primary-primary/80 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden lg:block font-medium text-gray-700 text-sm">
                  {user?.nombre}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
