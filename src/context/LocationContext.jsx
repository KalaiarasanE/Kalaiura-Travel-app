/* ==============================================================================
   AERORA — LOCATION CONTEXT & STATE
   Global location awareness with respectful permission handling and manual overrides
   ============================================================================== */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeatherTelemetry } from '../services/weather';

const LocationContext = createContext();

const PRESET_LOCATIONS = [
  { name: 'Bengaluru', country: 'India', lat: 12.9716, lon: 77.5946 },
  { name: 'Kyoto', country: 'Japan', lat: 35.0116, lon: 135.7681 },
  { name: 'Reykjavik', country: 'Iceland', lat: 64.1466, lon: -21.9426 },
  { name: 'Santorini', country: 'Greece', lat: 36.3932, lon: 25.4615 },
  { name: 'Cape Town', country: 'South Africa', lat: -33.9249, lon: 18.4241 },
  { name: 'Lisbon', country: 'Portugal', lat: 38.7223, lon: -9.1393 },
  { name: 'New York', country: 'United States', lat: 40.7128, lon: -74.0060 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
  { name: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 }
];

export function LocationProvider({ children }) {
  // Default fallback starting location
  const [currentLocation, setCurrentLocation] = useState({
    name: 'Bengaluru',
    country: 'India',
    lat: 12.9716,
    lon: 77.5946,
    isManual: false
  });

  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  // Permission prompt state: 'prompt' | 'granted' | 'denied' | 'dismissed'
  const [permissionStatus, setPermissionStatus] = useState(() => {
    return localStorage.getItem('aerora_location_status') || 'prompt';
  });

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Fetch weather whenever location coordinates update
  useEffect(() => {
    let isMounted = true;
    async function loadTelemetry() {
      setLoadingWeather(true);
      setWeatherError(null);
      try {
        const telemetry = await fetchWeatherTelemetry(
          currentLocation.lat,
          currentLocation.lon,
          currentLocation.name
        );
        if (isMounted) {
          setWeather(telemetry);
        }
      } catch (err) {
        console.warn('AERORA Location Context:', err);
        if (isMounted) {
          setWeatherError('Weather is taking a moment to catch up.');
        }
      } finally {
        if (isMounted) {
          setLoadingWeather(false);
        }
      }
    }

    loadTelemetry();
    return () => { isMounted = false; };
  }, [currentLocation.lat, currentLocation.lon, currentLocation.name]);

  // Request browser geolocation
  const requestLocation = () => {
    if (!navigator.geolocation) {
      setPermissionStatus('denied');
      localStorage.setItem('aerora_location_status', 'denied');
      setIsSelectorOpen(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
          name: 'Your Coordinates',
          country: '',
          lat: latitude,
          lon: longitude,
          isManual: false
        });
        setPermissionStatus('granted');
        localStorage.setItem('aerora_location_status', 'granted');
      },
      (error) => {
        console.info('AERORA: Geolocation permission denied or unavailable, using graceful fallback', error.message);
        setPermissionStatus('denied');
        localStorage.setItem('aerora_location_status', 'denied');
      },
      { timeout: 8000 }
    );
  };

  // Manual city selection
  const selectManualLocation = (locationObj) => {
    setCurrentLocation({
      ...locationObj,
      isManual: true
    });
    setPermissionStatus('granted');
    localStorage.setItem('aerora_location_status', 'granted');
    setIsSelectorOpen(false);
  };

  const dismissPrompt = () => {
    setPermissionStatus('dismissed');
    localStorage.setItem('aerora_location_status', 'dismissed');
  };

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        weather,
        loadingWeather,
        weatherError,
        permissionStatus,
        isSelectorOpen,
        setIsSelectorOpen,
        requestLocation,
        selectManualLocation,
        dismissPrompt,
        presetLocations: PRESET_LOCATIONS
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within LocationProvider');
  }
  return context;
}
