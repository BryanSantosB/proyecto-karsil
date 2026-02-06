import React, { useState } from 'react';
import { Package, Plus, MapPin, Calendar, Filter } from 'lucide-react';
import { 
  DataTable, 
  StatusBadge, 
  Modal, 
  EmptyState,
  StatCard 
} from '../components';

const EnviosPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const stats = [
    {
      title: 'Total Envíos',
      value: '2,543',
      icon: Package,
      trend: 'up',
      trendValue: '+12.5%'
    },
    {
      title: 'En Tránsito',
      value: '156',
      icon: MapPin,
      trend: 'up',
      trendValue: '+5.2%'
    },
    {
      title: 'Entregados Hoy',
      value: '89',
      icon: Calendar,
      trend: 'up',
      trendValue: '+23.1%'
    }
  ];

  const shipments = [
    {
      id: '#ENV-1234',
      cliente: 'Juan Pérez',
      origen: 'Lima',
      destino: 'Arequipa',
      fecha: '2024-02-06 10:30',
      estado: 'in_transit',
      tracking: 'TR-4829384729',
      peso: '5.2 kg',
      monto: 'S/ 125.00'
    },
    {
      id: '#ENV-1233',
      cliente: 'María García',
      origen: 'Lima',
      destino: 'Cusco',
      fecha: '2024-02-06 09:15',
      estado: 'delivered',
      tracking: 'TR-4829384728',
      peso: '3.8 kg',
      monto: 'S/ 89.50'
    },
    {
      id: '#ENV-1232',
      cliente: 'Carlos Rodríguez',
      origen: 'Arequipa',
      destino: 'Lima',
      fecha: '2024-02-05 14:20',
      estado: 'processing',
      tracking: 'TR-4829384727',
      peso: '8.5 kg',
      monto: 'S/ 210.00'
    },
    {
      id: '#ENV-1231',
      cliente: 'Ana López',
      origen: 'Lima',
      destino: 'Trujillo',
      fecha: '2024-02-05 11:45',
      estado: 'pending',
      tracking: 'TR-4829384726',
      peso: '4.1 kg',
      monto: 'S/ 145.75'
    },
    {
      id: '#ENV-1230',
      cliente: 'Pedro Sánchez',
      origen: 'Cusco',
      destino: 'Lima',
      fecha: '2024-02-04 16:30',
      estado: 'completed',
      tracking: 'TR-4829384725',
      peso: '6.7 kg',
      monto: 'S/ 178.90'
    },
    {
      id: '#ENV-1229',
      cliente: 'Laura Martínez',
      origen: 'Lima',
      destino: 'Piura',
      fecha: '2024-02-04 13:10',
      estado: 'in_transit',
      tracking: 'TR-4829384724',
      peso: '2.9 kg',
      monto: 'S/ 95.00'
    },
    {
      id: '#ENV-1228',
      cliente: 'Roberto Fernández',
      origen: 'Trujillo',
      destino: 'Lima',
      fecha: '2024-02-04 10:00',
      estado: 'delivered',
      tracking: 'TR-4829384723',
      peso: '7.3 kg',
      monto: 'S/ 195.50'
    }
  ];

  const columns = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm font-semibold text-gray-900">{value}</span>
      )
    },
    {
      key: 'cliente',
      label: 'Cliente',
      sortable: true,
      render: (value) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
        </div>
      )
    },
    {
      key: 'origen',
      label: 'Origen → Destino',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{value}</span>
          <span className="text-gray-400">→</span>
          <span className="text-sm font-medium text-gray-900">{row.destino}</span>
        </div>
      )
    },
    {
      key: 'tracking',
      label: 'Tracking',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{value}</span>
      )
    },
    {
      key: 'fecha',
      label: 'Fecha',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-600">{value}</span>
      )
    },
    {
      key: 'peso',
      label: 'Peso',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-gray-700">{value}</span>
      )
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value) => <StatusBadge status={value} size="sm" />
    },
    {
      key: 'monto',
      label: 'Monto',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-gray-900">{value}</span>
      )
    }
  ];

  const tableActions = (row) => (
    <div className="flex items-center gap-2">
      <button className="text-sm font-medium text-primary-primary hover:underline">
        Ver Detalles
      </button>
      <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
        Rastrear
      </button>
    </div>
  );

  const filters = [
    { value: 'all', label: 'Todos' },
    { value: 'in_transit', label: 'En Tránsito' },
    { value: 'delivered', label: 'Entregados' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'processing', label: 'En Proceso' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Envíos</h1>
          <p className="text-gray-600 mt-1">Administra y rastrea todos tus envíos</p>
        </div>
        
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Nuevo Envío
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setSelectedFilter(filter.value)}
            className={`
              px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all
              ${selectedFilter === filter.value
                ? 'bg-primary-primary text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <DataTable
        title="Lista de Envíos"
        data={shipments}
        columns={columns}
        actions={tableActions}
      />

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Nuevo Envío"
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
                console.log('Crear envío');
                setIsCreateModalOpen(false);
              }}
              className="px-6 py-2.5 bg-primary-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Crear Envío
            </button>
          </>
        }
      >
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
              Teléfono
            </label>
            <input
              type="tel"
              placeholder="+51 999 999 999"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad Origen
            </label>
            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent">
              <option>Lima</option>
              <option>Arequipa</option>
              <option>Cusco</option>
              <option>Trujillo</option>
              <option>Piura</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ciudad Destino
            </label>
            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent">
              <option>Lima</option>
              <option>Arequipa</option>
              <option>Cusco</option>
              <option>Trujillo</option>
              <option>Piura</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peso (kg)
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="0.0"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Declarado (S/)
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección de Entrega
            </label>
            <input
              type="text"
              placeholder="Calle, número, distrito"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción del Contenido
            </label>
            <textarea
              rows={3}
              placeholder="Describe el contenido del paquete..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-primary focus:border-transparent resize-none"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EnviosPage;