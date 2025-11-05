
export interface CurvaDataPoint {
  mes: string;
  val: number;
}

export interface PortfolioItem {
  ticker: string;
  nombre: string;
  side: 'LONG' | 'SHORT' | string;
  logo: string;
  inv: number;
  profit: number;
}

export interface HistoryItem {
  openTs: string;
  closeTs: string;
  nombre: string;
  ticker: string;
  logo: string;
  side: 'LONG' | 'SHORT' | string;
  profit: number;
}

export interface RadarData {
  labels: string[];
  values: number[];
}

export interface AllocationDataPoint {
  k: string;
  v: number;
}

export interface Member {
  user: string;
  url: string;
  name: string;
  avatar: string;
}

export interface DashboardData {
  club: string;
  kpi: number;
  curva: CurvaDataPoint[];
  portfolio: PortfolioItem[];
  history: HistoryItem[];
  radar: RadarData | null;
  paisAgg: AllocationDataPoint[];
  sectorAgg: AllocationDataPoint[];
  members: Member[];
  lastUpdateStr: string;
}
