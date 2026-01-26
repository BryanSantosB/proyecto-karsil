import { send } from "@emailjs/browser";
import construirSeccion from "utils/construirSeccion";

export const enviarCorreoEnvio = async (formData) => {
  const origenHTML = construirSeccion("Origen", {
    Tipo: formData.origen.tipo === "recojo" ? formData.origen?.tipo : "Agencia",
    Agencia: formData.origen?.agencia,
    Departamento: formData.origen?.departamento,
    Provincia: formData.origen?.provincia,
    Distrito: formData.origen?.distrito,
    Dirección: formData.origen?.direccion,
    Fecha: formData.origen?.fecha,
  });

  const destinoHTML = construirSeccion("Destino", {
    Tipo: formData.destino?.tipo === "entrega" ? formData.destino?.tipo : "Agencia",
    Agencia: formData.destino?.agencia,
    Departamento: formData.destino?.departamento,
    Provincia: formData.destino?.provincia,
    Distrito: formData.destino?.distrito,
    Dirección: formData.destino?.direccion,
  });

  const paqueteHTML = construirSeccion("Paquete", {
    Peso: formData.paquete?.peso,
    Largo: formData.paquete?.largo,
    Ancho: formData.paquete?.ancho,
    Alto: formData.paquete?.alto,
    TipoEnvio: formData.paquete?.tipoEnvio,
    Categoría: formData.paquete?.categoria,
  });

  const contactoHTML = construirSeccion("Contacto", {
    Telefono: formData.contacto?.telefono,
    Email: formData.contacto?.email,
  });

  const templateParams = {
    origen_html: origenHTML,
    destino_html: destinoHTML,
    paquete_html: paqueteHTML,
    contacto_html: contactoHTML,
  };

  return send(
    process.env.REACT_APP_EMAILJS_SERVICE_ID,
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    templateParams,
    process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
  ); 

};
