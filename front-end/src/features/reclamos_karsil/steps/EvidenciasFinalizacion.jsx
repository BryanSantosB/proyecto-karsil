import { useState } from "react";
import { useReclamo } from "context/ReclamoContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import NavegacionPasos from "components/ui/NavegacionPasos/NavegacionPasos";
import NeumorphicContainer from "components/ui/NeumorphicContainer/NeumorphicContainer";
import CustomInput from "components/ui/CustomInput/CustomInput";

const EvidenciasFinalizacion = () => {
  const {
    datosReclamo,
    archivosEvidencia,
    actualizarDatos,
    agregarArchivos,
    eliminarArchivo,
    siguientePaso,
    anteriorPaso,
  } = useReclamo();
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const validarYContinuar = () => {
    if (isLocked) return;
    setIsLocked(true);

    try {
      const { aceptaPoliticas, firmaDigital } = datosReclamo;

      if (archivosEvidencia.length === 0) {
        setError("Debes subir al menos un archivo como evidencia de tu reclamo.");
        return;
      }

      if (archivosEvidencia.length > 10) {
        setError("No puedes subir más de 10 archivos como evidencia.");
        return;
      }

      if (!firmaDigital.trim()) {
        setError("Debes ingresar tu firma digital (tu nombre completo).");
        return;
      }

      if (firmaDigital.trim().length < 5) {
        setError("La firma debe tener al menos 5 caracteres.");
        return;
      }

      if (!aceptaPoliticas) {
        setError("Debes aceptar las políticas de privacidad para continuar.");
        return;
      }

      setError("");
      siguientePaso();
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al validar los datos.");
    } finally {
      setIsLocked(false);
    }
  };

  const handleChange = (campo, valor) => {
    actualizarDatos(campo, valor);
    setError("");
  };

  const handleFileChange = (e) => {
    const nuevosArchivos = Array.from(e.target.files);
    const archivosValidos = nuevosArchivos.filter((archivo) => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (archivo.size > maxSize) {
        setError(`El archivo ${archivo.name} excede el tamaño máximo de 5MB`);
        return false;
      }
      return true;
    });
    agregarArchivos(archivosValidos);
  };

  const calcularTamañoTotal = () => {
    const totalBytes = archivosEvidencia.reduce((acc, archivo) => acc + archivo.size, 0);
    return (totalBytes / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className="w-full px-2 flex justify-center py-8">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <NeumorphicContainer width="100%" maxWidth="800px" className="p-3 p-md-5 mt-3">
        {/* Título del paso */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📎</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 uppercase">
                  Evidencias y Finalización
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Adjunta evidencias y firma tu reclamo para finalizarlo
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mx-0 g-3">
          {/* Zona de carga de archivos */}
          <div className="col-12 px-1">
            <label className="block font-bold text-gray-600 text-sm mb-2">
              Cargar Evidencias * (Fotos, Documentos, Capturas)
            </label>
            <div
              className="border-2 border-dashed border-blue-400 rounded-xl p-8 text-center bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input
                type="file"
                id="fileInput"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="mb-3">
                <svg
                  className="mx-auto h-12 w-12 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="font-semibold text-gray-700 mb-1">
                Haz clic aquí para seleccionar archivos
              </p>
              <p className="text-sm text-gray-600">o arrastra y suelta tus archivos</p>
            </div>
            <small className="text-gray-500 text-xs mt-2 block">
              Formatos aceptados: JPG, PNG, PDF, DOC, DOCX | Tamaño máximo por archivo: 5MB
            </small>
          </div>

          {/* Lista de archivos cargados */}
          {archivosEvidencia.length > 0 && (
            <div className="col-12 px-1 mt-3">
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-gray-600 text-sm">
                  Archivos cargados ({archivosEvidencia.length}) - Total: {calcularTamañoTotal()} MB
                </p>
              </div>
              <div className="space-y-2">
                {archivosEvidencia.map((archivo, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <div>
                        <span className="text-sm font-medium text-gray-800">
                          {archivo.name}
                        </span>
                        <br />
                        <small className="text-gray-500">
                          {(archivo.size / 1024).toFixed(2)} KB
                        </small>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      onClick={() => eliminarArchivo(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Firma digital */}
          <div className="col-12 px-1 mt-4">
            <CustomInput
              label="Firma Digital (Nombre Completo) *"
              name="firmaDigital"
              type="text"
              placeholder="Escribe tu nombre completo como firma"
              value={datosReclamo.firmaDigital}
              onChange={(e) => handleChange("firmaDigital", e.target.value)}
            />
            <small className="text-gray-500 text-xs mt-1 block">
              Al firmar, certificas que la información proporcionada es verídica
            </small>
          </div>

          {/* Aceptación de políticas */}
          <div className="col-12 px-1 mt-4">
            <div className="p-4 bg-yellow-50 border-2 border-yellow-400 rounded-xl">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="aceptaPoliticas"
                  checked={datosReclamo.aceptaPoliticas}
                  onChange={(e) => handleChange("aceptaPoliticas", e.target.checked)}
                  className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="aceptaPoliticas"
                  className="text-sm cursor-pointer select-none"
                >
                  <strong className="text-gray-800">
                    Acepto las Políticas de Privacidad *
                  </strong>
                  <br />
                  <span className="text-gray-700">
                    Autorizo a Karsil Cargo al tratamiento de mis datos personales conforme a
                    la{" "}
                    <a
                      href="/politicas-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Ley N° 29733 - Ley de Protección de Datos Personales
                    </a>{" "}
                    y su Reglamento, exclusivamente para el procesamiento de este reclamo.
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="col-12 px-1 mt-3">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-2xl">ℹ️</div>
                <div>
                  <strong className="text-blue-900 text-sm">Importante:</strong>
                  <ul className="mt-2 space-y-1 text-sm text-blue-800">
                    <li>• Una vez enviado, recibirás un correo con el cargo de recepción</li>
                    <li>• Se te asignará un número de seguimiento único</li>
                    <li>• Nuestro equipo responderá en un plazo máximo de 48 horas hábiles</li>
                    <li>• Conserva tu número de reclamo para consultas futuras</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Nota de campos obligatorios */}
          <div className="col-12 mt-2">
            <p className="text-xs text-gray-500 text-center">* Campos obligatorios</p>
          </div>

          {/* Navegación */}
          <div className="col-12 mt-4">
            <NavegacionPasos
              onSiguiente={validarYContinuar}
              onVolver={anteriorPaso}
              textoSiguiente="Revisar Reclamo"
              deshabilitarSiguiente={isLocked}
            />
          </div>
        </div>
      </NeumorphicContainer>
    </div>
  );
};

export default EvidenciasFinalizacion;