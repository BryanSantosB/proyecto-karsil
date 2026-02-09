import React, { useEffect, useState } from "react";
// eslint-disable-next-line
import {
  MessageSquare,
  Plus,
  // eslint-disable-next-line 
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import StatusBadge from "../main_components/StatusBadge";
import StatCard from "../main_components/StatCard";
import ChartCard from "../main_components/ChartCard";
import DataTable from "../main_components/DataTable";
import Modal from "../main_components/Modal";
import { api } from "services/api";

const ReclamosPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [listaReclamoFormat, setListaReclamoFormat] = useState([]);

  useEffect(() => {
    api.get("/reclamos/").then((response) => {
      setListaReclamoFormat(
        response.data.map((r) => ({
          id: `#${r.numero_reclamo}`,
          cliente: r.nombre_completo,
          envio: r.numero_guia,
          tipo: r.motivo_reclamo,
          fecha: new Date(r.fecha_creacion).toLocaleString(),
          prioridad: r.prioridad || "Sin prioridad", 
          estado: r.estado.codigo || "Sin estado", 
          asignado: r.asignado.nombre || "Sin asignar",
        })),
      );
    });
  }, []);

  const stats = [
    {
      title: "Total Reclamos",
      value: "47",
      icon: MessageSquare,
      trend: "down",
      trendValue: "-8.3%",
    },
    {
      title: "Abiertos",
      value: "23",
      icon: AlertCircle,
      trend: "up",
      trendValue: "+3.1%",
    },
    {
      title: "Resueltos Hoy",
      value: "12",
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
      render: (value) => <span className="text-sm text-gray-900">{value.nombre}</span>,
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
        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colors[value.codigo]}`}
          >
            {value.nombre}
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
              {value.charAt(0)}
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

  const tableActions = (row) => (
    <div className="flex items-center gap-2">
      <button className="text-sm font-medium text-primary-primary hover:underline">
        Ver Detalles
      </button>
      <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
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

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Registrar Nuevo Reclamo"
        size="lg"
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
              }}
              className="px-6 py-2.5 bg-primary-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Registrar Reclamo
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cliente
              </label>
              <input
                type="text"
                placeholder="Nombre del cliente"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Envío
              </label>
              <input
                type="text"
                placeholder="#ENV-XXXX"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Reclamo
              </label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent">
                <option value="">Seleccionar...</option>
                <option>Retraso en entrega</option>
                <option>Paquete dañado</option>
                <option>Paquete extraviado</option>
                <option>Información incorrecta</option>
                <option>Cobro incorrecto</option>
                <option>Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prioridad
              </label>
              <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent">
                <option value="">Seleccionar...</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción del Reclamo
            </label>
            <textarea
              rows={5}
              placeholder="Describe detalladamente el reclamo del cliente..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Asignar a
            </label>
            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent">
              <option value="">Seleccionar agente...</option>
              <option>Carlos Ruiz</option>
              <option>Ana Torres</option>
              <option>Luis Mora</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReclamosPage;