import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import miLogo from 'assets/icons/icon_karsil.png';

const Navbar = () => {
  // Estado para manejar el menú móvil (en React no usamos querySelector ni addEventListener)
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="h-[70px] relative w-full px-6 mb-4 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      
      {/* Logo - Usamos Link para evitar recargar la página */}
      <Link to="/" className="flex items-center">
        <img 
          src={miLogo} 
          alt="Karsil Logo" 
          className="h-10 w-auto object-contain" 
        />
      </Link>

      {/* Menú Desktop - md:flex hidden (se oculta en móvil, se muestra en md en adelante) */}
      <ul className="md:flex hidden items-center gap-10">
        <li><Link className="hover:text-gray-500/80 transition" to="/">Home</Link></li>
        <li><Link className="hover:text-gray-500/80 transition" to="/servicios">Services</Link></li>
        <li><Link className="hover:text-gray-500/80 transition" to="/portfolio">Portfolio</Link></li>
        <li><Link className="hover:text-gray-500/80 transition" to="/precios">Pricing</Link></li>
      </ul>

      {/* Botón Desktop */}
      <button type="button" className="bg-white text-gray-600 border border-gray-300 md:inline hidden text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full">
        Get started
      </button>

      {/* Botón Hamburguesa (Móvil) */}
      <button 
        aria-label="menu-btn" 
        type="button" 
        onClick={toggleMenu}
        className="inline-block md:hidden active:scale-90 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="#000">
          <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
        </svg>
      </button>

      {/* Menú Móvil - La clase "hidden" se quita dinámicamente con el estado isOpen */}
      <div className={`absolute top-[70px] left-0 w-full bg-white p-6 shadow-xl md:hidden transition-all ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col space-y-4 text-lg">
          <li><Link to="/" onClick={toggleMenu} className="text-sm">Home</Link></li>
          <li><Link to="/servicios" onClick={toggleMenu} className="text-sm">Services</Link></li>
          <li><Link to="/portfolio" onClick={toggleMenu} className="text-sm">Portfolio</Link></li>
          <li><Link to="/precios" onClick={toggleMenu} className="text-sm">Pricing</Link></li>
        </ul>

        <button type="button" className="bg-white text-gray-600 border border-gray-300 mt-6 text-sm hover:bg-gray-50 active:scale-95 transition-all w-40 h-11 rounded-full">
          Get started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;