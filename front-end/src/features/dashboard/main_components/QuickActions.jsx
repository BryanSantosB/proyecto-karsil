import React from 'react';

const QuickActions = ({ actions = [] }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Acciones Rápidas</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 hover:border-primary-primary hover:bg-primary-primary/5 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-100 group-hover:bg-primary-primary/10 flex items-center justify-center mb-2 transition-colors">
                <Icon className="w-6 h-6 text-gray-600 group-hover:text-primary-primary transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;