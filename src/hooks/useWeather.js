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
      console.warn('AERORA Weather Hook Notice:', err);
      setError('Weather telemetry unavailable');
    } finally {
      setLoading(false);
    }
  }, [lat, lon, locationName]);

  useEffect(() => {
    let active = true;
    if (lat != null && lon != null) {
      fetchWeatherTelemetry(lat, lon, locationName)
        .then((data) => {
          if (active) setWeather(data);
        })
        .catch((err) => {
          if (active) {
            console.warn('Telemetry loading error:', err);
            setError('Weather telemetry unavailable');
          }
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }
    return () => {
      active = false;
    };
  }, [lat, lon, locationName]);

  return { weather, loading, error, refresh: fetchTelemetry };
}
