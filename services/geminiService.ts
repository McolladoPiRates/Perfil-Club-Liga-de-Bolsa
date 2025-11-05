import type { DashboardData } from '../types';

/**
 * Obtiene los datos del dashboard desde la API creada con Google Apps Script.
 * @param clubName El nombre del club/perfil para el que se obtendrán los datos.
 * @returns Una promesa que se resuelve con el objeto DashboardData.
 */
export async function fetchDashboardData(clubName: string): Promise<DashboardData> {
  const APPS_SCRIPT_URL = `https://script.google.com/macros/s/AKfycbx7yoETrt7ohh379x8sSZBUqWjDCWidOwo5IbdT0Bcf3tC76WBkPnF-J7qRyfw1o-0TjA/exec`;

  // Construimos la URL final añadiendo el parámetro como 'user' para que el script lo resuelva correctamente.
  const url = `${APPS_SCRIPT_URL}?user=${encodeURIComponent(clubName)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la respuesta de Google Apps Script: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
        throw new Error(`Error en la API de Apps Script: ${data.error}`);
    }

    // La API de Apps Script debe devolver los datos con la misma estructura que la interfaz DashboardData.
    return data as DashboardData;

  } catch (error) {
    console.error("Error al obtener datos desde Google Apps Script:", error);
    // Este error será capturado en el componente App.tsx para mostrar un mensaje al usuario.
    throw new Error("No se pudieron obtener los datos del dashboard desde el servidor de Google.");
  }
}
