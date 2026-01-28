export default function ButtonAction({ texto, ...props }) {
  return (
    <div className="text-center mt-8">
      <button
        {...props}
        className="
          group relative inline-flex items-center justify-center
          px-8 py-3 overflow-hidden font-bold
          text-primary-primary border-2 border-primary-primary
          rounded-md transition duration-300 ease-out
          hover:text-white
        "
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
    </div>
  );
}