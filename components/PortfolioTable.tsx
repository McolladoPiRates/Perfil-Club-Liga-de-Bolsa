
import React from 'react';
import Card from './ui/Card';
import SectionHeader from './ui/SectionHeader';
import Chip from './ui/Chip';
import AssetDisplay from './ui/AssetDisplay';
import type { PortfolioItem } from '../types';
import { formatPercentage } from '../utils/formatters';

interface PortfolioTableProps {
  portfolio: PortfolioItem[];
}

const PortfolioTable: React.FC<PortfolioTableProps> = ({ portfolio }) => {
  return (
    <Card>
      <SectionHeader title="Portfolio del Club" />
      {portfolio && portfolio.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-3 text-xs font-bold uppercase text-slate-500 tracking-wider">Activo</th>
                <th className="text-left p-3 text-xs font-bold uppercase text-slate-500 tracking-wider">Lado</th>
                <th className="text-right p-3 text-xs font-bold uppercase text-slate-500 tracking-wider">% Invertido</th>
                <th className="text-right p-3 text-xs font-bold uppercase text-slate-500 tracking-wider">Net Profit %</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3">
                    <AssetDisplay logo={item.logo} name={item.nombre} ticker={item.ticker} />
                  </td>
                  <td className="p-3">
                    {item.side ? <Chip side={item.side} /> : '–'}
                  </td>
                  <td className="p-3 text-right font-medium">{formatPercentage(item.inv)}</td>
                  <td className={`p-3 text-right font-medium ${item.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(item.profit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Sin posiciones abiertas para este club.</p>
      )}
    </Card>
  );
};

export default PortfolioTable;
