/* ==============================================================================
   AERORA — TRIP PLANNER PAGE
   Comprehensive AI itinerary architect and day-by-day expedition planner
   ============================================================================== */

import React from 'react';
import { ItineraryBuilder } from '../components/ItineraryBuilder';
import { useJourneyContext } from '../context/JourneyContext';

export function Planner() {
  const { activeDestination } = useJourneyContext();

  return (
    <main style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))', paddingBottom: 'var(--space-4xl)' }}>
      <div className="container">
        {/* Page Header */}
        <div className="section-header">
          <span className="eyebrow">Algorithmic Voyage Synthesis</span>
          <h1 className="section-title">Trip Planner</h1>
          <p className="section-subtitle">
            Configure your destination, duration, cultural pace, and themes. AERORA generates a structured, time-stamped day-by-day itinerary ready to save or export.
          </p>
        </div>

        {/* Itinerary Builder */}
        <ItineraryBuilder initialDestinationId={activeDestination.id || 'kyoto'} />
      </div>
    </main>
  );
}
