import React, { useState } from 'react';
import { 
  Package, 
  MessageSquare, 
  TrendingUp, 
  Users,
  Plus,
  FileText,
  Clock,
  CheckCircle
} from 'lucide-react';
import StatusBadge from '../main_components/StatusBadge';
import StatCard from '../main_components/StatCard';
import QuickActions from '../main_components/QuickActions';
import ChartCard from '../main_components/ChartCard';
import ProgressBar from '../main_components/ProgressBar';
import DataTable from '../main_components/DataTable';
import Modal from '../main_components/Modal';
import CalculadoraEnvio from 'features/calculadora_envio/CalculadoraEnvio';
import LibroReclamos from 'features/reclamos_karsil/LibroReclamaciones';

const DashboardHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalReclamo, setModalReclamo] = useState(false);

  // Datos de ejemplo
  const stats = [
    {
      title: 'Total Envíos',
      value: '2,543',
      icon: Package,
      trend: 'up',
      trendValue: '+12.5%'
    },
    {
      title: 'Reclamos Activos',
      value: '47',
      icon: MessageSquare,
      trend: 'down',
      trendValue: '-8.3%'
    },
    {
      title: 'Clientes Activos',
      value: '1,284',
      icon: Users,
      trend: 'up',
      trendValue: '+18.2%'
    },
    {
      title: 'Tasa de Entrega',
      value: '98.5%',
      icon: TrendingUp,
      trend: 'up',
      trendValue: '+2.1%'
    }
  ];

  const quickActions = [
    {
      icon: Plus,
      label: 'Nuevo Envío',
      onClick: () => setIsModalOpen(true)
    },
    {
      icon: MessageSquare,
      label: 'Nuevo Reclamo',
      onClick: () => setModalReclamo(true)
    },
    {
      icon: FileText,
      label: 'Generar Reporte',
      onClick: () => console.log('Generar reporte')
    },
    {
      icon: Users,
      label: 'Nuevo Cliente',
      onClick: () => console.log('Nuevo cliente')
    }
  ];

  const recentShipments = [
    {
      id: '#ENV-1234',
      cliente: 'Juan Pérez',
      destino: 'Lima, Perú',
      fecha: '2024-02-06',
      estado: 'in_transit',
      monto: 'S/ 125.00'
    },
    {
      id: '#ENV-1233',
      cliente: 'María García',
      destino: 'Arequipa, Perú',
      fecha: '2024-02-06',
      estado: 'delivered',
      monto: 'S/ 89.50'
    },
    {
      id: '#ENV-1232',
      cliente: 'Carlos Rodríguez',
      destino: 'Cusco, Perú',
      fecha: '2024-02-05',
      estado: 'processing',
      monto: 'S/ 210.00'
    },
    {
      id: '#ENV-1231',
      cliente: 'Ana López',
      destino: 'Trujillo, Perú',
      fecha: '2024-02-05',
      estado: 'pending',
      monto: 'S/ 145.75'
    },
    {
      id: '#ENV-1230',
      cliente: 'Pedro Sánchez',
      destino: 'Piura, Perú',
      fecha: '2024-02-04',
      estado: 'completed',
      monto: 'S/ 178.90'
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
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'destino',
      label: 'Destino',
      sortable: true
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
        Ver
      </button>
      <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
        Editar
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Bienvenido de vuelta, aquí está tu resumen de hoy</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1 - Example with Progress Bars */}
        <ChartCard 
          title="Rendimiento por Región" 
          subtitle="Últimos 30 días"
          actions
        >
          <div className="space-y-4">
            <ProgressBar label="Lima" value={85} />
            <ProgressBar label="Arequipa" value={72} />
            <ProgressBar label="Cusco" value={65} />
            <ProgressBar label="Trujillo" value={58} />
            <ProgressBar label="Piura" value={45} />
          </div>
        </ChartCard>

        {/* Chart 2 - Activity Summary */}
        <ChartCard 
          title="Actividad Reciente" 
          subtitle="Últimas 24 horas"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">45 envíos completados</p>
                <p className="text-xs text-gray-600">Hace 2 horas</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">12 envíos en proceso</p>
                <p className="text-xs text-gray-600">Hace 4 horas</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">3 nuevos reclamos</p>
                <p className="text-xs text-gray-600">Hace 6 horas</p>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Recent Shipments Table */}
      <DataTable
        title="Envíos Recientes"
        data={recentShipments}
        columns={columns}
        actions={tableActions}
      />

      {/* Example Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nuevo Envío"
        size="full"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                console.log('Crear envío');
                setIsModalOpen(false);
              }}
              className="px-4 py-2 bg-primary-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Crear Envío
            </button>
          </>
        }
      >
        <CalculadoraEnvio />
      </Modal>
      <Modal
        isOpen={modalReclamo}
        onClose={() => setModalReclamo(false)}
        title="Nuevo Reclamo"
        size="full"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                console.log('Crear envío');
                setIsModalOpen(false);
              }}
              className="px-4 py-2 bg-primary-primary text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Crear Envío
            </button>
          </>
        }
      >
        <LibroReclamos />
      </Modal>
    </div>
  );
};

export default DashboardHome;