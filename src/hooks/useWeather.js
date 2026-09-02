/* ==============================================================================
   AERORA — useWeather Hook
   Telemetry hook for fetching destination-specific climate data
   ============================================================================== */

import { useState, useEffect, useCallback } from 'react';
import { fetchWeatherTelemetry } from '../services/weather';

export function useWeather(lat, lon, locationName = 'Destination') {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTelemetry = useCallback(async () => {
    if (lat == null || lon == null) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherTelemetry(lat, lon, locationName);
      setWeather(data);
    } catch (err) {
      setError('Weather telemetry unavailable');
    } finally {
      setLoading(false);
    }
  }, [lat, lon, locationName]);

  useEffect(() => {
    fetchTelemetry();
  }, [fetchTelemetry]);

  return { weather, loading, error, refresh: fetchTelemetry };
}
