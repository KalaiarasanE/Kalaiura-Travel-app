/* ==============================================================================
   KALAIURA — FLAGSHIP HOME PAGE (MOTIONSITES AI ANIMATION INTEGRATION)
   Near-black atmosphere, champagne gold accents, editorial bento,
   interactive 3D card tilt, ambient mouse spotlight & smooth scroll reveals.
   Isolated exclusively to Home page.
   ============================================================================== */

import React from 'react';
import '../styles/homeMotion.css';
import { useHomeMotion } from '../hooks/useHomeMotion';
import { HomeCursor } from '../components/HomeCursor';
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
  const homeRef = useHomeMotion();

  const scrollToExplorer = () => {
    const explorerEl = document.getElementById('destinations-explorer');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Curated landmark preview across destinations
  const featuredPlaces = PLACES.slice(0, 6);

  return (
    <main ref={homeRef} className="home-page">
      {/* Dynamic Ambient Mouse-Follower Spotlight (Desktop Fine Pointer Only) */}
      <div className="home-ambient-spotlight" aria-hidden="true" />

      {/* Subtle Luxury Interactive Pointer Aura (Desktop Fine Pointer Only) */}
      <HomeCursor />

      {/* 1. Full-Screen Cinematic Video Hero with 3D Parallax & Staggered Entrance */}
      <Hero onExploreClick={scrollToExplorer} />

      {/* 2. Sleek Telemetry & Stats Ticker Strip with Infinite Ribbon Motion */}
      <StatsTicker />

      {/* 3. Asymmetric Destination Explorer with Motionsites Capsule Filter Bar */}
      <div style={{ paddingTop: 'var(--space-4xl)' }} data-home-reveal>
        <DestinationExplorer id="destinations-explorer" isHome={true} />
      </div>

      {/* 4. Intelligence Bento Grid Showcase with Specular Hover Glow */}
      <div data-home-reveal>
        <BentoShowcase />
      </div>

      {/* 5. Stylized Transcontinental Journey Route Map with Animated Trajectory */}
      <div data-home-reveal>
        <JourneyMap />
      </div>

      {/* 6. Curated Landmark Monuments Showcase */}
      <div className="container" style={{ paddingBottom: 'var(--space-4xl)' }} data-home-reveal>
        <FamousPlaces
          places={featuredPlaces}
          title="Monuments of Architectural Gravity"
        />
      </div>

      {/* 7. Conversational AI Guide Section */}
      <section className="container" style={{ paddingBottom: 'var(--space-4xl)' }} data-home-reveal>
        <div className="section-header centered">
          <span className="eyebrow">Intelligent Consultation</span>
          <h2 className="section-title">KALAIURA Guide</h2>
          <p className="section-subtitle">
            Engage with our cultural concierge. Inquire about seasonal light, local etiquette, or tailored pacing before setting out.
          </p>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <AIGuide initialDestinationId="kyoto" />
        </div>
      </section>

      {/* 8. Traveler Perspectives & Memoirs */}
      <div data-home-reveal>
        <TravelerPerspectives />
      </div>

      {/* 9. Editorial Pre-Footer Call to Action with Glowing Core */}
      <div data-home-reveal>
        <EditorialCTA />
      </div>
    </main>
  );
}
