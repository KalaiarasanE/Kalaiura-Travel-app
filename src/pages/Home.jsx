/* ==============================================================================
   KALAIURA — FLAGSHIP LANDING PAGE
   Clear 5-Section Architecture:
   1. DISCOVER     (#discover)     — Hero & Telemetry
   2. DESTINATIONS (#destinations) — Curated Indian & Global Sanctuaries
   3. PLACES       (#places)       — Iconic Architectural Monuments
   4. TRIP PLANNER (#planner)      — Bespoke Voyage Architect
   5. AI GUIDE     (#ai-guide)     — Signature AI Travel Compass & Concierge
   ============================================================================== */

import React, { useEffect } from 'react';
import '../styles/homeMotion.css';
import { useHomeMotion } from '../hooks/useHomeMotion';
import { HomeCursor } from '../components/HomeCursor';
import { Hero } from '../components/Hero';
import { StatsTicker } from '../components/StatsTicker';
import { IndiaExplorer } from '../components/IndiaExplorer';
import { IndiaBeyondObvious } from '../components/IndiaBeyondObvious';
import { TrendingDestinations } from '../components/TrendingDestinations';
import { HomePlaces } from '../components/HomePlaces';
import { BuildJourneyCTA } from '../components/BuildJourneyCTA';
import { AITravelCompass } from '../components/AITravelCompass';
import { TravelStories } from '../components/TravelStories';
import { FinalCTA } from '../components/FinalCTA';

export function Home() {
  const homeRef = useHomeMotion();

  // Ensure initial load starts at top of homepage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main ref={homeRef} className="home-page">
      {/* 0-overhead sentinel for navbar scroll detection */}
      <div id="top-sentinel" style={{ position: 'absolute', top: 0, left: 0, width: '1px', height: '30px', pointerEvents: 'none' }} />

      {/* Ambient Mouse-Follower Spotlight (Desktop Fine Pointer Only) */}
      <div className="home-ambient-spotlight" aria-hidden="true" />

      {/* Luxury Interactive Cursor Follower (Desktop Fine Pointer Only) */}
      <HomeCursor />

      {/* =========================================================================
          SECTION 1: DISCOVER — HERO & TELEMETRY
          ========================================================================= */}
      <section id="discover" style={{ scrollMarginTop: 'var(--nav-height)' }}>
        <Hero onExploreClick={() => scrollToSection('destinations')} />
        <StatsTicker />
      </section>

      {/* =========================================================================
          SECTION 2: DESTINATIONS — CURATED SANCTUARIES & RETREATS
          ========================================================================= */}
      <section id="destinations" style={{ scrollMarginTop: 'var(--nav-height)' }}>
        <IndiaExplorer />
        <IndiaBeyondObvious />
        <TrendingDestinations />
      </section>

      {/* =========================================================================
          SECTION 3: PLACES — ICONIC ARCHITECTURAL & NATURAL MONUMENTS
          ========================================================================= */}
      <section id="places" style={{ scrollMarginTop: 'var(--nav-height)' }}>
        <HomePlaces />
      </section>

      {/* =========================================================================
          SECTION 4: TRIP PLANNER — VOYAGE ARCHITECT & CUSTOM ITINERARIES
          ========================================================================= */}
      <section id="planner" style={{ scrollMarginTop: 'var(--nav-height)' }}>
        <BuildJourneyCTA />
      </section>

      {/* =========================================================================
          SECTION 5: AI GUIDE — CONVERSATIONAL INTELLIGENCE & CONCIERGE
          ========================================================================= */}
      <section id="ai-guide" style={{ scrollMarginTop: 'var(--nav-height)' }}>
        <AITravelCompass />
      </section>

      {/* =========================================================================
          COMPLETION: TRAVEL STORIES & FINAL CURIOSITY CTA
          ========================================================================= */}
      <section id="stories" style={{ scrollMarginTop: 'var(--nav-height)' }}>
        <TravelStories />
      </section>

      <section id="final-cta" style={{ scrollMarginTop: 'var(--nav-height)' }}>
        <FinalCTA />
      </section>
    </main>
  );
}
