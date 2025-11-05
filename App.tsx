
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { fetchDashboardData } from './services/geminiService';
import type { DashboardData } from './types';
import Header from './components/Header';
import KpiCard from './components/KpiCard';
import MembersList from './components/MembersList';
import EvolutionChart from './components/charts/EvolutionChart';
import RadarProfileChart from './components/charts/RadarProfileChart';
import AllocationCharts from './components/charts/AllocationCharts';
import PortfolioTable from './components/PortfolioTable';
import HistoryTable from './components/HistoryTable';
import Card from './components/ui/Card';
import LoadingSpinner from './components/ui/LoadingSpinner';

const App: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [clubName, setClubName] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('club') || 'mcolladoetf';
  });
  const [inputValue, setInputValue] = useState<string>(clubName);
  
  const mainRef = useRef<HTMLElement>(null);

  // Efecto para comunicar la altura al padre (WordPress)
  useEffect(() => {
    const sendHeight = () => {
      if (mainRef.current) {
        // Añadimos un pequeño margen para evitar recortes
        const height = mainRef.current.scrollHeight + 24;
        // postMessage es el método estándar para comunicar iframes
        window.parent.postMessage({ type: 'resize-embed', height }, '*');
      }
    };

    // Enviar altura cuando cambian los datos o el estado de carga
    sendHeight();

    // Usamos ResizeObserver para detectar cambios de tamaño dinámicos
    const resizeObserver = new ResizeObserver(() => {
      sendHeight();
    });

    if (mainRef.current) {
      resizeObserver.observe(mainRef.current);
    }
    
    // Función de limpieza para evitar memory leaks
    return () => {
      if (mainRef.current) {
        resizeObserver.unobserve(mainRef.current);
      }
    };
  }, [dashboardData, loading, error]);


  const loadData = useCallback(async (name: string) => {
    if (!name) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDashboardData(name);
      setDashboardData(data);
      if (data.club) {
        setInputValue(data.club);
      }
    } catch (err) {
      setError('No se pudieron obtener los datos. Revisa el nombre del club e inténtalo de nuevo.');
      console.error(err);
      setDashboardData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(clubName);
  }, [clubName, loadData]);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const newClub = params.get('club') || 'mcolladoetf';
      setClubName(newClub);
      setInputValue(newClub);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newClub = inputValue.trim();
    if (newClub && newClub !== clubName) {
      setDashboardData(null); // Clear previous data for better UX on search
      setClubName(newClub);
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('club', newClub);
      window.history.pushState({ path: newUrl.href }, '', newUrl.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FBF7EF] to-[#F6F8FF] text-[#0F172A] font-sans">
      <main ref={mainRef} className="max-w-7xl mx-auto py-7 px-4 sm:px-6 lg:px-8">
        <Header 
          clubName={dashboardData?.club || clubName} 
          lastUpdate={dashboardData?.lastUpdateStr || ''}
          onSearch={handleSearch}
          inputValue={inputValue}
          setInputValue={setInputValue}
          loading={loading}
        />

        {loading && (
          <div className="flex justify-center items-center h-96">
            <LoadingSpinner />
          </div>
        )}

        {error && !loading && (
          <Card>
            <p className="text-center text-red-500">{error}</p>
          </Card>
        )}

        {dashboardData && !loading && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              <div className="lg:col-span-3">
                <EvolutionChart data={dashboardData.curva} />
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                <KpiCard value={dashboardData.kpi} />
                <MembersList members={dashboardData.members} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                 <div className="md:col-span-2 lg:col-span-1">
                    <RadarProfileChart data={dashboardData.radar} />
                 </div>
                 <div className="md:col-span-2">
                    <AllocationCharts paisData={dashboardData.paisAgg} sectorData={dashboardData.sectorAgg} />
                 </div>
            </div>

            <PortfolioTable portfolio={dashboardData.portfolio} />
            <HistoryTable history={dashboardData.history} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
