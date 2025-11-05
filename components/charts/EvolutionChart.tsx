
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../ui/ChartCard';
import type { CurvaDataPoint } from '../../types';

interface EvolutionChartProps {
  data: CurvaDataPoint[];
}

const EvolutionChart: React.FC<EvolutionChartProps> = ({ data }) => {
  const chartData = data.map(d => ({
    ...d,
    mes: new Date(d.mes).toLocaleDateString('es-ES', { month: 'short', year: '2-digit' }),
  }));
  
  return (
    <ChartCard
      title="Evolución de la rentabilidad"
      hasData={data && data.length > 0}
      noDataMessage="Sin datos de curva para este club."
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.45}/>
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(15, 23, 42, 0.06)" />
          <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{stroke: '#e2e8f0'}} tickLine={{stroke: '#e2e8f0'}}/>
          <YAxis tickFormatter={(value) => `${value}%`} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{stroke: '#e2e8f0'}} tickLine={{stroke: '#e2e8f0'}} />
          <Tooltip
            contentStyle={{ 
              borderRadius: '0.75rem', 
              borderColor: '#e2e8f0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}
            labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
            formatter={(value: number) => [`${value.toFixed(2)}%`, 'Rentabilidad']}
          />
          <Area type="monotone" dataKey="val" stroke="#F59E0B" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" dot={false} activeDot={{ r: 6 }}/>
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default EvolutionChart;
