/* ==============================================================================
   KALAIURA — TRENDING DESTINATIONS SECTION
   Seasonal high-interest sanctuaries across India with live climate telemetry
   ============================================================================== */

import React from 'react';
import { INDIA_DESTINATIONS } from '../data/indiaDestinations';
import { IndiaCard } from './IndiaCard';

export function TrendingDestinations() {
  const trending = INDIA_DESTINATIONS.filter(d => d.isTrending).slice(0, 3);

  return (
    <section className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="section-header centered" data-home-reveal>
        <span className="eyebrow">Peak Inquiries & Seasonal Windows</span>
        <h2 className="section-title">
          Trending <span className="animate-gradient-shift">Sanctuaries</span>
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
          Currently experiencing optimal diurnal temperatures, quiet shoulder seasons, or rare cultural festivals.
        </p>
      </div>

      <div
        data-home-reveal
        data-home-reveal-delay="1"
        className="india-cards-grid"
      >
        {trending.map((dest, idx) => (
          <IndiaCard key={dest.id} destination={dest} index={idx} />
        ))}
      </div>
    </section>
  );
}
