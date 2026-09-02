/* ==============================================================================
   AERORA — PERSONAL JOURNEY CONTEXT
   Interactive trip management, selected landmarks, and persistent itinerary state
   ============================================================================== */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinations';

const JourneyContext = createContext();

export function JourneyProvider({ children }) {
  const [selectedPlaces, setSelectedPlaces] = useState(() => {
    try {
      const saved = localStorage.getItem('aerora_journey_places');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeDestinationId, setActiveDestinationId] = useState(() => {
    return localStorage.getItem('aerora_active_destination') || 'kyoto';
  });

  const [savedItinerary, setSavedItinerary] = useState(() => {
    try {
      const saved = localStorage.getItem('aerora_saved_itinerary');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('aerora_journey_places', JSON.stringify(selectedPlaces));
  }, [selectedPlaces]);

  useEffect(() => {
    localStorage.setItem('aerora_active_destination', activeDestinationId);
  }, [activeDestinationId]);

  useEffect(() => {
    if (savedItinerary) {
      localStorage.setItem('aerora_saved_itinerary', JSON.stringify(savedItinerary));
    }
  }, [savedItinerary]);

  // Temporary toast notification
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addPlace = (place) => {
    if (!place || !place.id) return;

    setSelectedPlaces((prev) => {
      if (prev.some((p) => p.id === place.id)) {
        return prev;
      }
      return [...prev, place];
    });

    if (place.destinationId) {
      setActiveDestinationId(place.destinationId);
    }

    triggerToast(`Added ${place.name} to your Journey`);
  };

  const removePlace = (placeId) => {
    setSelectedPlaces((prev) => prev.filter((p) => p.id !== placeId));
    triggerToast('Place removed from Journey');
  };

  const hasPlace = (placeId) => {
    return selectedPlaces.some((p) => p.id === placeId);
  };

  const clearJourney = () => {
    setSelectedPlaces([]);
    triggerToast('Personal Journey cleared');
  };

  const currentDestination = DESTINATIONS.find((d) => d.id === activeDestinationId) || DESTINATIONS[0];

  // Calculated approximate exploration time
  const totalEstimatedHours = selectedPlaces.length * 2.2;

  return (
    <JourneyContext.Provider
      value={{
        selectedPlaces,
        activeDestination: currentDestination,
        setActiveDestinationId,
        addPlace,
        removePlace,
        hasPlace,
        clearJourney,
        savedItinerary,
        setSavedItinerary,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleDrawer: () => setIsDrawerOpen((prev) => !prev),
        totalPlaces: selectedPlaces.length,
        totalEstimatedHours,
        toastMessage
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourneyContext() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourneyContext must be used within JourneyProvider');
  }
  return context;
}
