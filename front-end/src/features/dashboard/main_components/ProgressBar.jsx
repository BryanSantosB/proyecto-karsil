import React from 'react';

const ProgressBar = ({ 
  label, 
  value, 
  max = 100, 
  color = 'primary-primary',
  showPercentage = true,
  size = 'md' 
}) => {
  const percentage = (value / max) * 100;
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-gray-900">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full bg-${color} rounded-full transition-all duration-500 ease-out`}
          style={{ 
            width: `${percentage}%`,
            backgroundColor: 'var(--color-primary-primary)'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;