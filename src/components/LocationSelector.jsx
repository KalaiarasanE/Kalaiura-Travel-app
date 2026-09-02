/* ==============================================================================
   AERORA — LOCATION SELECTOR & PERMISSION MODAL
   Respectful permission prompt with graceful manual fallback and city search
   ============================================================================== */

import React, { useState } from 'react';
import { useLocation } from '../hooks/useLocation';
import { Icon } from './Icons';

export function LocationSelector() {
  const {
    currentLocation,
    permissionStatus,
    isSelectorOpen,
    closeLocationSelector,
    requestLocation,
    selectManualLocation,
    dismissPrompt,
    presetLocations
  } = useLocation();

  const [searchFilter, setSearchFilter] = useState('');
  const [manualMode, setManualMode] = useState(false);

  // Filter preset locations based on search query
  const filteredPresets = presetLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      loc.country.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const shouldShow = isSelectorOpen || permissionStatus === 'prompt';
  if (!shouldShow) return null;

  const isDenied = permissionStatus === 'denied';

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      <div className="modal-card" style={{ maxWidth: '520px' }}>
        {/* Close Button */}
        <button
          onClick={() => {
            closeLocationSelector();
            dismissPrompt();
          }}
          className="btn-icon"
          aria-label="Close location selector"
          style={{
            position: 'absolute',
            top: 'var(--space-md)',
            right: 'var(--space-md)'
          }}
        >
          <Icon name="close" size={16} />
        </button>

        {/* State 1: Permission Prompt */}
        {!manualMode && !isDenied ? (
          <div>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent-dim)',
                border: '1px solid var(--color-accent-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-md)',
                color: 'var(--color-accent)'
              }}
            >
              <Icon name="compass" size={24} />
            </div>

            <span className="eyebrow">Atmospheric Geolocation</span>
            <h2
              id="location-modal-title"
              style={{
                fontSize: '1.75rem',
                fontWeight: '300',
                letterSpacing: '0.02em',
                lineHeight: '1.15',
                marginBottom: 'var(--space-xs)'
              }}
            >
              Let the journey begin closer to home
            </h2>

            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--lh-relaxed)',
                marginBottom: 'var(--space-xl)'
              }}
            >
              Allow location access to discover destinations, regional solar cycles, and live weather conditions around you.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm)'
              }}
            >
              <button
                onClick={() => {
                  requestLocation();
                  closeLocationSelector();
                }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <Icon name="map-pin" size={16} />
                <span>Use My Location</span>
              </button>

              <button
                onClick={() => setManualMode(true)}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                <span>Choose Manually</span>
              </button>
            </div>
          </div>
        ) : (
          /* State 2: Manual Selection & Graceful Denied Fallback */
          <div>
            <span className="eyebrow">Select Origin</span>
            <h2
              id="location-modal-title"
              style={{
                fontSize: '1.65rem',
                fontWeight: '300',
                letterSpacing: '0.02em',
                lineHeight: '1.15',
                marginBottom: 'var(--space-xs)'
              }}
            >
              {isDenied ? 'No problem. Tell us where you are.' : 'Select your departure coordinates'}
            </h2>

            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-lg)',
                lineHeight: 'var(--lh-normal)'
              }}
            >
              Choose from major global travel hubs or search below. Telemetry updates automatically.
            </p>

            {/* City Search Bar */}
            <div style={{ position: 'relative', marginBottom: 'var(--space-md)' }}>
              <Icon
                name="search"
                size={16}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-tertiary)'
                }}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Search global cities..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{ paddingLeft: '2.75rem', fontSize: 'var(--text-sm)' }}
              />
            </div>

            {/* Preset City Grid */}
            <div
              style={{
                maxHeight: '230px',
                overflowY: 'auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-xs)',
                paddingRight: '4px',
                marginBottom: 'var(--space-lg)'
              }}
            >
              {filteredPresets.map((loc) => {
                const isCurrent = currentLocation.name === loc.name;
                return (
                  <button
                    key={loc.name}
                    onClick={() => selectManualLocation(loc)}
                    style={{
                      padding: '0.7rem 0.95rem',
                      textAlign: 'left',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: isCurrent ? 'var(--color-accent-dim)' : 'rgba(255, 255, 255, 0.03)',
                      border: isCurrent ? '1px solid var(--color-accent-border)' : '1px solid var(--color-border)',
                      color: isCurrent ? 'var(--color-accent-light)' : 'var(--color-text-primary)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: '500' }}>{loc.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-tertiary)' }}>{loc.country}</div>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-xs)' }}>
              <button
                onClick={() => {
                  closeLocationSelector();
                  dismissPrompt();
                }}
                className="btn btn-secondary btn-sm"
              >
                <span>Dismiss</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
