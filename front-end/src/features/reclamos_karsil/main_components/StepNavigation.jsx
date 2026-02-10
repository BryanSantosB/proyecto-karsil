import React from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

/**
 * StepNavigation - Reemplaza NavegacionPasos
 * Botones de siguiente/anterior con diseño consistente
 */
const StepNavigation = ({
  onSiguiente,
  onVolver,
  textoSiguiente = 'Continuar',
  deshabilitarVolver = false,
  deshabilitarSiguiente = false,
  esUltimoPaso = false
}) => {
  return (
    <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-100">
      {/* Botón Volver */}
      {!deshabilitarVolver ? (
        <button
          type="button"
          onClick={onVolver}
          className="
            flex items-center gap-2 px-5 py-2.5
            text-sm font-medium text-gray-600
            border border-gray-200 rounded-lg
            hover:bg-gray-50 hover:text-gray-900
            transition-all duration-200
          "
        >
          <ChevronLeft className="w-4 h-4" />
          Volver
        </button>
      ) : (
        <div /> /* Spacer para mantener el siguiente a la derecha */
      )}

      {/* Botón Siguiente / Enviar */}
      <button
        type="button"
        onClick={onSiguiente}
        disabled={deshabilitarSiguiente}
        className="
          flex items-center gap-2 px-6 py-2.5
          text-sm font-semibold text-white
          bg-primary-primary rounded-lg
          hover:opacity-90
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          shadow-sm
        "
      >
        {textoSiguiente}
        {esUltimoPaso
          ? <Send className="w-4 h-4" />
          : <ChevronRight className="w-4 h-4" />
        }
      </button>
    </div>
  );
};

export default StepNavigation;