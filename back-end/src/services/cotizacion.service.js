const { tarifarioAereo } = require("../data/tarifarioAereo");
const { tarifarioTerrestre } = require("../data/tarifarioTerrestre");

exports.calcularEnvio = (formData) => {
  const tarifarioActual = formData.paquete.tipoEnvio === 'aereo' ? tarifarioAereo : tarifarioTerrestre;


  // 1. Resolver ciudades de origen y destino ----------------------
  /* const ciudadOrigen =
    formData.origen.tipo === "recojo"
      ? formData.origen.provincia || formData.origen.distrito
      : formData.origen.agencia; */
  const ciudadOrigen = formData.origen.agencia;

  /* const ciudadDestino =
    formData.destino.tipo === "entrega"
      ? formData.destino.provincia || formData.destino.distrito
      : formData.destino.agencia; */
  const ciudadDestino = formData.destino.agencia;

  if (!ciudadOrigen || !ciudadDestino) {
    return { error: "Faltan datos de origen o destino" };
  }

  // 2. Resolver ruta (Lima ↔ Provincia) -----------------------------
  const esOrigenLima = ciudadOrigen.toLowerCase().includes("lima");

  const ciudadRuta = esOrigenLima
    ? ciudadDestino.toUpperCase()
    : ciudadOrigen.toUpperCase();

  const tarifasRuta = tarifarioActual[ciudadRuta];

  if (!tarifasRuta) {
    return { error: "Ruta no disponible" };
  }

  // 3. Resolver tipo de carga -------------------------------------------
  const categoria = formData.paquete.categoria;
  // general | perecible | valorizado | refrigerado

  const tarifaCarga = tarifasRuta[categoria];

  if (!tarifaCarga) {
    return { error: "Tipo de carga no disponible" };
  }

  // 4. Peso volumétrico ------------------------------------------------
  const factor = 6000;

  const pesoReal = Number(formData.paquete.peso);
  const largo = Number(formData.paquete.largo);
  const ancho = Number(formData.paquete.ancho);
  const alto = Number(formData.paquete.alto);

  const pesoVolumetrico = (largo * ancho * alto) / factor;

  console.log("Peso Real:", pesoReal);
  console.log("Peso Volumétrico:", pesoVolumetrico);
  

  const pesoCobrable = Math.max(pesoReal, pesoVolumetrico);

  console.log("Peso Cobrable:", pesoCobrable);

  // 5. Cálculo del flete -----------------------------------------------
  let costoFlete;

  console.log("Tarifa Carga:", tarifaCarga);

  if (pesoCobrable <= 1) {
    costoFlete = tarifaCarga.primerKg;
  } else {
    costoFlete =
      tarifaCarga.primerKg + (pesoCobrable - 1) * tarifaCarga.kgAdicional;
  }

  // 6. Cálculo del reparto y entrega -----------------------------------------------

  let costoRecojo = 0;  
  let costoReparto = 0;

  const repartoCfg = tarifasRuta.reparto;

  // Validación de RECOJO (Origen)
  if (formData.origen.tipo === "recojo") {
    if (pesoCobrable <= 20) {
      costoRecojo = repartoCfg.baseHasta20Kg;
    } else {
      costoRecojo =
        repartoCfg.baseHasta20Kg + (pesoCobrable - 20) * repartoCfg.kgAdicional;
    }
  }

  // Validación de ENTREGA (Destino)
  if (formData.destino.tipo === "entrega") {
    if (pesoCobrable <= 20) {
      costoReparto = repartoCfg.baseHasta20Kg;
    } else {
      costoReparto =
        repartoCfg.baseHasta20Kg + (pesoCobrable - 20) * repartoCfg.kgAdicional;
    }
  }
  // Total de los servicios de reparto
  let costoTotalReparto = costoRecojo + costoReparto;

  console.log("Costo Recojo:", costoRecojo);
  console.log("Costo Reparto:", costoReparto);  

  // 7. Total -------------------------------------------------------------
  const total = costoFlete + costoTotalReparto;

  console.log("Costo Flete:", costoFlete);
  console.log("Costo Total Reparto:", costoTotalReparto);
  console.log("Total:", total);

  return {
    ciudadRuta,
    pesoCobrable: Number(pesoCobrable.toFixed(2)),
    costoFlete: Number(costoFlete.toFixed(2)),
    costoReparto: Number(costoTotalReparto.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};
