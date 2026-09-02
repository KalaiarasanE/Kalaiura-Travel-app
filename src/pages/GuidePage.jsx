/* ==============================================================================
   AERORA — AI GUIDE DEDICATED PAGE
   Conversational intelligence interface for in-depth destination inquiries
   ============================================================================== */

import React from 'react';
import { AIGuide } from '../components/AIGuide';
import { useJourneyContext } from '../context/JourneyContext';

export function GuidePage() {
  const { activeDestination } = useJourneyContext();

  return (
    <main style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))', paddingBottom: 'var(--space-4xl)' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div className="section-header centered">
          <span className="eyebrow">Conversational Intelligence</span>
          <h1 className="section-title">AERORA Guide</h1>
          <p className="section-subtitle">
            Ask the place anything. Receive bespoke advice on cultural etiquette, photography windows, crowds avoidance, and unhurried pacing.
          </p>
        </div>

        <AIGuide initialDestinationId={activeDestination.id || 'kyoto'} />
      </div>
    </main>
  );
}
