import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    /* Mantenemos absolute para que flote sobre el Hero */
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo - Reemplazamos el texto por imagen */}
          <div className="flex items-center gap-2">
            <img 
              src="http://localhost:4000/public/logo_big.png" // Ajusta la ruta según tu carpeta public
              alt="Karsil Cargo Logo" 
              className="h-12 w-auto object-contain" // Controla el tamaño aquí
            />
            <span className="hidden sm:block text-xs text-gray-400 uppercase tracking-widest font-medium">
              Envíos Nacionales
            </span>
          </div>

          {/* Desktop menu - Restauramos tus colores originales */}
          <div className="hidden md:flex items-center gap-8">
            {[
              "Inicio",
              "Servicios",
              "Cobertura",
              "Seguimiento",
              "Contacto",
            ].map((item) => (
              <a
                key={item}
                href="/"
                className="relative group text-primary-primary font-semibold transition hover:text-primary-light"
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* CTA Original */}
            <a
              href="/cotizar"
              className="relative inline-flex items-center justify-center px-5 py-2 font-semibold text-white rounded-lg bg-primary-primary hover:bg-primary-light transition shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50"
            >
              Cotizar
            </a>
          </div>

          {/* Mobile button - Restauramos color primario */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-primary-primary focus:outline-none"
          >
            <div className="space-y-1">
              <span
                className={`block h-0.5 w-6 bg-current transition ${
                  open ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition ${
                  open ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu - Fondo oscuro para contraste */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 space-y-4 bg-gray-900/95 backdrop-blur-md">
          {["Inicio", "Servicios", "Cobertura", "Seguimiento", "Contacto"].map(
            (item) => (
              <a
                key={item}
                href="/"
                className="block text-gray-300 hover:text-white transition"
                onClick={() => setOpen(false)}
              >
                {item}
              </a>
            ),
          )}

          <a
            href="/cotizar"
            className="block text-center bg-primary-primary hover:bg-primary-light text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Cotizar envío
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;