
import React from 'react';
import Card from './ui/Card';
import { formatPercentage } from '../utils/formatters';

interface KpiCardProps {
  value: number;
}

const KpiCard: React.FC<KpiCardProps> = ({ value }) => {
  return (
    <Card className="flex items-center justify-center bg-gradient-to-br from-yellow-100 to-blue-100 h-full min-h-[150px]">
      <div className="text-center">
        <div className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-2">
          Rentabilidad Acumulada
        </div>
        <div className="text-5xl font-black text-slate-800 tracking-tight">
          {formatPercentage(value)}
        </div>
      </div>
    </Card>
  );
};

export default KpiCard;
