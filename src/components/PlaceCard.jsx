/* ==============================================================================
   AERORA — FAMOUS PLACE EDITORIAL CARD
   Visually rich landmark card with micro-interactions and journey integration
   ============================================================================== */

import React from 'react';
import { EditorialImage } from './EditorialImage';
import { Icon } from './Icons';
import { useJourneyContext } from '../context/JourneyContext';

export function PlaceCard({ place }) {
  const { addPlace, removePlace, hasPlace } = useJourneyContext();
  const isAdded = hasPlace(place.id);

  const toggleJourneyStatus = () => {
    if (isAdded) {
      removePlace(place.id);
    } else {
      addPlace(place);
    }
  };

  return (
    <article
      className="famous-place-card"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xs)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.4s ease',
        boxShadow: 'var(--shadow-subtle)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.borderColor = 'rgba(217, 155, 79, 0.4)';
        e.currentTarget.style.boxShadow = '0 14px 36px rgba(0, 0, 0, 0.55)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      {/* Visual Image Banner with Category Tag */}
      <div style={{ position: 'relative', overflow: 'hidden', width: '100%' }}>
        <EditorialImage
          src={place.image}
          alt={`Landmark view of ${place.name}`}
          aspectRatio="16/10"
          fallbackType="landmark"
          style={{ transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />

        <div
          style={{
            position: 'absolute',
            top: 'var(--space-sm)',
            left: 'var(--space-sm)',
            zIndex: 2
          }}
        >
          <span
            className="badge badge-accent"
            style={{
              backgroundColor: 'rgba(9, 10, 14, 0.85)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          >
            {place.category}
          </span>
        </div>
      </div>

      {/* Place Details */}
      <div
        style={{
          padding: 'var(--space-lg)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          gap: 'var(--space-md)'
        }}
      >
        <div>
          {/* Location Line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.72rem',
              color: 'var(--color-text-tertiary)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '4px'
            }}
          >
            <Icon name="map-pin" size={12} style={{ color: 'var(--color-accent)' }} />
            <span>{place.location}</span>
          </div>

          <h3
            style={{
              fontSize: '1.45rem',
              fontWeight: '400',
              color: 'var(--color-text-primary)',
              lineHeight: '1.2',
              marginBottom: 'var(--space-xs)'
            }}
          >
            {place.name}
          </h3>

          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: '#adb1bd',
              lineHeight: 'var(--lh-normal)',
              marginBottom: 'var(--space-md)'
            }}
          >
            {place.description}
          </p>

          {/* Time & Duration Telemetry */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: 'var(--space-sm) 0',
              borderTop: '1px solid var(--color-border)',
              borderBottom: '1px solid var(--color-border)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-secondary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="clock" size={13} style={{ color: 'var(--color-accent)' }} />
              <span><strong>Duration:</strong> {place.recommendedDuration}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="sun" size={13} style={{ color: 'var(--color-accent)' }} />
              <span><strong>Best Time:</strong> {place.bestTime}</span>
            </div>
          </div>
        </div>

        {/* Action Button: Add to Journey */}
        <button
          onClick={toggleJourneyStatus}
          className={`btn ${isAdded ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          aria-label={isAdded ? `Remove ${place.name} from personal journey` : `Add ${place.name} to personal journey`}
          style={{
            width: '100%',
            transition: 'all 0.25s ease'
          }}
        >
          <Icon name={isAdded ? 'check' : 'plus'} size={14} />
          <span>{isAdded ? 'Added to Journey' : 'Add to Journey'}</span>
        </button>
      </div>
    </article>
  );
}
