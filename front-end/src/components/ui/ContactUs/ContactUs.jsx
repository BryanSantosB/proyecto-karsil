// ============================================
// DATOS DEL COMPONENTE (Fácil de editar)
// ============================================

import { forwardRef, useState } from "react";
import { CONTACT_DATA } from "./contactUs_Data";
import { api } from "services/api";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import ModalConfirmacion from "../ModalConfirmacion/ModalConfirmacion";
// ============================================
// COMPONENTE UI (Solo presentación)
// ============================================

export const ContactUs = forwardRef((props, ref) => {

  const [formValues, setFormValues] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
    }));

    console.log(formValues);
  };

  const cerrarYReiniciar = () => {
    setMostrarExito(false);
    window.location.href = "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario  
    console.log("Formulario enviado: ", formValues);
    setEnviando(true)
    try {
        await api.post("/correo/contacto", formValues);
        setMostrarExito(true);
    } catch (error) {
        alert("Error al enviar el mensaje: ", error.message);
    } finally {
        setEnviando(false);
    }
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center mb-5"
      style={{ backgroundImage: `url('${CONTACT_DATA.backgroundImage}')` }}
      ref={ref}
    >

      {}{enviando && (
        <LoadingOverlay mensaje="Cargando Página..." />
      )}

      <ModalConfirmacion
        isOpen={mostrarExito}
        mensaje="¡Tu envío ha sido registrado!"
        submensaje="Un asesor de Karsil revisará los detalles y te contactará por WhatsApp en breve."
        onCerrar={cerrarYReiniciar}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-primary-primary/80" />

      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 size-96 bg-primary-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 size-96 bg-primary-light/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Columna izquierda - Información */}
          <div className="text-white space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-primary/20 backdrop-blur-sm border border-primary-primary/30">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-primary-light opacity-75 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-primary-light" />
              </span>
              <span className="text-sm font-semibold text-primary-light uppercase tracking-wide">
                {CONTACT_DATA.badge.text}
              </span>
            </div>

            {/* Título */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                {CONTACT_DATA.hero.title}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary-primary to-primary-light bg-clip-text text-transparent">
                    {CONTACT_DATA.hero.highlightedWord}
                  </span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary-primary/20 -rotate-1" />
                </span>{" "}
                {CONTACT_DATA.hero.subtitle}
              </h2>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                {CONTACT_DATA.hero.description}
              </p>
            </div>

            {/* Características */}
            <div className="space-y-4">
              {CONTACT_DATA.features.map((feature) => (
                <div key={feature.id} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 size-12 rounded-lg bg-primary-primary/20 flex items-center justify-center group-hover:bg-primary-primary transition-all duration-300">
                    <svg
                      className="size-6 text-primary-light group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={feature.icon}
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Redes sociales */}
            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-gray-300 font-semibold mb-4">
                {CONTACT_DATA.socialMedia.title}
              </h3>
              <div className="flex items-center gap-3">
                {CONTACT_DATA.socialMedia.platforms.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="size-11 rounded-full bg-gray-800/50 hover:bg-primary-primary flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  >
                    <svg
                      className="size-5 text-gray-300 group-hover:text-white transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.iconPath} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Info de contacto directo */}
            <div className="hidden lg:grid grid-cols-2 gap-6 pt-6">
              {CONTACT_DATA.contactInfo.map((contact) => (
                <div key={contact.id} className="space-y-2">
                  <div className="flex items-center gap-2 text-primary-light">
                    <svg
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={contact.icon}
                      />
                    </svg>
                    <span className="font-semibold">{contact.label}</span>
                  </div>
                  <p className="text-gray-300">{contact.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {CONTACT_DATA.form.title}
              </h3>
              <p className="text-gray-600 mb-8">{CONTACT_DATA.form.subtitle}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos del formulario */}
                {CONTACT_DATA.form.fields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formValues[field.name] || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-primary focus:ring-4 focus:ring-primary-primary/10 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
                    />
                  </div>
                ))}

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor={CONTACT_DATA.form.messageField.name}
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {CONTACT_DATA.form.messageField.label}
                    {CONTACT_DATA.form.messageField.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  <textarea
                    id={CONTACT_DATA.form.messageField.name}
                    name={CONTACT_DATA.form.messageField.name}
                    rows={CONTACT_DATA.form.messageField.rows}
                    placeholder={CONTACT_DATA.form.messageField.placeholder}
                    required={CONTACT_DATA.form.messageField.required}
                    value={formValues[CONTACT_DATA.form.messageField.name] || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-primary focus:ring-4 focus:ring-primary-primary/10 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400 resize-none"
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    checked={formValues.terms || false}
                    onChange={handleChange}
                    className="mt-1 size-5 rounded border-gray-300 text-primary-primary focus:ring-primary-primary/20"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    {CONTACT_DATA.form.terms.text}{" "}
                    <a
                      href={CONTACT_DATA.form.terms.linkTerms.url}
                      className="text-primary-primary hover:text-primary-light font-semibold"
                    >
                      {CONTACT_DATA.form.terms.linkTerms.text}
                    </a>{" "}
                    {CONTACT_DATA.form.terms.middleText}{" "}
                    <a
                      href={CONTACT_DATA.form.terms.linkPrivacy.url}
                      className="text-primary-primary hover:text-primary-light font-semibold"
                    >
                      {CONTACT_DATA.form.terms.linkPrivacy.text}
                    </a>
                  </label>
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-primary to-primary-light hover:from-primary-light hover:to-primary-primary text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl shadow-primary-primary/30 hover:shadow-primary-primary/50 flex items-center justify-center gap-2 group"
                >
                  <span>{CONTACT_DATA.form.submitButton.text}</span>
                  <svg
                    className="size-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={CONTACT_DATA.form.submitButton.icon}
                    />
                  </svg>
                </button>
              </form>

              {/* Info adicional */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  {CONTACT_DATA.form.securityNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
