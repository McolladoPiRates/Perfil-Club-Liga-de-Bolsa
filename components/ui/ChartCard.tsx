
import React from 'react';
import Card from './Card';
import SectionHeader from './SectionHeader';

interface ChartCardProps {
  title: string;
  hasData: boolean;
  noDataMessage: string;
  children: React.ReactNode;
  className?: string;
  chartClassName?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  hasData,
  noDataMessage,
  children,
  className = '',
  chartClassName = 'h-80',
}) => {
  return (
    <Card className={`h-full ${className}`}>
      <SectionHeader title={title} />
      {hasData ? (
        <div className={chartClassName}>{children}</div>
      ) : (
        <p className="text-sm text-slate-500">{noDataMessage}</p>
      )}
    </Card>
  );
};

export default ChartCard;
