import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";

const TimelineReclamo = ({ historial }) => {
  if (!historial || historial.length === 0) return null;

  return (
    <NeumorphicContainer width="100%" className="p-4 p-md-5 mb-4">
      <div className="bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl p-4 border-l-4 border-cyan-500 mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">📋</div>
          <h3 className="text-lg font-bold text-gray-800 uppercase">
            Historial del Reclamo
          </h3>
        </div>
      </div>

      <div className="relative">
        {/* Línea vertical */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

        {/* Items del timeline */}
        <div className="space-y-4">
          {historial.map((evento, index) => (
            <div key={index} className="relative flex gap-4 items-start">
              {/* Punto */}
              <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary-primary shadow-md">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>

              {/* Contenido */}
              <div className="flex-1 pb-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {evento.titulo}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {new Date(evento.fecha).toLocaleDateString("es-PE")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {evento.descripcion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </NeumorphicContainer>
  );
};

export default TimelineReclamo;