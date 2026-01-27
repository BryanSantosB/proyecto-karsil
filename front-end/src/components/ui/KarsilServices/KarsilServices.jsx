import React from "react";
import ButtonAction from "../ButtonAction/ButtonAction";

export default function KarsilServices() {
  const services = [
    {
      icon: "🚚",
      title: "Envíos terrestres",
      description:
        "Transporte terrestre confiable y seguro para tus mercancías",
    },
    {
      icon: "✈️",
      title: "Envíos aéreos",
      description:
        "Entrega rápida y eficiente a nivel nacional e internacional",
    },
    {
      icon: "🏠",
      title: "Recojo a domicilio",
      description: "Recogemos tu carga directamente en tu ubicación",
    },
    {
      icon: "📦",
      title: "Entrega a domicilio",
      description: "Llevamos tus productos hasta la puerta de tu destino",
    },
    {
      icon: "❄️",
      title: "Carga especial",
      description:
        "Perecible, refrigerado y valorizado con cuidado especializado",
    },
  ];

  return (
    <div className="d-flex justify-content-center w-100">
      <div className="w-responsive bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Servicios de Karsil
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Soluciones logísticas completas adaptadas a tus necesidades
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-slate-200"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <ButtonAction texto="Cotizar Envío" />
        </div>
      </div>
    </div>
  );
}
