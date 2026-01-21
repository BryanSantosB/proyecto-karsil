import { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  // Control de navegación (Paso 1, 2, 3 o 4)
  const [paso, setPaso] = useState(1);

  // El objeto que almacena todos los datos del formulario
  const [formData, setFormData] = useState({
    origen: {
      tipo: "recojo", 
      ciudad: "",
      departamento: "",
      provincia: "",
      distrito: "",
      direccion: "",
      referencia: "",
      fecha: ""
    },
    destino: {
      tipo: "entrega",
      ciudad: "",
      direccion: "",
      referencia: ""
    },
    paquete: {
      peso: "", largo: "", ancho: "", alto: "", 
      tipoEnvio: "",
      categoria: ""
    }
  });

  // Funciones para movernos entre pasos
  const siguientePaso = () => setPaso((prev) => prev + 1);
  const anteriorPaso = () => setPaso((prev) => prev - 1);

  // Función para actualizar datos de forma dinámica
  // section: "origen", "destino", etc.
  // data: el objeto con los cambios { ciudad: "Lima" }
  const actualizarDatos = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  return (
    <FormContext.Provider value={{ paso, formData, siguientePaso, anteriorPaso, actualizarDatos }}>
      {children}
    </FormContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useForm = () => useContext(FormContext);