/* ==============================================================================
   AERORA — FAMOUS PLACES SECTION
   Rich architectural and natural landmark showcase
   ============================================================================== */

import React from 'react';
import { PlaceCard } from './PlaceCard';
import { Icon } from './Icons';
import { useJourneyContext } from '../context/JourneyContext';

export function FamousPlaces({ places = [], destinationName, title = 'The Places That Define It' }) {
  const { totalPlaces, toggleDrawer } = useJourneyContext();

  if (!places || places.length === 0) return null;

  return (
    <section className="famous-places-section" style={{ padding: 'var(--space-3xl) 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-2xl)'
        }}
      >
        <div>
          <span className="eyebrow">Monuments & Sanctuaries</span>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">
            Curated points of cultural gravity in {destinationName || 'each region'} that leave an indelible mark on memory.
          </p>
        </div>

        {/* Small Journey Counter Pill */}
        <button
          onClick={toggleDrawer}
          className="btn-ghost"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--ls-wide)',
            textTransform: 'uppercase',
            color: 'var(--color-text-secondary)'
          }}
        >
          <Icon name="bookmark" size={13} style={{ color: 'var(--color-accent)' }} />
          <span>Journey Plan: <strong style={{ color: 'var(--color-text-primary)' }}>{totalPlaces}</strong> Selected</span>
        </button>
      </div>

      {/* Visually Rich Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-xl)'
        }}
      >
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}
