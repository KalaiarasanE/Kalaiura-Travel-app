/* ==============================================================================
   AERORA — FAMOUS PLACES PAGE
   Curated global landmark directory with search, category filtering & journey addition
   ============================================================================== */

import React, { useState, useMemo } from 'react';
import { PLACES } from '../data/places';
import { DESTINATIONS } from '../data/destinations';
import { PlaceCard } from '../components/PlaceCard';
import { Icon } from '../components/Icons';
import { useJourneyContext } from '../context/JourneyContext';

export function PlacesPage() {
  const [selectedDestId, setSelectedDestId] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { totalPlaces, toggleDrawer } = useJourneyContext();

  const filteredPlaces = useMemo(() => {
    return PLACES.filter((place) => {
      const matchesDest = selectedDestId === 'All' || place.destinationId === selectedDestId;
      const matchesSearch =
        !searchQuery ||
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDest && matchesSearch;
    });
  }, [selectedDestId, searchQuery]);

  return (
    <main style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))', paddingBottom: 'var(--space-4xl)' }}>
      <div className="container">
        {/* Header */}
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
            <h1 className="section-title">Famous Places</h1>
            <p className="section-subtitle">
              Architectural marvels, sacred shrines, and primordial landscapes. Add any place to your personal dossier to weave into your journey.
            </p>
          </div>

          <button
            onClick={toggleDrawer}
            className="btn btn-secondary btn-sm"
          >
            <Icon name="bookmark" size={14} style={{ color: 'var(--color-accent)' }} />
            <span>My Journey ({totalPlaces})</span>
          </button>
        </div>

        {/* Filter Controls */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-lg)',
            marginBottom: 'var(--space-2xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-md)'
          }}
        >
          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Icon
              name="search"
              size={18}
              style={{
                position: 'absolute',
                left: '1.25rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-accent)'
              }}
            />
            <input
              type="text"
              className="input-field"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search monuments, shrines, trails, or regions..."
              style={{ paddingLeft: '3.25rem' }}
            />
          </div>

          {/* Destination Pills */}
          <div
            className="filter-bar-scrollable"
            style={{
              display: 'flex',
              gap: 'var(--space-xs)',
              overflowX: 'auto',
              paddingBottom: '4px'
            }}
          >
            <button
              className={`pill-filter ${selectedDestId === 'All' ? 'active' : ''}`}
              onClick={() => setSelectedDestId('All')}
            >
              All Regions
            </button>
            {DESTINATIONS.map((d) => (
              <button
                key={d.id}
                className={`pill-filter ${selectedDestId === d.id ? 'active' : ''}`}
                onClick={() => setSelectedDestId(d.id)}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* Places Grid */}
        {filteredPlaces.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--space-xl)'
            }}
          >
            {filteredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name="search" size={40} className="empty-state-icon" />
            <h3 className="empty-state-title">No Places Located</h3>
            <p className="empty-state-desc">
              No architectural or natural monuments matched your search query.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDestId('All');
              }}
              className="btn btn-primary btn-sm"
            >
              <span>Reset Search</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
