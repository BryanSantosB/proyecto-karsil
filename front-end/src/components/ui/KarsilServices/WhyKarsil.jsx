import React from "react";

export default function WhyKarsil() {
  const benefits = [
    {
      icon: "✅",
      title: "Cobertura nacional",
      description:
        "Llegamos a todos los rincones del país con nuestra amplia red de distribución",
    },
    {
      icon: "✅",
      title: "Tarifas claras y competitivas",
      description:
        "Precios transparentes sin costos ocultos, ajustados a tu presupuesto",
    },
    {
      icon: "✅",
      title: "Seguimiento y atención personalizada",
      description:
        "Monitorea tu envío en tiempo real con soporte dedicado 24/7",
    },
    {
      icon: "✅",
      title: "Experiencia en logística y transporte",
      description:
        "Más de 15 años brindando soluciones logísticas de excelencia",
    },
    {
      icon: "✅",
      title: "Respaldo y seguridad en cada envío",
      description:
        "Protección total de tu carga con seguros y protocolos de seguridad",
    },
  ];

  return (
    <div className="d-flex justify-content-center w-100">
      <div className="w-responsive bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              ¿Por qué elegir Karsil?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Somos tu aliado estratégico en logística, comprometidos con la
              excelencia y tu satisfacción
            </p>
          </div>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-white to-slate-50 border-2 border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-green-100 rounded-full text-2xl group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-blue-100">Años de experiencia</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">Clientes satisfechos</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold mb-2">99.8%</div>
                <div className="text-blue-100">Entregas exitosas</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <p className="text-slate-600 mb-6 text-lg">
              Únete a miles de empresas que confían en nosotros
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-10 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Comenzar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
