
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div role="status" className="flex flex-col items-center justify-center space-y-2">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      <p className="text-slate-600">Cargando datos...</p>
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

export default LoadingSpinner;
