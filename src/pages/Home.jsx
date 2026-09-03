/* ==============================================================================
   KALAIURA — FLAGSHIP HOME PAGE (INDIA DISCOVERY & AI INTELLIGENCE)
   Near-black atmosphere, champagne gold accents, editorial bento,
   India destination showcase, interactive AI Travel Compass, and progressive scroll reveals.
   ============================================================================== */

import React, { useEffect } from 'react';
import '../styles/homeMotion.css';
import { useHomeMotion } from '../hooks/useHomeMotion';
import { HomeCursor } from '../components/HomeCursor';
import { Hero } from '../components/Hero';
import { StatsTicker } from '../components/StatsTicker';
import { IndiaExplorer } from '../components/IndiaExplorer';
import { IndiaBeyondObvious } from '../components/IndiaBeyondObvious';
import { AITravelCompass } from '../components/AITravelCompass';
import { TrendingDestinations } from '../components/TrendingDestinations';
import { BuildJourneyCTA } from '../components/BuildJourneyCTA';
import { TravelStories } from '../components/TravelStories';
import { FinalCTA } from '../components/FinalCTA';

export function Home() {
  const homeRef = useHomeMotion();

  // Strict: Always start at top of homepage on load or reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  const scrollToIndiaExplorer = () => {
    const el = document.getElementById('explore-india');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main ref={homeRef} className="home-page">
      {/* Ambient Mouse-Follower Spotlight (Desktop Fine Pointer Only) */}
      <div className="home-ambient-spotlight" aria-hidden="true" />

      {/* Luxury Interactive Cursor Follower (Desktop Fine Pointer Only) */}
      <HomeCursor />

      {/* 01 — HERO: GO WHERE YOUR CURIOSITY LEADS */}
      <Hero onExploreClick={scrollToIndiaExplorer} />

      {/* Seamless Telemetry & Atmospheric Stats Ribbon */}
      <StatsTicker />

      {/* 02 — EXPLORE INDIA: Featured Indian Destinations & States */}
      <div data-home-reveal>
        <IndiaExplorer />
      </div>

      {/* 03 — INDIA, BEYOND THE OBVIOUS: Hidden & Rare Sanctuaries */}
      <div data-home-reveal>
        <IndiaBeyondObvious />
      </div>

      {/* 04 — AI TRAVEL GUIDE: "YOUR JOURNEY, INTELLIGENTLY CURATED." */}
      <div data-home-reveal>
        <AITravelCompass />
      </div>

      {/* 05 — TRENDING DESTINATIONS: Seasonal High-Interest Sanctuaries */}
      <div data-home-reveal>
        <TrendingDestinations />
      </div>

      {/* 06 — BUILD YOUR JOURNEY: Trip Planner Architecture CTA */}
      <div data-home-reveal>
        <BuildJourneyCTA />
      </div>

      {/* 07 — TRAVEL STORIES / INSPIRATION: Memoirs & Cultural Dispatches */}
      <div data-home-reveal>
        <TravelStories />
      </div>

      {/* 08 — FINAL CTA: "WHERE WILL YOUR CURIOSITY TAKE YOU NEXT?" */}
      <div data-home-reveal>
        <FinalCTA />
      </div>
    </main>
  );
}
