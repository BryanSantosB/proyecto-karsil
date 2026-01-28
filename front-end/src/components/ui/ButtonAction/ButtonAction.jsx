export default function ButtonAction({ texto, className = "", variant = "primary", ...props }) {
  // Definimos variantes por si quieres un botón "Volver" con otros colores
  const variants = {
    primary: "text-primary-primary border-primary-primary",
    secondary: "text-gray-500 border-gray-500 hover:bg-gray-500", // Ejemplo
  };

  return (
    <button
      {...props}
      className={`
        group relative inline-flex items-center justify-center
        px-8 py-2 overflow-hidden font-bold
        border-2 rounded-md transition duration-300 ease-out
        hover:text-white disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant] || variants.primary}
        ${className} 
      `}
    >
      {/* Capa de fondo que se desliza */}
      <span className="
        absolute inset-0 w-full h-full 
        bg-primary-primary transition-all duration-300 
        -translate-x-full group-hover:translate-x-0 
        ease-out
      "></span>

      {/* Texto del botón */}
      <span className="relative flex items-center gap-2">
        {texto}
      </span>
    </button>
  );
}