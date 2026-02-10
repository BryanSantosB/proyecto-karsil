import React from 'react';

const StatusBadge = ({ status, size = 'md' }) => {
  const statusConfig = {
    pending: {
      label: 'Pendiente',
      className: 'bg-yellow-100 text-yellow-700 border-yellow-200'
    },
    processing: {
      label: 'En Proceso',
      className: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    completed: {
      label: 'Completado',
      className: 'bg-green-100 text-green-700 border-green-200'
    },
    rejected: {
      label: 'Rechazado',
      className: 'bg-red-100 text-red-700 border-red-200'
    },
    delivered: {
      label: 'Entregado',
      className: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    },
    in_transit: {
      label: 'En Tránsito',
      className: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    resolved: {
      label: 'Resuelto',
      className: 'bg-green-100 text-green-700 border-green-200'
    },
    open: {
      label: 'Abierto',
      className: 'bg-orange-100 text-orange-700 border-orange-200'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium border
      ${config.className}
      ${sizeClasses[size]}
    `}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
      {config.label}
    </span>
  );
};

export default StatusBadge;