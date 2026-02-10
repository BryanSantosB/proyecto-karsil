import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import { api } from "services/api";

const Register = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const navigate = useNavigate();

  const handleChange = (campo, valor) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));
    setError("");
  };

  const validarFormulario = () => {
    const { nombreCompleto, email, password, confirmPassword } = formData;

    if (!nombreCompleto.trim()) {
      setError("El nombre completo es obligatorio.");
      return false;
    }

    if (nombreCompleto.trim().length < 3) {
      setError("El nombre debe tener al menos 3 caracteres.");
      return false;
    }

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

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return false;
    }

    // Validar complejidad de contraseña
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);

    if (!tieneMinuscula || !tieneMayuscula || !tieneNumero) {
      setError(
        "La contraseña debe contener al menos una mayúscula, una minúscula y un número.",
      );
      return false;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return false;
    }

    if (!aceptaTerminos) {
      setError("Debes aceptar los términos y condiciones para continuar.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    setIsLoading(true);

    try {
      const response = await api.post("/auth/register", {
        nombre: formData.nombreCompleto,
        email: formData.email,
        password: formData.password,
      });
      console.log("Registro exitoso con:", response.data);
      navigate("/");
    } catch (err) {
      console.error("Error en registro:", err);
      setError(
        err.response?.data?.mensaje ||
          "Error al registrar la cuenta. Por favor, intenta nuevamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const calcularFortalezaPassword = () => {
    const { password } = formData;
    if (!password) return { porcentaje: 0, texto: "", color: "" };

    let puntos = 0;

    if (password.length >= 8) puntos += 25;
    if (password.length >= 12) puntos += 15;
    if (/[a-z]/.test(password)) puntos += 15;
    if (/[A-Z]/.test(password)) puntos += 15;
    if (/[0-9]/.test(password)) puntos += 15;
    if (/[^a-zA-Z0-9]/.test(password)) puntos += 15;

    if (puntos <= 40) {
      return { porcentaje: puntos, texto: "Débil", color: "bg-red-500" };
    } else if (puntos <= 70) {
      return { porcentaje: puntos, texto: "Media", color: "bg-yellow-500" };
    } else {
      return { porcentaje: puntos, texto: "Fuerte", color: "bg-green-500" };
    }
  };

  const fortalezaPassword = calcularFortalezaPassword();

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
        <AlertaFlotante
          mensaje={error}
          onClose={() => setError("")}
          tipo="error"
        />
        {exito && (
          <AlertaFlotante
            mensaje={exito}
            onClose={() => setExito("")}
            tipo="success"
          />
        )}

        {/* Panel izquierdo - Información */}
        <div className="hidden lg:flex lg:w-1/2 min-h-screen items-center justify-center p-12">
          <div className="max-w-lg text-white space-y-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Únete a
              <br />
              Karsil Cargo
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Crea tu cuenta y comienza a disfrutar de nuestros servicios de envíos nacionales con la mayor confiabilidad y rapidez.
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
                    Crear Cuenta
                  </h2>
                  <p className="text-gray-400 text-sm">
                    ¿Ya tienes cuenta?{" "}
                    <Link
                      to="/login"
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      Inicia sesión
                    </Link>
                  </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nombre completo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="nombreCompleto"
                      placeholder="Juan Pérez García"
                      value={formData.nombreCompleto}
                      onChange={(e) => handleChange("nombreCompleto", e.target.value)}
                      autoComplete="name"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-200"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Correo Electrónico
                    </label>
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

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        autoComplete="new-password"
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

                    {/* Indicador de fortaleza de contraseña */}
                    {formData.password && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">
                            Fortaleza de contraseña:
                          </span>
                          <span
                            className={`text-xs font-semibold ${
                              fortalezaPassword.porcentaje <= 40
                                ? "text-red-400"
                                : fortalezaPassword.porcentaje <= 70
                                  ? "text-yellow-400"
                                  : "text-green-400"
                            }`}
                          >
                            {fortalezaPassword.texto}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${fortalezaPassword.color} transition-all duration-300`}
                            style={{ width: `${fortalezaPassword.porcentaje}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Mínimo 8 caracteres con mayúsculas, minúsculas y números
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirmar Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirmar Contraseña
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        autoComplete="new-password"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
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

                    {/* Indicador de coincidencia */}
                    {formData.confirmPassword && (
                      <div className="mt-2 flex items-center gap-2">
                        {formData.password === formData.confirmPassword ? (
                          <>
                            <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs text-green-400 font-medium">
                              Las contraseñas coinciden
                            </span>
                          </>
                        ) : (
                          <>
                            <svg className="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-xs text-red-400 font-medium">
                              Las contraseñas no coinciden
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Aceptar términos */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={aceptaTerminos}
                        onChange={(e) => {
                          setAceptaTerminos(e.target.checked);
                          setError("");
                        }}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-xs text-gray-300 select-none group-hover:text-white transition-colors">
                        Acepto los{" "}
                        <Link
                          to="/terminos"
                          target="_blank"
                          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                          Términos y Condiciones
                        </Link>{" "}
                        y la{" "}
                        <Link
                          to="/privacidad"
                          target="_blank"
                          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                          Política de Privacidad
                        </Link>
                      </span>
                    </label>
                  </div>

                  {/* Botón de registro */}
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
                        Creando cuenta...
                      </span>
                    ) : (
                      "Crear Cuenta"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Footer informativo */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Al crear una cuenta, aceptas nuestros términos y políticas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de ambiente (solo en desarrollo) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 bg-yellow-400/90 backdrop-blur-sm text-yellow-900 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg z-50">
          DESARROLLO
        </div>
      )}
    </div>
  );
};

export default Register;