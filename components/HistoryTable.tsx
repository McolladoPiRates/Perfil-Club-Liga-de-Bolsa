
import React from 'react';
import Card from './ui/Card';
import SectionHeader from './ui/SectionHeader';
import Chip from './ui/Chip';
import AssetDisplay from './ui/AssetDisplay';
import type { HistoryItem } from '../types';
import { formatPercentage, formatDate } from '../utils/formatters';

interface HistoryTableProps {
  history: HistoryItem[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
  return (
    <Card>
      <SectionHeader title="Operaciones Cerradas" />
       {history && history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-3 text-xs font-bold uppercase text-slate-500 tracking-wider">Apertura</th>
                <th className="text-left p-3 text-xs font-bold uppercase text-slate-500 tracking-wider">Instrumento</th>
                <th className="text-left p-3 text-xs font-bold uppercase text-slate-500 tracking-wider">Lado</th>
                <th className="text-left p-3 text-xs font-bold uppercase text-slate-500 tracking-wider">Cierre</th>
                <th className="text-right p-3 text-xs font-bold uppercase text-slate-500 tracking-wider">Rentabilidad</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-3 text-sm text-slate-600">{formatDate(item.openTs)}</td>
                  <td className="p-3">
                    <AssetDisplay logo={item.logo} name={item.nombre} ticker={item.ticker} />
                  </td>
                  <td className="p-3">
                    {item.side ? <Chip side={item.side} /> : '–'}
                  </td>
                  <td className="p-3 text-sm text-slate-600">{formatDate(item.closeTs)}</td>
                  <td className={`p-3 text-right font-medium ${item.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(item.profit)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       ) : (
        <p className="text-sm text-slate-500">Sin histórico para este club.</p>
      )}
    </Card>
  );
};

export default HistoryTable;
