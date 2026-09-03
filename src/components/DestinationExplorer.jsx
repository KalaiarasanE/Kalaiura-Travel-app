/* ==============================================================================
   AERORA — DESTINATION CONTENT EXPLORER
   Styled with exact motionsites-ai capsule filter bar & prompt-card grid
   ============================================================================== */

import React, { useState, useMemo } from 'react';
import { DESTINATIONS, REGIONS, CLIMATES, TRAVEL_STYLES, BUDGET_LEVELS, SEASONS } from '../data/destinations';
import { DestinationCard } from './DestinationCard';
import { Icon } from './Icons';

export function DestinationExplorer({ id = 'destinations-explorer', isHome = false }) {
  const explorerClassName = isHome ? 'destination-explorer-home' : '';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedClimate, setSelectedClimate] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filter computation
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;
      const matchesClimate = selectedClimate === 'All' || item.climate === selectedClimate;
      const matchesStyle = selectedStyle === 'All' || item.travelStyles.includes(selectedStyle);
      const matchesBudget = selectedBudget === 'All' || item.budget === selectedBudget;
      const matchesSeason = selectedSeason === 'All' || item.bestSeason === selectedSeason;

      return matchesSearch && matchesRegion && matchesClimate && matchesStyle && matchesBudget && matchesSeason;
    });
  }, [searchQuery, selectedRegion, selectedClimate, selectedStyle, selectedBudget, selectedSeason]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedRegion !== 'All' ||
    selectedClimate !== 'All' ||
    selectedStyle !== 'All' ||
    selectedBudget !== 'All' ||
    selectedSeason !== 'All';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedRegion('All');
    setSelectedClimate('All');
    setSelectedStyle('All');
    setSelectedBudget('All');
    setSelectedSeason('All');
  };

  return (
    <section id={id} className={`container ${explorerClassName}`} style={{ paddingBottom: 'var(--space-4xl)' }}>
      {/* Section Header */}
      <div className="section-header centered" data-home-reveal>
        <span className="eyebrow">Editorial Directory</span>
        <h2 className="section-title">
          Curated <span className="animate-gradient-shift">Sanctuaries</span>
        </h2>
        <p className="section-subtitle">
          Depart from ordinary tourist itineraries. Explore sanctuary landscapes, architectural pinnacles, and cultural tapestries curated for the discerning traveler.
        </p>
      </div>

      {/* Motionsites Capsule Navigation & Filter Bar */}
      <div style={{ marginBottom: 'var(--space-2xl)' }} data-home-reveal data-home-reveal-delay="1">
        {/* Top Search Bar */}
        <div style={{ position: 'relative', marginBottom: 'var(--space-lg)', maxWidth: '640px', margin: '0 auto var(--space-lg)' }}>
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
            placeholder="Search sanctuary, country, or architectural style..."
            aria-label="Search destinations"
            style={{
              borderRadius: '9999px',
              paddingLeft: '3.25rem',
              paddingRight: searchQuery ? '3rem' : '1.25rem',
              fontSize: '0.92rem',
              backgroundColor: 'rgba(17, 19, 24, 0.95)',
              border: '1px solid var(--border)'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="btn-icon"
              title="Clear search"
              aria-label="Clear search input"
              style={{
                position: 'absolute',
                right: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '26px',
                height: '26px'
              }}
            >
              <Icon name="close" size={13} />
            </button>
          )}
        </div>

        {/* Motionsites Horizontal Capsule Pill Strip + Dropdown Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-sm)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              flexWrap: 'wrap',
              gap: 'var(--space-sm)'
            }}
          >
            {/* Main Category Capsule Pills (Motionsites Style) */}
            <div className="motionsites-capsule-bar">
              {REGIONS.map((region) => {
                const isActive = selectedRegion === region;
                return (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setSelectedRegion(region)}
                    className={`motionsites-pill-btn capsule-filter-pill ${isActive ? 'active gold-accent is-active' : ''}`}
                  >
                    {region === 'All' ? 'All Sanctuaries' : region}
                  </button>
                );
              })}
            </div>

            {/* Right Dropdown Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="motionsites-dropdown-btn capsule-filter-pill"
                style={{
                  borderColor: showAdvancedFilters || hasActiveFilters ? 'var(--gold)' : '#3b3b3b',
                  color: showAdvancedFilters || hasActiveFilters ? 'var(--text-primary)' : 'rgba(255, 255, 255, 0.72)'
                }}
              >
                <Icon name="filter" size={13} style={{ color: 'var(--gold)' }} />
                <span>Filters {hasActiveFilters && '(Active)'}</span>
                <Icon name="chevron-down" size={13} />
              </button>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="motionsites-dropdown-btn capsule-filter-pill"
                  style={{ color: '#e53e3e', borderColor: 'rgba(229, 62, 62, 0.4)' }}
                >
                  <Icon name="close" size={12} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Advanced Multi-Parameter Dropdowns (Expanded) */}
          {showAdvancedFilters && (
            <div
              style={{
                width: '100%',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: 'var(--space-md) var(--space-lg)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 'var(--space-md)',
                animation: 'modal-scale-up 0.25s ease-out'
              }}
            >
              {/* Climate */}
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                  Climate
                </label>
                <select
                  className="input-field"
                  value={selectedClimate}
                  onChange={(e) => setSelectedClimate(e.target.value)}
                  style={{ padding: '0.45rem 0.85rem', fontSize: 'var(--text-xs)' }}
                >
                  {CLIMATES.map((c) => (
                    <option key={c} value={c}>
                      {c === 'All' ? 'Any Climate' : c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Style */}
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                  Travel Style
                </label>
                <select
                  className="input-field"
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  style={{ padding: '0.45rem 0.85rem', fontSize: 'var(--text-xs)' }}
                >
                  {TRAVEL_STYLES.map((s) => (
                    <option key={s} value={s}>
                      {s === 'All' ? 'Any Style' : s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                  Budget Tier
                </label>
                <select
                  className="input-field"
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  style={{ padding: '0.45rem 0.85rem', fontSize: 'var(--text-xs)' }}
                >
                  {BUDGET_LEVELS.map((b) => (
                    <option key={b} value={b}>
                      {b === 'All' ? 'Any Budget' : b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Best Season */}
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                  Season
                </label>
                <select
                  className="input-field"
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  style={{ padding: '0.45rem 0.85rem', fontSize: 'var(--text-xs)' }}
                >
                  {SEASONS.map((s) => (
                    <option key={s} value={s}>
                      {s === 'All' ? 'Any Season' : s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Destination Feature Grid (Responsive Motionsites Prompt Cards) */}
      {filteredDestinations.length > 0 ? (
        <div
          data-home-reveal
          data-home-reveal-delay="2"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-xl)'
          }}
        >
          {filteredDestinations.map((dest, idx) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              variant="standard"
              index={idx}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="empty-state">
          <Icon name="compass" size={44} className="empty-state-icon" />
          <h3 className="empty-state-title">No Sanctuaries Matched</h3>
          <p className="empty-state-desc">
            No destinations align with your current search query or combination of filters. Try clearing your parameters to reveal all available expeditions.
          </p>
          <button onClick={resetAllFilters} className="btn btn-secondary btn-sm">
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
}
