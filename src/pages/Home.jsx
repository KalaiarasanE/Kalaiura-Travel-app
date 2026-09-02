/* ==============================================================================
   AERORA — HOME PAGE EXPERIENCE
   The flagship editorial showcase: Hero, Discovery, Route Map & Curated Places
   ============================================================================== */

import React from 'react';
import { Hero } from '../components/Hero';
import { DestinationExplorer } from '../components/DestinationExplorer';
import { JourneyMap } from '../components/JourneyMap';
import { FamousPlaces } from '../components/FamousPlaces';
import { AIGuide } from '../components/AIGuide';
import { PLACES } from '../data/places';

export function Home() {
  const scrollToExplorer = () => {
    const explorerEl = document.getElementById('destinations-explorer');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Curated landmark preview across destinations
  const featuredPlaces = PLACES.slice(0, 6);

  return (
    <main>
      {/* 1. Cinematic Full-Screen Hero */}
      <Hero onExploreClick={scrollToExplorer} />

      {/* 2. Asymmetric Destination Explorer */}
      <div style={{ paddingTop: 'var(--space-4xl)' }}>
        <DestinationExplorer id="destinations-explorer" />
      </div>

      {/* 3. Stylized Journey Route Map */}
      <JourneyMap />

      {/* 4. Curated Landmark Monuments Showcase */}
      <div className="container" style={{ paddingBottom: 'var(--space-4xl)' }}>
        <FamousPlaces
          places={featuredPlaces}
          title="Monuments of Architectural Gravity"
        />
      </div>

      {/* 5. AERORA Guide Section */}
      <section className="container" style={{ paddingBottom: 'var(--space-4xl)' }}>
        <div className="section-header centered">
          <span className="eyebrow">Intelligent Consultation</span>
          <h2 className="section-title">AERORA Guide</h2>
          <p className="section-subtitle">
            Engage with our cultural concierge. Inquire about seasonal light, local etiquette, or tailored pacing before setting out.
          </p>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <AIGuide initialDestinationId="kyoto" />
        </div>
      </section>
    </main>
  );
}
