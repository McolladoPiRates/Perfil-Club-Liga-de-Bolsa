
import React from 'react';

interface HeaderProps {
    clubName: string;
    lastUpdate: string;
    onSearch: (e: React.FormEvent) => void;
    inputValue: string;
    setInputValue: (value: string) => void;
    loading: boolean;
}

const Header: React.FC<HeaderProps> = ({ clubName, lastUpdate, onSearch, inputValue, setInputValue, loading }) => {
  return (
    <header className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{clubName}</h1>
            <p className="text-slate-500 text-sm mt-1">Datos actualizados: {lastUpdate || '—'}</p>
        </div>
        <form onSubmit={onSearch} className="flex items-center gap-2 w-full md:w-auto">
            <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nombre del Club o Usuario"
                aria-label="Buscar por nombre de club o usuario"
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition w-full md:w-64 disabled:bg-slate-100"
                disabled={loading}
            />
            <button 
                type="submit"
                className="px-4 py-2 w-24 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:bg-orange-300 disabled:cursor-not-allowed flex justify-center items-center"
                disabled={loading}
            >
                {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    'Buscar'
                )}
            </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
