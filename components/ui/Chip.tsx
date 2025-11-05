
import React from 'react';

interface ChipProps {
  side: 'LONG' | 'SHORT' | string;
}

const Chip: React.FC<ChipProps> = ({ side }) => {
  const isLong = side === 'LONG';
  const isShort = side === 'SHORT';

  const baseClasses = "px-3 py-1 rounded-full font-bold border text-xs tracking-wide";
  const longClasses = "text-emerald-800 bg-emerald-100 border-emerald-200";
  const shortClasses = "text-red-800 bg-red-100 border-red-200";
  const neutralClasses = "text-slate-600 bg-slate-100 border-slate-200";

  const finalClasses = `${baseClasses} ${isLong ? longClasses : isShort ? shortClasses : neutralClasses}`;

  return <span className={finalClasses}>{side}</span>;
};

export default Chip;
