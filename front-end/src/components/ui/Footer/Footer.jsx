export default function Footer() {
    return (
        <>
            <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-20">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-primary via-primary-light to-primary-primary"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                        
                        {/* Logo y descripción - 4 columnas */}
                        <div className="lg:col-span-4">
                            <div className="flex items-center gap-3 mb-4">
                                <img 
                                    src="http://localhost:4000/public/logo_big.png" 
                                    alt="Karsil Cargo Logo" 
                                    className="h-12 w-auto object-contain brightness-0 invert"
                                />
                            </div>
                            <p className="text-sm text-gray-400 mb-6 leading-relaxed max-w-sm">
                                Líder en transporte de carga aérea y terrestre en Perú. 
                                Conectamos tu negocio con todo el país de manera rápida y segura.
                            </p>
                            
                            {/* Redes sociales */}
                            <div className="flex items-center gap-3">
                                <a 
                                    href="https://www.facebook.com/profile.php?id=100082982366901" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="https://www.instagram.com/karsilcargoperu/?hl=es" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="https://www.linkedin.com/company/karsil-cargo/?originalSubdomain=pe" 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary-primary flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Servicios - 2 columnas */}
                        <div className="lg:col-span-2">
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                                Servicios
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="/" className="text-sm hover:text-primary-light transition-colors duration-200 flex items-center gap-2 group">
                                        <span className="text-primary-primary group-hover:translate-x-1 transition-transform">›</span>
                                        Envío aéreo
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm hover:text-primary-light transition-colors duration-200 flex items-center gap-2 group">
                                        <span className="text-primary-primary group-hover:translate-x-1 transition-transform">›</span>
                                        Envío terrestre
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm hover:text-primary-light transition-colors duration-200 flex items-center gap-2 group">
                                        <span className="text-primary-primary group-hover:translate-x-1 transition-transform">›</span>
                                        Carga especial
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm hover:text-primary-light transition-colors duration-200 flex items-center gap-2 group">
                                        <span className="text-primary-primary group-hover:translate-x-1 transition-transform">›</span>
                                        Almacenamiento
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Empresa - 2 columnas */}
                        <div className="lg:col-span-2">
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                                Empresa
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="/" className="text-sm hover:text-primary-light transition-colors duration-200 flex items-center gap-2 group">
                                        <span className="text-primary-primary group-hover:translate-x-1 transition-transform">›</span>
                                        Nosotros
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm hover:text-primary-light transition-colors duration-200 flex items-center gap-2 group">
                                        <span className="text-primary-primary group-hover:translate-x-1 transition-transform">›</span>
                                        Cobertura
                                    </a>
                                </li>
                                <li>
                                    <a href="/" className="text-sm hover:text-primary-light transition-colors duration-200 flex items-center gap-2 group">
                                        <span className="text-primary-primary group-hover:translate-x-1 transition-transform">›</span>
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="7" className="text-sm hover:text-primary-light transition-colors duration-200 flex items-center gap-2 group">
                                        <span className="text-primary-primary group-hover:translate-x-1 transition-transform">›</span>
                                        Trabaja con nosotros
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contacto - 4 columnas */}
                        <div className="lg:col-span-4">
                            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                                Contacto
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-primary-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div className="text-sm">
                                        <p className="font-semibold text-white mb-1">Oficina Principal</p>
                                        <p className="text-gray-400">Calle Cromo Mz. B Lt. 14-A Urb, Callao 07041</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-primary-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div className="text-sm">
                                        <p className="font-semibold text-white mb-1">Teléfono</p>
                                        <p className="text-gray-400">+51 965 634 916</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-primary-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div className="text-sm">
                                        <p className="font-semibold text-white mb-1">Email</p>
                                        <p className="text-gray-400">pj_logistic@karsil.com.pe</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Divisor */}
                    <div className="border-t border-gray-700 mt-12 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            {/* Copyright */}
                            <p className="text-sm text-gray-400 text-center md:text-left">
                                © {new Date().getFullYear()} <span className="text-white font-semibold">Karsil Cargo</span>. Todos los derechos reservados.
                            </p>

                            {/* Links legales */}
                            <div className="flex items-center gap-6 text-sm">
                                <a href="/" className="text-gray-400 hover:text-primary-light transition-colors duration-200">
                                    Política de Privacidad
                                </a>
                                <span className="text-gray-600">•</span>
                                <a href="/" className="text-gray-400 hover:text-primary-light transition-colors duration-200">
                                    Términos y Condiciones
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* CTA flotante (opcional) */}
                    <div className="mt-8 bg-gradient-to-r from-primary-primary to-primary-light rounded-xl p-6 text-center">
                        <h4 className="text-white font-bold text-lg mb-2">
                            ¿Listo para enviar?
                        </h4>
                        <p className="text-indigo-100 text-sm mb-4">
                            Cotiza tu envío ahora y recibe una respuesta en minutos
                        </p>
                        <a 
                            href="/cotizar" 
                            className="inline-flex items-center gap-2 bg-white text-primary-primary font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Cotizar envío
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-primary to-transparent opacity-50"></div>
            </footer>
        </>
    );
}