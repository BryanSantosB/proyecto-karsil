import React, { forwardRef } from "react";
import TitleLandingPage from "../TitleLandingPage/TitleLandingPage";
import { Link } from "react-router-dom";

const WhyKarsil = forwardRef((props, ref) => {
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
    <div className="d-flex justify-content-center w-100" ref={ref}>
      <div className="w-responsive bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <TitleLandingPage
            title="¿Por qué elegir Karsil?"
            message="Somos su aliado estratégico en logística, comprometidos con la
              excelencia y su satisfacción"
          />

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-5 p-6 rounded-lg border border-gray-200 bg-white hover:border-primary-primary transition-all duration-300"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-primary bg-opacity-10 rounded-md text-xl">
                  {benefit.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges Section */}
          <div className="border-t border-b border-gray-200 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-semibold text-gray-900 mb-2">15+</div>
                <div className="text-gray-600 text-base">Años de experiencia</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-semibold text-gray-900 mb-2">10,000+</div>
                <div className="text-gray-600 text-base">Clientes satisfechos</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-semibold text-gray-900 mb-2">99.8%</div>
                <div className="text-gray-600 text-base">Entregas exitosas</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6 text-lg">
              Únase a miles de empresas que confían en nosotros
            </p>
            <Link
              to="/cotizar"
              className="ml-2 lg:ml-4 xl:ml-6 relative inline-flex items-center justify-center px-5 lg:px-6 xl:px-8 py-2 lg:py-2.5 xl:py-3 text-sm lg:text-base xl:text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-primary-primary to-primary-light hover:from-primary-light hover:to-primary-primary transition-all duration-300 shadow-lg shadow-primary-primary/30 hover:shadow-primary-primary/50 hover:scale-105 active:scale-95 group"
            >
              <span className="relative z-10">Comenzar ahora</span>
              {/* Shine effect */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WhyKarsil;