import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-50 backdrop-blur-md bg-primary-bg border-b border-white/10 mb-5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-primary-primary tracking-wide">
              KARSIL
            </span>
            <span className="hidden sm:block text-xs text-gray-400">
              Envíos Nacionales
            </span>
          </div>

          {/* Desktop menu */}
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
                className="relative group text-primary-primary transition hover:text-primary-light"
              >
                {item}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-primary-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* CTA */}
            <a
              href="/cotizar"
              className="relative inline-flex items-center justify-center px-5 py-2 font-semibold text-white rounded-lg bg-primary-primary hover:bg-primary-light transition shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50"
            >
              Cotizar envío
            </a>
          </div>

          {/* Mobile button */}
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

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 space-y-4 bg-gray-900/95">
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
