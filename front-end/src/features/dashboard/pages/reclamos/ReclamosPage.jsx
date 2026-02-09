import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  Plus,
  CheckCircle,
  AlertCircle,
  Eye,
  Settings,
} from "lucide-react";
import { api } from "services/api";
import LibroReclamos from "features/reclamos_karsil/LibroReclamaciones";
import DetalleReclamo from "features/visualizar_reclamo/DetalleReclamo";
import StatusBadge from "features/dashboard/main_components/StatusBadge";
import StatCard from "features/dashboard/main_components/StatCard";
import ChartCard from "features/dashboard/main_components/ChartCard";
import Modal from "features/dashboard/main_components/Modal";
import DataTable from "features/dashboard/main_components/DataTable";
import GestionReclamo from "./GestionReclamo";

const ReclamosPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetalleModalOpen, setIsDetalleModalOpen] = useState(false);
  const [isGestionModalOpen, setIsGestionModalOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [listaReclamoFormat, setListaReclamoFormat] = useState([]);
  // eslint-disable-next-line
  const [listaReclamoRaw, setListaReclamoRaw] = useState([]); // Guardar datos originales
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [reclamoData, setReclamoData] = useState(null);
  const [selectedReclamoId, setSelectedReclamoId] = useState(null);

  // Función para cargar la lista de reclamos
  const cargarReclamos = () => {
    setLoading(true);
    api
      .get("/reclamos/")
      .then((response) => {
        setListaReclamoRaw(response.data); // Guardar datos originales
        setListaReclamoFormat(
          response.data.map((r) => ({
            id: `#${r.numero_reclamo}`,
            reclamoId: r.id, // ID numérico para la API
            numeroReclamo: r.numero_reclamo, // Número para búsqueda
            cliente: r.nombre_completo,
            envio: r.numero_guia,
            tipo: r.motivo_reclamo,
            fecha: new Date(r.fecha_creacion).toLocaleString(),
            prioridad: r.prioridad || "Sin prioridad",
            estado: r.estado?.codigo || "Sin estado",
            asignado: r.asignado?.nombre || "Sin asignar",
          }))
        );
      })
      .catch((err) => {
        console.error("Error al cargar reclamos:", err);
        setError("Error al cargar la lista de reclamos");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarReclamos();
    // eslint-disable-next-line
  }, []);

  const stats = [
    {
      title: "Total Reclamos",
      value: listaReclamoFormat.length.toString(),
      icon: MessageSquare,
      trend: "down",
      trendValue: "-8.3%",
    },
    {
      title: "Abiertos",
      value: listaReclamoFormat.filter((r) => r.estado === "open").length.toString(),
      icon: AlertCircle,
      trend: "up",
      trendValue: "+3.1%",
    },
    {
      title: "Resueltos Hoy",
      value: listaReclamoFormat.filter((r) => r.estado === "resolved").length.toString(),
      icon: CheckCircle,
      trend: "up",
      trendValue: "+15.4%",
    },
  ];

  const columns = [
    {
      key: "id",
      label: "ID",
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm font-semibold text-gray-900">
          {value}
        </span>
      ),
    },
    {
      key: "cliente",
      label: "Cliente",
      sortable: true,
      render: (value, row) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 font-mono">{row.envio}</p>
        </div>
      ),
    },
    {
      key: "tipo",
      label: "Tipo de Reclamo",
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-900">
          {typeof value === 'object' ? value.nombre : value}
        </span>
      ),
    },
    {
      key: "prioridad",
      label: "Prioridad",
      render: (value) => {
        const colors = {
          alta: "bg-red-100 text-red-700 border-red-200",
          media: "bg-yellow-100 text-yellow-700 border-yellow-200",
          baja: "bg-blue-100 text-blue-700 border-blue-200",
        };
        
        const prioridadCodigo = typeof value === 'object' ? value.codigo : value;
        const prioridadNombre = typeof value === 'object' ? value.nombre : value;
        
        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colors[prioridadCodigo] || 'bg-gray-100 text-gray-700 border-gray-200'}`}
          >
            {prioridadNombre}
          </span>
        );
      },
    },
    {
      key: "fecha",
      label: "Fecha",
      sortable: true,
      render: (value) => <span className="text-sm text-gray-600">{value}</span>,
    },
    {
      key: "asignado",
      label: "Asignado a",
      render: (value) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-primary to-primary-primary/80 flex items-center justify-center">
            <span className="text-xs font-semibold text-white">
              {value.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-gray-700">{value}</span>
        </div>
      ),
    },
    {
      key: "estado",
      label: "Estado",
      render: (value) => <StatusBadge status={value} size="sm" />,
    },
  ];

  const buscarReclamo = async (numeroReclamo) => {
    if (!numeroReclamo.trim()) {
      setError("Debes ingresar un número de reclamo.");
      return;
    }

    setLoading(true);
    setError("");
    setReclamoData(null);

    try {
      const response = await api.get(`/reclamos/${numeroReclamo.trim()}`);
      console.log("Reclamo cargado:", response.data.data);
      setReclamoData(response.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        setError("No se encontró ningún reclamo con ese número.");
      } else {
        setError("Ocurrió un error al buscar el reclamo. Intenta nuevamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerDetalles = (row) => {
    buscarReclamo(row.numeroReclamo);
    setIsDetalleModalOpen(true);
  };

  const handleGestionarReclamo = (row) => {
    console.log("Gestionar reclamo ID:", row);
    setSelectedReclamoId(row.numeroReclamo); // Usar el ID numérico
    setIsGestionModalOpen(true);
  };

  const handleCloseGestionModal = () => {
    setIsGestionModalOpen(false);
    setSelectedReclamoId(null);
  };

  const handleUpdateReclamo = () => {
    // Recargar la lista de reclamos después de actualizar
    console.log('Reclamo actualizado, recargando lista...');
    cargarReclamos();
  };

  const tableActions = (row) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleVerDetalles(row)}
        className="flex items-center gap-1 text-sm font-medium text-primary-primary hover:underline"
      >
        <Eye className="w-4 h-4" />
        Ver Detalles
      </button>

      <button
        onClick={() => handleGestionarReclamo(row)}
        className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <Settings className="w-4 h-4" />
        Gestionar
      </button>
    </div>
  );

  const priorities = [
    { value: "all", label: "Todas" },
    { value: "alta", label: "Alta Prioridad" },
    { value: "media", label: "Media Prioridad" },
    { value: "baja", label: "Baja Prioridad" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Reclamos
          </h1>
          <p className="text-gray-600 mt-1">
            Administra y resuelve los reclamos de clientes
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nuevo Reclamo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Response Time Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Tiempo de Respuesta Promedio"
          subtitle="Últimos 7 días"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700">
                  Menos de 2 horas
                </span>
              </div>
              <span className="text-lg font-bold text-green-700">65%</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium text-gray-700">
                  2-6 horas
                </span>
              </div>
              <span className="text-lg font-bold text-yellow-700">25%</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium text-gray-700">
                  Más de 6 horas
                </span>
              </div>
              <span className="text-lg font-bold text-red-700">10%</span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Categorías de Reclamos" subtitle="Este mes">
          <div className="space-y-3">
            {[
              { label: "Retraso en entrega", value: 42, color: "bg-blue-500" },
              { label: "Paquete dañado", value: 28, color: "bg-red-500" },
              {
                label: "Información incorrecta",
                value: 18,
                color: "bg-yellow-500",
              },
              { label: "Cobro incorrecto", value: 12, color: "bg-purple-500" },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {item.value}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Priority Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {priorities.map((priority) => (
          <button
            key={priority.value}
            onClick={() => setSelectedPriority(priority.value)}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all
              ${
                selectedPriority === priority.value
                  ? "bg-primary-primary text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }
            `}
          >
            {priority.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        title="Lista de Reclamos"
        data={listaReclamoFormat}
        columns={columns}
        actions={tableActions}
      />

      {/* Modal: Crear Nuevo Reclamo */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Registrar Nuevo Reclamo"
        size="lg"
        forceMobileLayout={true}
        footer={
          <>
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-6 py-2.5 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                console.log("Crear reclamo");
                setIsCreateModalOpen(false);
                cargarReclamos(); // Recargar después de crear
              }}
              className="px-6 py-2.5 bg-primary-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Registrar Reclamo
            </button>
          </>
        }
      >
        <LibroReclamos />
      </Modal>

      {/* Modal: Ver Detalles del Reclamo */}
      <Modal
        isOpen={isDetalleModalOpen}
        onClose={() => setIsDetalleModalOpen(false)}
        title="Detalles del Reclamo"
        size="lg"
        footer={
          <>
            <button
              onClick={() => setIsDetalleModalOpen(false)}
              className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cerrar
            </button>
          </>
        }
      >
        <div className="container-type-inline-size">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-primary-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          {reclamoData && !loading && (
            <DetalleReclamo reclamo={reclamoData.data} variant="modal" />
          )}
        </div>
      </Modal>

      {/* Modal: Gestionar Reclamo (NUEVO) */}
      <Modal
        isOpen={isGestionModalOpen}
        onClose={handleCloseGestionModal}
        title="Gestionar Reclamo"
        size="xl"
        forceMobileLayout={false}
      >
        <GestionReclamo
          reclamoId={selectedReclamoId}
          onClose={handleCloseGestionModal}
          onUpdate={handleUpdateReclamo}
        />
      </Modal>
    </div>
  );
};

export default ReclamosPage;