
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from '../ui/ChartCard';
import type { RadarData } from '../../types';

interface RadarProfileChartProps {
  data: RadarData | null;
}

const RadarProfileChart: React.FC<RadarProfileChartProps> = ({ data }) => {
  const chartData = data ? data.labels.map((label, index) => ({
    subject: label,
    value: data.values[index]
  })) : [];

  return (
    <ChartCard
      title="Perfil del club (radar)"
      hasData={data && data.values.length > 0}
      noDataMessage="Sin datos de radar para este club."
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="rgba(15, 23, 42, 0.08)" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#475569' }} />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
          <Radar name="Valor" dataKey="value" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.25} />
            <Tooltip 
              contentStyle={{ 
              borderRadius: '0.75rem', 
              borderColor: '#e2e8f0'
            }}
            />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default RadarProfileChart;
