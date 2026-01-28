export default function ButtonCotizar({ texto, ...props }) {
  return (
    <div className="text-center mt-12">
      <button 
        {...props}
        className="
          relative inline-flex items-center justify-center
          px-10 py-4 font-bold text-white 
          bg-gradient-to-r from-primary-primary to-primary-light
          rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)]
          hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]
          transition-all duration-300 ease-in-out
          hover:-translate-y-1 hover:scale-105
          active:scale-95
          overflow-hidden group
        "
      >
        {/* Efecto de brillo al pasar el mouse */}
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
        
        <span className="relative">
          {texto}
        </span>
      </button>
    </div>
  );
}
