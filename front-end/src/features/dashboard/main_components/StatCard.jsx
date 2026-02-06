import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'primary-primary',
  className = '' 
}) => {
  const isPositive = trend === 'up';
  
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">{value}</h3>
          
          {trend && (
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trendValue}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs último mes</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-6 h-6 text-${color}`} style={{ color: 'var(--color-primary-primary)' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;