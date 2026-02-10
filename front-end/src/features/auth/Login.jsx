import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import { api } from "services/api";
import { useAuth } from "context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleChange = (campo, valor) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));
    setError("");
  };

  const validarFormulario = () => {
    const { email, password } = formData;

    if (!email.trim()) {
      setError("El correo electrónico es obligatorio.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Debes ingresar un correo electrónico válido.");
      return false;
    }

    if (!password.trim()) {
      setError("La contraseña es obligatoria.");
      return false;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', formData, {withCredentials: true});
      console.log("Login exitoso con:", response.data);
      console.log(response.data.user)
      setUser(response.data.user);
      navigate('/');
    } catch (err) {
      console.error("Error en login:", err);
      setError(
        err.response?.data?.mensaje || 
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#1a1b2e]">
      {/* Imagen de fondo con overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_API_UR}/public/background-login.png)`,
        }}
      >
        {/* Overlay con gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1b2e]/70 via-[#2d2e47]/60 to-[#1a1b2e]/80"></div>
        
        {/* Efectos de luz ambiental */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex">
        <AlertaFlotante mensaje={error} onClose={() => setError("")} />

        {/* Panel izquierdo - Información */}
        <div className="hidden lg:flex lg:w-1/2 min-h-screen items-center justify-center p-12">
          <div className="max-w-lg text-white space-y-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Conectando el Perú,
              <br />
              Entregando Confianza
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Karsil Cargo, tu aliado en envíos nacionales. Gestiona tus paquetes de manera rápida, segura y eficiente.
            </p>
          </div>
        </div>

        {/* Panel derecho - Formulario */}
        <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Contenedor glassmorphic */}
            <div className="relative backdrop-blur-xl bg-[#343551]/40 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Brillo superior */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {/* Contenido del formulario */}
              <div className="p-8 md:p-10">
                {/* Encabezado */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Iniciar Sesión
                  </h2>
                  <p className="text-gray-400 text-sm">
                    ¿No tienes cuenta?{" "}
                    <Link
                      to="/register"
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Regístrate
                    </Link>
                  </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="ejemplo@correo.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value.toLowerCase())}
                        autoComplete="email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Contraseña
                      </label>
                      <Link
                        to="/recuperar-contrasena"
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        autoComplete="current-password"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Recordarme */}
                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="ml-2 text-sm text-gray-300 group-hover:text-white transition-colors">
                        Recordarme
                      </span>
                    </label>
                  </div>

                  {/* Botón de login */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`
                      w-full py-3.5 px-4 rounded-xl font-semibold text-white text-base
                      bg-blue-600 hover:bg-blue-700
                      transform transition-all duration-200
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}
                      shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30
                      focus:outline-none focus:ring-2 focus:ring-blue-500/50
                    `}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Iniciando sesión...
                      </span>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Footer informativo */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Al iniciar sesión, aceptas nuestros{" "}
                <Link to="/terminos" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Términos de Servicio
                </Link>{" "}
                y{" "}
                <Link to="/privacidad" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Política de Privacidad
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de ambiente (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-yellow-400/90 backdrop-blur-sm text-yellow-900 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg z-50">
          DESARROLLO
        </div>
      )}
    </div>
  );
};

export default Login;