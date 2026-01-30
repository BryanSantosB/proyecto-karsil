import { useState, useEffect } from "react";
import { AnclaNav } from "../AnclaNav/AnclaNav";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detecta el scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const navLinks = [
    { name: "Inicio", to: "/", scrollTo: "hero" },
    { name: "Servicios", to: "/", scrollTo: "servicios" },
    { name: "Beneficios", to: "/", scrollTo: "beneficios" },
    { name: "Contacto", to: "/", scrollTo: "contactus" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md shadow-gray-900/5"
          : "bg-white/95 backdrop-blur-sm shadow-md shadow-gray-900/5"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo - crece gradualmente */}
          <a
            href={navLinks[0].href}
            className="flex items-center gap-2 lg:gap-3 group"
          >
            <div className="relative">
              <img
                src={`${process.env.REACT_APP_API_UR}/public/logo_big_v2.png`}
                alt="Karsil Cargo"
                className="h-10 lg:h-12 xl:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-primary-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xs lg:text-sm uppercase tracking-widest font-medium text-gray-600 transition-colors duration-300">
                Envíos Nacionales
              </span>
            </div>
          </a>

          {/* Desktop Navigation - tamaños más balanceados */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-3">
            {navLinks.map((link) => (
              <AnclaNav key={link.name} link={link} />
            ))}

            <Link
              to="/cotizar"
              className="ml-2 lg:ml-4 xl:ml-6 relative inline-flex items-center justify-center px-5 lg:px-6 xl:px-8 py-2 lg:py-2.5 xl:py-3 text-sm lg:text-base xl:text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-primary-primary to-primary-light hover:from-primary-light hover:to-primary-primary transition-all duration-300 shadow-lg shadow-primary-primary/30 hover:shadow-primary-primary/50 hover:scale-105 active:scale-95 group"
            >
              <span className="relative z-10">Cotizar</span>
              {/* Shine effect */}
            </Link>
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
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
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
              </a>
            ))}

            {/* Mobile CTA */}
            <div className="pt-2">
              <a
                href="/cotizar"
                onClick={() => setOpen(false)}
                className="block text-center bg-gradient-to-r from-primary-primary to-primary-light hover:from-primary-light hover:to-primary-primary text-white font-semibold py-3 px-4 rounded-lg shadow-lg shadow-primary-primary/30 hover:shadow-primary-primary/50 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                Cotizar envío
              </a>
            </div>
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
