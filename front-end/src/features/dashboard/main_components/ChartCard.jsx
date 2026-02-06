import React from 'react';
import { MoreVertical } from 'lucide-react';

const ChartCard = ({ 
  title, 
  subtitle,
  children, 
  className = '',
  actions 
}) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          
          {actions && (
            <button className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default ChartCard;