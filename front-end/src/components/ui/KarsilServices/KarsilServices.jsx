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
      <div className="w-responsive bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-900 mb-4 tracking-tight">
              Nuestros Servicios
            </h2>
            <div className="w-24 h-1 bg-primary-primary mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Soluciones logísticas integrales diseñadas para optimizar sus operaciones de transporte y distribución
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-8 hover:border-primary-primary hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col items-start">
                  {/* Icon */}
                  <div className="text-5xl mb-5">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed text-base">
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