import ButtonAction from "../ButtonAction/ButtonAction";

export default function HeroSection() {
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat lg:h-screen lg:grid lg:place-content-center mb-5
                 bg-[url('http://localhost:4000/public/imghero/movil_without_icon.png')] 
                 md:bg-[url('http://localhost:4000/public/imghero/small_without_icon.png')] 
                 lg:bg-[url('http://localhost:4000/public/imghero/large_without_icon.png')] "
    >
      {/* Overlay para asegurar que el texto se lea bien sobre la imagen */}
      <div className="absolute inset-0 bg-white/70 lg:bg-white/30"></div>

      <div className="relative mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="max-w-prose text-left">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Envíos rápidos y seguros de Lima a todo el Perú con 
            <strong className="text-white"> Karsil Cargo </strong>
          </h1>

          <p className="mt-4 text-base text-pretty text-gray-800 font-medium sm:text-lg/relaxed">
            Transporte de carga aérea y terrestre con la seguridad y rapidez que tu empresa necesita.
          </p>

          <div className="mt-4 flex gap-4 sm:mt-6">
            <ButtonAction texto="Cotizar ahora" />
          </div>
        </div>
      </div>
    </section>
  );
}