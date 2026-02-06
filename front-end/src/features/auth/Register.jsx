import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "components/ui/CustomInput/CustomInput";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import TitleLandingPage from "components/ui/TitleLandingPage/TitleLandingPage";
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
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${process.env.REACT_APP_API_UR}/public/background-login.png')`,
        }}
      >
        {/* Overlay oscuro para mejorar legibilidad */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 min-h-screen flex items-center justify-center lg:justify-end px-4 py-8">
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

        {/* Contenedor del formulario */}
        <div className="w-full max-w-md lg:mr-16 xl:mr-24">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Logo y título */}
            <div className="text-center mb-8">
              <TitleLandingPage
                title="Crear Cuenta"
                message="Registrate para comenzar a usar nuestros servicios"
              />
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nombre completo */}
              <div>
                <CustomInput
                  label="Nombre Completo"
                  name="nombreCompleto"
                  type="text"
                  placeholder="Juan Pérez García"
                  value={formData.nombreCompleto}
                  onChange={(e) =>
                    handleChange("nombreCompleto", e.target.value)
                  }
                  autoComplete="name"
                />
              </div>

              {/* Email */}
              <div>
                <CustomInput
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value.toLowerCase())
                  }
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
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[42px] text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>

                {/* Indicador de fortaleza de contraseña */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">
                        Fortaleza de contraseña:
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          fortalezaPassword.porcentaje <= 40
                            ? "text-red-600"
                            : fortalezaPassword.porcentaje <= 70
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {fortalezaPassword.texto}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${fortalezaPassword.color} transition-all duration-300`}
                        style={{ width: `${fortalezaPassword.porcentaje}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo 8 caracteres con mayúsculas, minúsculas y números
                    </p>
                  </div>
                )}
              </div>

              {/* Confirmar Password */}
              <div className="relative">
                <CustomInput
                  label="Confirmar Contraseña"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-[42px] text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>

                {/* Indicador de coincidencia */}
                {formData.confirmPassword && (
                  <div className="mt-2 flex items-center gap-2">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <svg
                          className="h-5 w-5 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-xs text-green-600 font-medium">
                          Las contraseñas coinciden
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-5 w-5 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="text-xs text-red-600 font-medium">
                          Las contraseñas no coinciden
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Aceptar términos */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aceptaTerminos}
                    onChange={(e) => {
                      setAceptaTerminos(e.target.checked);
                      setError("");
                    }}
                    className="mt-1 h-5 w-5 text-primary-primary border-gray-300 rounded focus:ring-primary-primary cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 select-none">
                    Acepto los{" "}
                    <Link
                      to="/terminos"
                      target="_blank"
                      className="text-primary-primary hover:underline font-medium"
                    >
                      Términos y Condiciones
                    </Link>{" "}
                    y la{" "}
                    <Link
                      to="/privacidad"
                      target="_blank"
                      className="text-primary-primary hover:underline font-medium"
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
                  w-full py-3 px-4 rounded-xl font-bold text-white text-lg
                  bg-gradient-to-r from-primary-primary to-blue-600
                  hover:from-blue-700 hover:to-primary-primary
                  transform transition-all duration-300
                  ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] active:scale-[0.98]"}
                  shadow-lg hover:shadow-xl
                  focus:outline-none focus:ring-4 focus:ring-primary-primary/50
                `}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creando cuenta...
                  </span>
                ) : (
                  "Crear Cuenta"
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

            {/* Login */}
            <div className="text-center">
              <p className="text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="text-primary-primary hover:text-blue-700 font-bold transition-colors"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de ambiente (solo en desarrollo) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg z-50">
          DESARROLLO
        </div>
      )}
    </div>
  );
};

export default Register;
