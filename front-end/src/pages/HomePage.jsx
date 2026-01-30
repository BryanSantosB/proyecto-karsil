import { ContactUs } from "components/ui/ContactUs/ContactUs";
import HeroSection from "components/ui/HeroSection/HeroSection";
import KarsilServices from "components/ui/KarsilServices/KarsilServices";
import WhyKarsil from "components/ui/KarsilServices/WhyKarsil";
import CalculadoraEnvio from "features/calculadora_envio/CalculadoraEnvio";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function HomePage() {
  const { state } = useLocation();

  const sectionRefs = {
    hero: useRef(null),
    servicios: useRef(null),
    beneficios: useRef(null),
    contactus: useRef(null),
  };

  useEffect(() => {
    const target = state?.scrollTo;
    if (target && sectionRefs[target]?.current) {
      sectionRefs[target].current.scrollIntoView({
        behavior: "smooth",
      });
    }
    // eslint-disable-next-line
  }, [state]);

  return (
    <div>
      <HeroSection ref={sectionRefs.hero} />
      <KarsilServices ref={sectionRefs.servicios} />
      <WhyKarsil ref={sectionRefs.beneficios} />
      <ContactUs ref={sectionRefs.contactus} />
      <CalculadoraEnvio />
    </div>
  );
}
export default HomePage;
