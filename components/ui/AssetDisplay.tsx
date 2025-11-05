
import React from 'react';

interface AssetDisplayProps {
  logo: string;
  name: string;
  ticker: string;
}

const AssetDisplay: React.FC<AssetDisplayProps> = ({ logo, name, ticker }) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo || `https://picsum.photos/seed/${ticker}/32`}
        alt={`${name} logo`}
        className="w-8 h-8 rounded-lg bg-slate-200 border border-slate-300 object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <div>
        <div className="font-bold text-slate-800">{name}</div>
        {ticker && <div className="text-xs text-slate-500 font-medium">{ticker}</div>}
      </div>
    </div>
  );
};

export default AssetDisplay;
