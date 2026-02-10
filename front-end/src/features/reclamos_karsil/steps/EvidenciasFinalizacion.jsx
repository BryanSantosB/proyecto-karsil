import { useState } from "react";
import { useReclamo } from "context/ReclamoContext";
import AlertaFlotante from "components/ui/AlertaFlotante/AlertaFlotante";
import CustomInput from "components/ui/CustomInput/CustomInput";
import { UploadCloud, X } from "lucide-react";
import FormCard from "../main_components/FormCard";
import StepHeader from "../main_components/StepHeader";
import FormField from "../main_components/FormField";
import StepNavigation from "../main_components/StepNavigation";

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
  const [isDragging, setIsDragging] = useState(false);

  const validarYContinuar = () => {
    if (isLocked) return;
    setIsLocked(true);
    try {
      const { aceptaPoliticas, firmaDigital } = datosReclamo;
      if (archivosEvidencia.length === 0)    return setError("Debes subir al menos un archivo como evidencia de tu reclamo.");
      if (archivosEvidencia.length > 10)     return setError("No puedes subir más de 10 archivos como evidencia.");
      if (!firmaDigital.trim())              return setError("Debes ingresar tu firma digital (tu nombre completo).");
      if (firmaDigital.trim().length < 5)    return setError("La firma debe tener al menos 5 caracteres.");
      if (!aceptaPoliticas)                  return setError("Debes aceptar las políticas de privacidad para continuar.");
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

  const processFiles = (files) => {
    const archivosValidos = Array.from(files).filter((archivo) => {
      const maxSize = 5 * 1024 * 1024;
      if (archivo.size > maxSize) {
        setError(`El archivo "${archivo.name}" excede el tamaño máximo de 5MB`);
        return false;
      }
      return true;
    });
    if (archivosValidos.length) agregarArchivos(archivosValidos);
  };

  const handleFileChange = (e) => processFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const calcularTamañoTotal = () => {
    const totalBytes = archivosEvidencia.reduce((acc, archivo) => acc + archivo.size, 0);
    return (totalBytes / (1024 * 1024)).toFixed(2);
  };

  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return '🖼️';
    if (ext === 'pdf') return '📄';
    if (['doc', 'docx'].includes(ext)) return '📝';
    return '📎';
  };

  return (
    <div className="w-full px-4 py-6 flex justify-center">
      <AlertaFlotante mensaje={error} onClose={() => setError("")} />

      <FormCard>
        <StepHeader
          icon="📎"
          title="Evidencias y Finalización"
          description="Adjunta evidencias y firma tu reclamo para finalizarlo"
        />

        <div className="space-y-6">
          {/* Zona de carga de archivos */}
          <FormField label="Evidencias" required hint="Formatos: JPG, PNG, PDF, DOC, DOCX · Máx. 5MB por archivo · Máx. 10 archivos">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
              className={`
                relative flex flex-col items-center justify-center gap-3
                px-6 py-10 rounded-xl border-2 border-dashed cursor-pointer
                transition-all duration-200
                ${isDragging
                  ? 'border-primary-primary bg-primary-primary/5'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                }
              `}
            >
              <input
                type="file"
                id="fileInput"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <UploadCloud className={`w-10 h-10 transition-colors ${isDragging ? 'text-primary-primary' : 'text-gray-400'}`} />
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">
                  Haz clic para seleccionar o arrastra tus archivos aquí
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  JPG, PNG, PDF, DOC, DOCX
                </p>
              </div>
            </div>
          </FormField>

          {/* Lista de archivos cargados */}
          {archivosEvidencia.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-700">
                  Archivos adjuntos
                  <span className="ml-2 px-2 py-0.5 bg-primary-primary/10 text-primary-primary text-xs font-semibold rounded-full">
                    {archivosEvidencia.length}
                  </span>
                </p>
                <p className="text-xs text-gray-400">Total: {calcularTamañoTotal()} MB</p>
              </div>

              <div className="space-y-2">
                {archivosEvidencia.map((archivo, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg group hover:border-gray-300 transition-colors"
                  >
                    <span className="text-xl flex-shrink-0">{getFileIcon(archivo.name)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{archivo.name}</p>
                      <p className="text-xs text-gray-400">{(archivo.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); eliminarArchivo(index); }}
                      className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Firma digital */}
          <FormField
            label="Firma Digital"
            required
            hint="Escribe tu nombre completo como firma. Certifica que la información es verídica."
          >
            <CustomInput
              name="firmaDigital"
              type="text"
              placeholder="Escribe tu nombre completo"
              value={datosReclamo.firmaDigital}
              onChange={(e) => handleChange("firmaDigital", e.target.value)}
            />
          </FormField>

          {/* Aceptación de políticas */}
          <div className={`
            flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
            ${datosReclamo.aceptaPoliticas
              ? 'border-green-400 bg-green-50'
              : 'border-gray-200 bg-gray-50 hover:border-gray-300'
            }
          `}
            onClick={() => handleChange("aceptaPoliticas", !datosReclamo.aceptaPoliticas)}
          >
            <div className={`
              flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-all
              ${datosReclamo.aceptaPoliticas
                ? 'bg-green-500 border-green-500'
                : 'bg-white border-gray-300'
              }
            `}>
              {datosReclamo.aceptaPoliticas && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div className="text-sm">
              <p className={`font-semibold ${datosReclamo.aceptaPoliticas ? 'text-green-800' : 'text-gray-700'}`}>
                Acepto las Políticas de Privacidad *
              </p>
              <p className={`mt-1 text-xs leading-relaxed ${datosReclamo.aceptaPoliticas ? 'text-green-700' : 'text-gray-500'}`}>
                Autorizo a Karsil Cargo al tratamiento de mis datos personales conforme a la{" "}
                <a href="/politicas-privacidad" target="_blank" rel="noopener noreferrer"
                  className="text-primary-primary hover:underline font-medium"
                  onClick={(e) => e.stopPropagation()}>
                  Ley N° 29733 de Protección de Datos Personales
                </a>
                {" "}exclusivamente para el procesamiento de este reclamo.
              </p>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <span className="text-lg flex-shrink-0 mt-0.5">ℹ️</span>
            <div className="text-xs text-blue-700 space-y-1">
              <p className="font-semibold text-blue-800 mb-1">Importante:</p>
              <p>• Recibirás un correo con el cargo de recepción</p>
              <p>• Se te asignará un número de seguimiento único</p>
              <p>• Nuestro equipo responderá en un plazo máximo de 48 horas hábiles</p>
              <p>• Conserva tu número de reclamo para consultas futuras</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-right">* Campos obligatorios</p>

          <StepNavigation
            onSiguiente={validarYContinuar}
            onVolver={anteriorPaso}
            textoSiguiente="Revisar Reclamo"
            deshabilitarSiguiente={isLocked}
          />
        </div>
      </FormCard>
    </div>
  );
};

export default EvidenciasFinalizacion;