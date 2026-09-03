/* ==============================================================================
   KALAIURA — "EXPLORE INDIA" SHOWCASE SECTION
   Editorial cinematic travel layout showcasing India's breathtaking destinations
   ============================================================================== */

import React, { useState, useMemo } from 'react';
import { INDIA_DESTINATIONS, INDIA_REGIONS } from '../data/indiaDestinations';
import { IndiaCard } from './IndiaCard';
import { Icon } from './Icons';

export function IndiaExplorer() {
  const [selectedRegion, setSelectedRegion] = useState('All India');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDestinations = useMemo(() => {
    return INDIA_DESTINATIONS.filter((item) => {
      const matchesRegion =
        selectedRegion === 'All India' || item.region === selectedRegion;

      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  return (
    <section id="explore-india" className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      {/* Editorial Section Header */}
      <div className="section-header centered" data-home-reveal>
        <span className="eyebrow">The Subcontinent Reimagined</span>
        <h2 className="section-title">
          Explore <span className="animate-gradient-shift">India</span>
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '680px', margin: '0 auto' }}>
          From timeless heritage to wild landscapes, discover the places that make India unforgettable.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div
        data-home-reveal
        data-home-reveal-delay="1"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-lg)',
          marginBottom: 'var(--space-3xl)'
        }}
      >
        {/* Search Field */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '560px' }}>
          <Icon
            name="search"
            size={16}
            style={{
              position: 'absolute',
              left: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--gold)',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            className="input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search state, monument, hill station or backwaters..."
            aria-label="Search Indian destinations"
            style={{
              borderRadius: '9999px',
              paddingLeft: '3.25rem',
              paddingRight: searchQuery ? '3rem' : '1.25rem',
              backgroundColor: 'rgba(17, 19, 24, 0.95)',
              border: '1px solid var(--border)'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="btn-icon"
              title="Clear search"
              style={{
                position: 'absolute',
                right: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '24px',
                height: '24px'
              }}
            >
              <Icon name="close" size={12} />
            </button>
          )}
        </div>

        {/* Region Capsule Pills Strip */}
        <div
          className="motionsites-capsule-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '6px'
          }}
        >
          {INDIA_REGIONS.map((region) => {
            const isActive = selectedRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`motionsites-pill-btn capsule-filter-pill ${isActive ? 'active gold-accent is-active' : ''}`}
              >
                {region}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Large Editorial India Destination Cards */}
      {filteredDestinations.length > 0 ? (
        <div
          data-home-reveal
          data-home-reveal-delay="2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 'var(--space-xl)'
          }}
        >
          {filteredDestinations.map((dest, idx) => (
            <IndiaCard key={dest.id} destination={dest} index={idx} />
          ))}
        </div>
      ) : (
        <div className="empty-state" data-home-reveal>
          <Icon name="compass" size={44} className="empty-state-icon" />
          <h3 className="empty-state-title">No Indian Sanctuaries Matched</h3>
          <p className="empty-state-desc">
            No destinations align with your current search query "{searchQuery}". Try resetting to view all Indian states and retreats.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedRegion('All India'); }}
            className="btn btn-secondary btn-sm"
          >
            <span>Show All India Destinations</span>
          </button>
        </div>
      )}
    </section>
  );
}
