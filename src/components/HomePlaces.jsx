/* ==============================================================================
   KALAIURA — HOME PLACES & MONUMENTS SHOWCASE
   Section 3: High-performance curated landmark architectural and natural showcase
   ============================================================================== */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PLACES } from '../data/places';
import { PlaceCard } from './PlaceCard';
import { Icon } from './Icons';
import { useJourneyContext } from '../context/JourneyContext';

const CATEGORIES = ['All', 'Imperial & Palaces', 'Water Sanctuaries', 'Temples & Antiquity', 'Bio-Wonders'];

export function HomePlaces() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { totalPlaces, toggleDrawer } = useJourneyContext();

  // Curate iconic landmarks across India and global sanctuaries
  const curatedPlaces = PLACES.filter((place) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Imperial & Palaces') {
      return place.category?.toLowerCase().includes('palace') || place.category?.toLowerCase().includes('citadel') || place.category?.toLowerCase().includes('imperial');
    }
    if (selectedCategory === 'Water Sanctuaries') {
      return place.category?.toLowerCase().includes('water') || place.category?.toLowerCase().includes('lake') || place.category?.toLowerCase().includes('canal');
    }
    if (selectedCategory === 'Temples & Antiquity') {
      return place.category?.toLowerCase().includes('temple') || place.category?.toLowerCase().includes('shrine') || place.category?.toLowerCase().includes('architecture');
    }
    if (selectedCategory === 'Bio-Wonders') {
      return place.category?.toLowerCase().includes('bio') || place.category?.toLowerCase().includes('nature') || place.category?.toLowerCase().includes('garden');
    }
    return true;
  }).slice(0, 6);

  return (
    <section id="places" className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      {/* Section Header */}
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
          <span className="eyebrow">03 — Architectural Gravity</span>
          <h2 className="section-title">
            Curated <span className="animate-gradient-shift">Places & Monuments</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '640px' }}>
            From ancient monolithic chariots to living root bridges, explore the cultural monuments that leave an indelible mark on memory.
          </p>
        </div>

        {/* Action Controls: All Places Link & Saved Journey Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
          <button
            onClick={toggleDrawer}
            className="btn-ghost"
            aria-label="View saved journey places"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 0.95rem',
              border: '1px solid rgba(224, 162, 77, 0.3)',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(224, 162, 77, 0.08)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--ls-wide)',
              textTransform: 'uppercase',
              color: 'var(--gold)'
            }}
          >
            <Icon name="bookmark" size={13} style={{ color: 'var(--gold)' }} />
            <span>Journey: <strong style={{ color: 'var(--text-primary)' }}>{totalPlaces}</strong> Selected</span>
          </button>

          <Link to="/places" className="btn btn-secondary btn-sm">
            <span>Explore All Places</span>
            <Icon name="arrow-right" size={12} />
          </Link>
        </div>
      </div>

      {/* Category Filter Capsule Pills */}
      <div
        className="filter-bar-scrollable"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: 'var(--space-2xl)',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`motionsites-pill-btn capsule-filter-pill ${isActive ? 'active gold-accent is-active' : ''}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Famous Place Cards */}
      <div
        className="india-cards-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 'var(--space-xl)'
        }}
      >
        {curatedPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}
