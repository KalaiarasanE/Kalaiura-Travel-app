/* ==============================================================================
   AERORA — FLAGSHIP HOME PAGE (REFERENCE DESIGN UPGRADE)
   Near-black atmosphere, champagne gold accents, editorial bento & telemetry
   ============================================================================== */

import React from 'react';
import { Hero } from '../components/Hero';
import { StatsTicker } from '../components/StatsTicker';
import { DestinationExplorer } from '../components/DestinationExplorer';
import { BentoShowcase } from '../components/BentoShowcase';
import { JourneyMap } from '../components/JourneyMap';
import { FamousPlaces } from '../components/FamousPlaces';
import { AIGuide } from '../components/AIGuide';
import { TravelerPerspectives } from '../components/TravelerPerspectives';
import { EditorialCTA } from '../components/EditorialCTA';
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
      {/* 1. Full-Screen Cinematic Video Hero with Gold Glow */}
      <Hero onExploreClick={scrollToExplorer} />

      {/* 2. Sleek Telemetry & Stats Ticker Strip */}
      <StatsTicker />

      {/* 3. Asymmetric Destination Explorer */}
      <div style={{ paddingTop: 'var(--space-4xl)' }}>
        <DestinationExplorer id="destinations-explorer" />
      </div>

      {/* 4. Intelligence Bento Grid Showcase */}
      <BentoShowcase />

      {/* 5. Stylized Transcontinental Journey Route Map */}
      <JourneyMap />

      {/* 6. Curated Landmark Monuments Showcase */}
      <div className="container" style={{ paddingBottom: 'var(--space-4xl)' }}>
        <FamousPlaces
          places={featuredPlaces}
          title="Monuments of Architectural Gravity"
        />
      </div>

      {/* 7. Conversational AI Guide Section */}
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

      {/* 8. Traveler Perspectives & Memoirs */}
      <TravelerPerspectives />

      {/* 9. Editorial Pre-Footer Call to Action */}
      <EditorialCTA />
    </main>
  );
}
