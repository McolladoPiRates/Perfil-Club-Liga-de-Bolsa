
export function formatPercentage(value: number | null | undefined): string {
  if (value === null || typeof value === 'undefined' || isNaN(value)) {
    return '–';
  }
  return `${value.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`;
}

export function formatDate(isoString: string | null | undefined): string {
    if(!isoString) return '–';
    try {
        return new Date(isoString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch {
        return '–';
    }
}
