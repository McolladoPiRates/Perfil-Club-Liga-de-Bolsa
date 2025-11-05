
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../ui/ChartCard';
import type { AllocationDataPoint } from '../../types';

interface AllocationChartsProps {
  paisData: AllocationDataPoint[];
  sectorData: AllocationDataPoint[];
}

const CustomBarChart: React.FC<{ data: AllocationDataPoint[], color: string, dataKey: string }> = ({ data, color, dataKey }) => (
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(15, 23, 42, 0.06)" />
            <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={{stroke: '#e2e8f0'}} tickLine={{stroke: '#e2e8f0'}}/>
            <YAxis type="category" dataKey="k" width={80} tick={{ fontSize: 12, fill: '#475569' }} axisLine={{stroke: '#e2e8f0'}} tickLine={false} />
            <Tooltip
                cursor={{ fill: 'rgba(239, 242, 247, 0.5)' }}
                contentStyle={{ borderRadius: '0.75rem', borderColor: '#e2e8f0' }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, dataKey]}
            />
            <Bar dataKey="v" fill={color} background={{ fill: '#f1f5f9' }} barSize={20} />
        </BarChart>
    </ResponsiveContainer>
);


const AllocationCharts: React.FC<AllocationChartsProps> = ({ paisData, sectorData }) => {
  const hasData = (paisData && paisData.length > 0) || (sectorData && sectorData.length > 0);

  return (
    <ChartCard
      title="Asset Allocation"
      hasData={hasData}
      noDataMessage="Sin datos de país/sector para este club."
      chartClassName="grid grid-cols-1 xl:grid-cols-2 gap-8 h-[22.5rem]"
    >
      <div>
        <h3 className="font-bold text-sm text-slate-600 mb-2">% por País</h3>
          {paisData && paisData.length > 0 ? (
            <CustomBarChart data={paisData} color="#3B82F6" dataKey="País" />
          ) : <p className="text-sm text-slate-500 text-center mt-8">Sin datos.</p>}
      </div>
      <div>
        <h3 className="font-bold text-sm text-slate-600 mb-2">% por Sector</h3>
          {sectorData && sectorData.length > 0 ? (
              <CustomBarChart data={sectorData} color="#F59E0B" dataKey="Sector" />
          ) : <p className="text-sm text-slate-500 text-center mt-8">Sin datos.</p>}
      </div>
    </ChartCard>
  );
};

export default AllocationCharts;
