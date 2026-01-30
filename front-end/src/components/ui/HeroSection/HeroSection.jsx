import { useEffect, useState } from "react";
//import ButtonAction from "../ButtonAction/ButtonAction";
import ButtonCotizar from "../ButtonAction/ButtonCotizar";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const apiUrl = process.env.REACT_APP_API_UR;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="
        relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center
        bg-[image:var(--bg-mobile)]
        md:bg-[image:var(--bg-tablet)]
        lg:bg-[image:var(--bg-desktop)]
      "
      style={{
        '--bg-mobile': `url(${apiUrl}/public/imghero/movil_v2.png)`,
        '--bg-tablet': `url(${apiUrl}/public/imghero/small_v2.png)`,
        '--bg-desktop': `url(${apiUrl}/public/imghero/large_v2.png)`,
      }}
    >
      {/* Gradient Overlay - más suave en desktop para que se vea la imagen */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/70 to-transparent md:bg-gradient-to-r md:from-white/80 md:via-white/50 md:to-transparent"></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Contenedor principal con distribución mejorada */}
      <div className="relative mx-auto w-full max-w-[1920px] px-4 py-32 sm:px-6 sm:py-40 lg:px-12 xl:px-16 2xl:px-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna izquierda - Contenido */}
          <div
            className={`max-w-3xl lg:max-w-none transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge/Tag */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-primary/10 backdrop-blur-sm border border-primary-primary/20 mb-6 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-primary"></span>
              </span>
              <span className="text-sm font-semibold text-primary-primary uppercase tracking-wide">
                Envíos Nacionales
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className={`text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Envíos{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-primary-primary">
                  rápidos
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary-primary/20 -rotate-1"></span>
              </span>{" "}
              y seguros de Lima a todo el Perú con{" "}
              <span className="relative inline-block mt-2">
                <span className="bg-gradient-to-r from-primary-primary to-primary-light bg-clip-text text-transparent font-black">
                  Karsil Cargo
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5C50 2.5 100 2.5 199 5.5"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#818CF8" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p
              className={`mt-6 text-lg text-gray-700 font-medium sm:text-xl lg:text-2xl xl:text-3xl leading-relaxed transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Transporte de carga{" "}
              <span className="text-primary-primary font-semibold">aérea</span> y{" "}
              <span className="text-primary-primary font-semibold">terrestre</span>{" "}
              con la seguridad y rapidez que tu empresa necesita.
            </p>

            {/* Trust Indicators */}
            <div
              className={`mt-8 flex flex-wrap items-center gap-4 lg:gap-6 text-sm lg:text-base text-gray-600 transition-all duration-700 delay-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Cobertura nacional</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Seguimiento en tiempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 lg:w-6 lg:h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Entrega garantizada</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-900 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <ButtonCotizar texto="Cotizar ahora" />
            </div>

            {/* Stats Section - Mejorado para desktop */}
            <div
              className={`mt-12 lg:mt-16 grid grid-cols-3 gap-6 lg:gap-8 xl:gap-12 pt-10 border-t border-gray-300/50 transition-all duration-700 delay-1100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-primary">
                  +500
                </div>
                <div className="mt-2 text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 font-medium">
                  Empresas confían en nosotros
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-primary">
                  24/7
                </div>
                <div className="mt-2 text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 font-medium">
                  Atención al cliente
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-primary">
                  98%
                </div>
                <div className="mt-2 text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 font-medium">
                  Entregas a tiempo
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Espacio para que la imagen respire */}
          <div className="hidden lg:block relative">
            {/* Este espacio permite que el camión y avión de la imagen de fondo se vean bien */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Tarjeta flotante con info adicional (opcional) */}
              <div
                className={`bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-md transform transition-all duration-1000 delay-1000 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-primary/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Entregas Express
                  </h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Servicio de entrega urgente disponible para todo el Perú.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-primary"></span>
                    Lima → Provincias en 24-48 horas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-primary"></span>
                    Seguimiento GPS en tiempo real
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-primary"></span>
                    Seguro incluido en cada envío
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-gray-600 animate-bounce">
          <span className="text-xs font-medium uppercase tracking-wider">
            Desliza
          </span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </section>
  );
}