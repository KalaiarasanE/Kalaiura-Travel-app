/* ==============================================================================
   AERORA — useLocation Hook
   Wrapper hook providing location awareness and permission controls
   ============================================================================== */

import { useLocationContext } from '../context/LocationContext';

export function useLocation() {
  const context = useLocationContext();
  return {
    currentLocation: context.currentLocation,
    weather: context.weather,
    loadingWeather: context.loadingWeather,
    weatherError: context.weatherError,
    permissionStatus: context.permissionStatus,
    isSelectorOpen: context.isSelectorOpen,
    openLocationSelector: () => context.setIsSelectorOpen(true),
    closeLocationSelector: () => context.setIsSelectorOpen(false),
    requestLocation: context.requestLocation,
    selectManualLocation: context.selectManualLocation,
    dismissPrompt: context.dismissPrompt,
    presetLocations: context.presetLocations
  };
}
