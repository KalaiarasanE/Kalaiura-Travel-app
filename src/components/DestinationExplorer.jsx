/* ==============================================================================
   AERORA — DESTINATION EXPLORER
   Asymmetric editorial grid, multi-parameter filtering, and refined search
   ============================================================================== */

import React, { useState, useMemo } from 'react';
import { DESTINATIONS, REGIONS, CLIMATES, TRAVEL_STYLES, BUDGET_LEVELS, SEASONS } from '../data/destinations';
import { DestinationCard } from './DestinationCard';
import { Icon } from './Icons';

export function DestinationExplorer({ id = 'destinations-explorer' }) {
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
      // Search text filter
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      // Region
      const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;

      // Climate
      const matchesClimate = selectedClimate === 'All' || item.climate === selectedClimate;

      // Style
      const matchesStyle = selectedStyle === 'All' || item.travelStyles.includes(selectedStyle);

      // Budget
      const matchesBudget = selectedBudget === 'All' || item.budget === selectedBudget;

      // Season
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
    <section id={id} className="container" style={{ paddingBottom: 'var(--space-4xl)' }}>
      {/* Section Header */}
      <div className="section-header centered">
        <span className="eyebrow">Editorial Catalogue</span>
        <h2 className="section-title">Unique Destination Discovery</h2>
        <p className="section-subtitle">
          Depart from ordinary tourist itineraries. Explore sanctuary landscapes, architectural pinnacles, and cultural tapestries curated for the discerning traveler.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: 'var(--space-lg)',
          marginBottom: 'var(--space-2xl)',
          boxShadow: 'var(--shadow-subtle)'
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: 'var(--space-md)' }}>
          <Icon
            name="search"
            size={18}
            style={{
              position: 'absolute',
              left: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-accent)',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            className="input-field"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Where do you want to disappear to? (e.g. Kyoto, Iceland, Temple, Alpine...)"
            aria-label="Search destinations"
            style={{
              paddingLeft: '3.25rem',
              paddingRight: searchQuery ? '3rem' : '1.25rem',
              fontSize: '1.05rem',
              backgroundColor: 'rgba(9, 10, 14, 0.65)'
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
                width: '28px',
                height: '28px'
              }}
            >
              <Icon name="close" size={14} />
            </button>
          )}
        </div>

        {/* Region Fast Filter Bar (Horizontally scrollable on mobile) */}
        <div style={{ marginBottom: 'var(--space-md)' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-xs)'
            }}
          >
            <span
              style={{
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--ls-wider)',
                textTransform: 'uppercase',
                color: 'var(--color-text-tertiary)',
                fontWeight: '500'
              }}
            >
              Filter by Region
            </span>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-accent)',
                letterSpacing: '0.04em',
                cursor: 'pointer'
              }}
            >
              <Icon name="filter" size={13} />
              <span>{showAdvancedFilters ? 'Collapse Filters' : 'Refine by Climate, Style & Budget'}</span>
            </button>
          </div>

          <div
            className="filter-bar-scrollable"
            style={{
              display: 'flex',
              gap: 'var(--space-xs)',
              flexWrap: 'wrap'
            }}
          >
            {REGIONS.map((region) => (
              <button
                key={region}
                className={`pill-filter ${selectedRegion === region ? 'active' : ''}`}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Collapsible Advanced Criteria Filters */}
        {showAdvancedFilters && (
          <div
            style={{
              paddingTop: 'var(--space-md)',
              borderTop: '1px solid var(--color-border)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 'var(--space-md)',
              animation: 'modal-fade-in 0.25s ease'
            }}
          >
            {/* Climate */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--ls-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '6px'
                }}
              >
                Climate
              </label>
              <select
                className="input-field"
                value={selectedClimate}
                onChange={(e) => setSelectedClimate(e.target.value)}
                style={{ padding: '0.65rem 1rem', fontSize: 'var(--text-sm)' }}
              >
                {CLIMATES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Style */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--ls-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '6px'
                }}
              >
                Travel Style
              </label>
              <select
                className="input-field"
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                style={{ padding: '0.65rem 1rem', fontSize: 'var(--text-sm)' }}
              >
                {TRAVEL_STYLES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--ls-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '6px'
                }}
              >
                Budget Level
              </label>
              <select
                className="input-field"
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                style={{ padding: '0.65rem 1rem', fontSize: 'var(--text-sm)' }}
              >
                {BUDGET_LEVELS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Season */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--ls-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-tertiary)',
                  marginBottom: '6px'
                }}
              >
                Best Season
              </label>
              <select
                className="input-field"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                style={{ padding: '0.65rem 1rem', fontSize: 'var(--text-sm)' }}
              >
                {SEASONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Active Filter Bar & Results Count */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'var(--space-md)',
            paddingTop: 'var(--space-xs)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-tertiary)'
          }}
        >
          <span>
            Displaying <strong style={{ color: 'var(--color-text-primary)' }}>{filteredDestinations.length}</strong> extraordinary destinations
          </span>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              style={{
                color: 'var(--color-accent)',
                textDecoration: 'underline',
                cursor: 'pointer',
                letterSpacing: '0.04em'
              }}
            >
              Reset All Filters
            </button>
          )}
        </div>
      </div>

      {/* Asymmetric Editorial CSS Grid Layout */}
      {filteredDestinations.length > 0 ? (
        <div
          className="destination-editorial-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-lg)',
            gridAutoFlow: 'dense'
          }}
        >
          {filteredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              variant={destination.gridVariant || 'standard'}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="empty-state">
          <div className="empty-state-icon">
            <Icon name="compass" size={44} />
          </div>
          <h3 className="empty-state-title">We couldn’t find that place.</h3>
          <p className="empty-state-desc">
            No destinations match the criteria "{searchQuery || selectedRegion || selectedStyle}". Try broadening your horizons or resetting filters.
          </p>
          <button onClick={resetAllFilters} className="btn btn-primary btn-sm">
            <span>View All Destinations</span>
            <Icon name="arrow-right" size={14} />
          </button>
        </div>
      )}
    </section>
  );
}
