export const ContactUs = () => {
  return (
    <section 
      className="relative min-h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-primary-primary/80" />

      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 size-96 bg-primary-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 size-96 bg-primary-light/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          
          {/* Columna izquierda - Información */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-primary/20 backdrop-blur-sm border border-primary-primary/30">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-primary-light opacity-75 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-primary-light" />
              </span>
              <span className="text-sm font-semibold text-primary-light uppercase tracking-wide">
                Estamos aquí para ayudarte
              </span>
            </div>

            {/* Título */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                La mejor solución de{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary-primary to-primary-light bg-clip-text text-transparent">
                    envíos
                  </span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary-primary/20 -rotate-1" />
                </span>{" "}
                para tu negocio
              </h2>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                Conecta con nuestro equipo y descubre cómo podemos llevar tu carga de forma 
                segura y rápida a cualquier destino en Perú. Estamos disponibles 24/7 para 
                resolver todas tus dudas.
              </p>
            </div>

            {/* Características */}
            <div className="space-y-4">
              {[
                {
                  icon: "M5 13l4 4L19 7",
                  title: "Respuesta inmediata",
                  desc: "Atención personalizada en menos de 2 horas"
                },
                {
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                  title: "Disponibilidad 24/7",
                  desc: "Siempre listos para ayudarte cuando lo necesites"
                },
                {
                  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                  title: "Asesoría especializada",
                  desc: "Expertos en logística a tu servicio"
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 size-12 rounded-lg bg-primary-primary/20 flex items-center justify-center group-hover:bg-primary-primary transition-all duration-300">
                    <svg className="size-6 text-primary-light group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Redes sociales */}
            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-gray-300 font-semibold mb-4">Síguenos en redes</h3>
              <div className="flex items-center gap-3">
                {[
                  { path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                  { path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                  { path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  { path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }
                ].map((social, i) => (
                  <a 
                    key={i}
                    href="/" 
                    className="size-11 rounded-full bg-gray-800/50 hover:bg-primary-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <svg className="size-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Info de contacto directo */}
            <div className="hidden lg:grid grid-cols-2 gap-6 pt-6">
              {[
                { 
                  icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                  label: "Teléfono",
                  value: "+51 999 999 999"
                },
                {
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                  label: "Email",
                  value: "contacto@karsilcargo.com"
                }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2 text-primary-light">
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className="font-semibold">{item.label}</span>
                  </div>
                  <p className="text-gray-300">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Formulario de contacto
              </h3>
              <p className="text-gray-600 mb-8">
                Cuéntanos sobre tu proyecto y te responderemos lo antes posible
              </p>

              <form className="space-y-6">
                {/* Campos del formulario */}
                {[
                  { label: "Nombre completo", type: "text", placeholder: "Juan Pérez" },
                  { label: "Correo electrónico", type: "email", placeholder: "juan@empresa.com" },
                  { label: "Teléfono", type: "tel", placeholder: "+51 999 999 999" }
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-primary focus:ring-4 focus:ring-primary-primary/10 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                ))}

                {/* Mensaje */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-primary focus:ring-4 focus:ring-primary-primary/10 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400 resize-none"
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 size-5 rounded border-gray-300 text-primary-primary focus:ring-primary-primary/20"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    Acepto los{" "}
                    <a href="/" className="text-primary-primary hover:text-primary-light font-semibold">
                      términos y condiciones
                    </a>{" "}
                    y la{" "}
                    <a href="/" className="text-primary-primary hover:text-primary-light font-semibold">
                      política de privacidad
                    </a>
                  </label>
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-primary to-primary-light hover:from-primary-light hover:to-primary-primary text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl shadow-primary-primary/30 hover:shadow-primary-primary/50 flex items-center justify-center gap-2 group"
                >
                  <span>Enviar mensaje</span>
                  <svg className="size-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>

              {/* Info adicional */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  🔒 Tus datos están seguros y nunca serán compartidos con terceros
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
