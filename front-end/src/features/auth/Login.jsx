import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "components/ui/CustomInput/CustomInput";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import TitleLandingPage from "components/ui/TitleLandingPage/TitleLandingPage";
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
    <div className="min-h-screen w-full relative overflow-hidden ">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_API_UR}/public/background-login.png)`,
        }}
      >
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 min-h-screen flex items-center justify-center lg:justify-end px-4 py-8">
        <AlertaFlotante mensaje={error} onClose={() => setError("")} />

        {/* Contenedor del formulario */}
        <div className="w-full max-w-md lg:mr-16 xl:mr-24">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Logo y título */}
            <div className="text-center">
              <TitleLandingPage title="Iniciar Sesión" message="Ingresa a tu cuenta para continuar" />
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <CustomInput
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value.toLowerCase())}
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <CustomInput
                  label="Contraseña"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[42px] text-gray-500 hover:text-gray-700 transition-colors"
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

              {/* Recordar y olvidé contraseña */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-primary-primary border-gray-300 rounded focus:ring-primary-primary cursor-pointer"
                  />
                  <span className="ml-2 text-gray-700">Recordarme</span>
                </label>
                <Link
                  to="/recuperar-contrasena"
                  className="text-primary-primary hover:text-blue-700 font-medium transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* Botón de login */}
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full py-3 px-4 rounded-xl font-bold text-white text-lg
                  bg-gradient-to-r from-primary-primary to-blue-600
                  hover:from-blue-700 hover:to-primary-primary
                  transform transition-all duration-300
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}
                  shadow-lg hover:shadow-xl
                  focus:outline-none focus:ring-4 focus:ring-primary-primary/50
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

            {/* Divisor */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">o</span>
              </div>
            </div>

            {/* Registro */}
            <div className="text-center">
              <p className="text-gray-600">
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/registro"
                  className="text-primary-primary hover:text-blue-700 font-bold transition-colors"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>

            {/* Footer informativo */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Al iniciar sesión, aceptas nuestros{" "}
                <Link to="/terminos" className="text-primary-primary hover:underline">
                  Términos de Servicio
                </Link>{" "}
                y{" "}
                <Link to="/privacidad" className="text-primary-primary hover:underline">
                  Política de Privacidad
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de ambiente (solo en desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg z-50">
          DESARROLLO
        </div>
      )}
    </div>
  );
};

export default Login;