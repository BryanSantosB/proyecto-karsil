import { useState, useEffect } from "react";
import { AnclaNav } from "../AnclaNav/AnclaNav";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);
  const navigate = useNavigate();

  // Detecta el scroll para añadir sombras o cambiar opacidad si lo deseas
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setIsAuthenticated(true);
      try {
        const userData = JSON.parse(user);
        setUserName(userData.nombreCompleto || userData.email);
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  // Cierra el menú móvil al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserName("");
    setOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Inicio", to: "/", scrollTo: "hero" },
    { name: "Servicios", to: "/", scrollTo: "servicios" },
    { name: "Beneficios", to: "/", scrollTo: "beneficios" },
    { name: "Contacto", to: "/", scrollTo: "contactus" },
  ];

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-sm shadow-md shadow-gray-900/5 ${
        scrolled ? "py-0" : "py-1"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 lg:gap-3 group">
            <div className="relative">
              <img
                src={`${process.env.REACT_APP_API_UR}/public/logo_big_v2.png`}
                alt="Karsil Cargo"
                className="h-10 lg:h-12 xl:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xs lg:text-sm uppercase tracking-widest font-medium text-gray-600 transition-colors duration-300">
                Envíos Nacionales
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-3">
            {navLinks.map((link) => (
              <AnclaNav key={link.name} link={link} />
            ))}

            <Link
              to="/cotizar"
              className="ml-2 lg:ml-4 xl:ml-6 relative inline-flex items-center justify-center px-5 lg:px-6 xl:px-8 py-2 lg:py-2.5 xl:py-3 text-sm lg:text-base xl:text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-primary-primary to-primary-light hover:from-primary-light hover:to-primary-primary transition-all duration-300 shadow-lg shadow-primary-primary/30 hover:shadow-primary-primary/50 hover:scale-105 active:scale-95 group"
            >
              <span className="relative z-10">Cotizar</span>
            </Link>

            {/* Autenticación */}
            {isAuthenticated ? (
              <div className="ml-2 lg:ml-3 flex items-center gap-2 lg:gap-3">
                <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary-primary text-white flex items-center justify-center text-sm font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {userName}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center px-4 lg:px-5 py-2 lg:py-2.5 text-sm lg:text-base font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="hidden lg:inline">Cerrar Sesión</span>
                  <span className="lg:hidden">Salir</span>
                </button>
              </div>
            ) : (
              <div className="ml-2 lg:ml-3 relative">
                <button
                  onClick={() => setShowAuthDropdown(!showAuthDropdown)}
                  onBlur={() =>
                    setTimeout(() => setShowAuthDropdown(false), 200)
                  }
                  className="inline-flex items-center justify-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 text-sm lg:text-base font-semibold text-white bg-gradient-to-r from-primary-primary to-primary-light hover:from-primary-light hover:to-primary-primary rounded-lg transition-all duration-300 shadow-lg shadow-primary-primary/30 hover:shadow-primary-primary/50 hover:scale-105 active:scale-95"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Mi Cuenta</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${showAuthDropdown ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showAuthDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-2">
                      <Link
                        to="/login"
                        className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-primary-primary/10 rounded-lg transition-colors duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary-primary/10 flex items-center justify-center group-hover:bg-primary-primary/20 transition-colors">
                          <svg
                            className="w-5 h-5 text-primary-primary"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            Iniciar Sesión
                          </p>
                          <p className="text-xs text-gray-500">
                            Accede a tu cuenta
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/register"
                        className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-green-50 rounded-lg transition-colors duration-200 group mt-1"
                      >
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">Crear Cuenta</p>
                          <p className="text-xs text-gray-500">
                            Regístrate gratis
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-primary-primary hover:bg-primary-primary/10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-primary/50"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                  open ? "rotate-45 translate-y-2" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                  open ? "opacity-0 scale-0" : ""
                }`}
              />

              <span
                className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                  open ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-gray-900/98 backdrop-blur-lg border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
            {/* Usuario autenticado - nombre */}

            {isAuthenticated && (
              <div className="px-4 py-3 mb-2 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-primary text-white flex items-center justify-center text-base font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Conectado como</p>

                    <p className="text-sm font-medium text-white truncate max-w-[200px]">
                      {userName}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.to}
                state={link.scrollTo ? { scrollTo: link.scrollTo } : undefined}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 font-medium"
                style={{
                  animationDelay: `${index * 50}ms`,

                  animation: open
                    ? "slideInFromRight 0.3s ease-out forwards"
                    : "none",
                }}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile CTA */}

            <div className="pt-2">
              <Link
                to="/cotizar"
                onClick={() => setOpen(false)}
                className="block text-center bg-gradient-to-r from-primary-primary to-primary-light hover:from-primary-light hover:to-primary-primary text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-primary-primary/30 hover:shadow-primary-primary/50 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                Cotizar envío
              </Link>
            </div>

            {/* Mobile Auth Buttons */}

            {isAuthenticated ? (
              <div className="pt-2 border-t border-gray-800/50 mt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="pt-2 space-y-2 border-t border-gray-800/50 mt-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-white text-primary-primary font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Ingresar
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-green-600/30 hover:shadow-green-600/50 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}

      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10 md:hidden"
          onClick={() => setOpen(false)}
          style={{
            animation: "fadeIn 0.3s ease-out",
          }}
        />
      )}

      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;

            transform: translateX(20px);
          }

          to {
            opacity: 1;

            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
