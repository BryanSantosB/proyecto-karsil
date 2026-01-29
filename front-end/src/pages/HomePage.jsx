import { ContactUs } from "components/ui/ContactUs/ContactUs";
import HeroSection from "components/ui/HeroSection/HeroSection";
import KarsilServices from "components/ui/KarsilServices/KarsilServices";
import WhyKarsil from "components/ui/KarsilServices/WhyKarsil";
import CalculadoraEnvio from "features/calculadora_envio/CalculadoraEnvio";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <KarsilServices />
      <WhyKarsil />
      <ContactUs />
      <CalculadoraEnvio />
    </div>
  );
}
export default HomePage;