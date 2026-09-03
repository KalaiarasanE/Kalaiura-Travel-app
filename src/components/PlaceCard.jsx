/* ==============================================================================
   AERORA — FAMOUS PLACE CONTENT FEATURE CARD
   Styled with exact motionsites-ai prompt-card-hover pattern & visual language
   ============================================================================== */

import React from 'react';
import { EditorialImage } from './EditorialImage';
import { Icon } from './Icons';
import { useJourneyContext } from '../context/JourneyContext';

export function PlaceCard({ place, index = 0 }) {
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
      className="prompt-card-hover animate-parallax-fade-up"
      data-home-reveal
      data-home-reveal-delay={(index % 3) + 1}
      style={{ animationDelay: `${(index % 6) * 0.08}s` }}
    >
      {/* 1. Upper Media Showcase (Motionsites Aspect-Ratio Media Wrap) */}
      <div className="card-media-wrap">
        <EditorialImage
          src={place.image}
          alt={`Landmark view of ${place.name}`}
          aspectRatio="16/10"
          fallbackType="landmark"
        />

        {/* Dark Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(8, 9, 12, 0.2) 0%, transparent 40%, rgba(8, 9, 12, 0.8) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Floating Category Tag Pill (Top Left) */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 2
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(8, 9, 12, 0.72)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: '600',
              color: 'var(--gold)'
            }}
          >
            {place.category}
          </span>
        </div>

        {/* Floating Duration Pill (Top Right) */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 2
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(8, 9, 12, 0.72)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: '0.68rem',
              color: 'var(--text-primary)'
            }}
          >
            <Icon name="compass" size={12} style={{ color: 'var(--gold)' }} />
            <span>{place.recommendedDuration}</span>
          </span>
        </div>
      </div>

      {/* 2. Lower Meta Information (Motionsites Header + Action Layout) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--space-md)',
          padding: '0 4px',
          marginBottom: '6px'
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: '400',
              lineHeight: 1.2,
              color: 'var(--text-primary)',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {place.name}
          </h3>
          <span
            style={{
              display: 'block',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              marginTop: '2px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            Optimal: {place.bestTimeToVisit}
          </span>
        </div>

        {/* Bookmark Quick Action */}
        <button
          onClick={toggleJourneyStatus}
          className="btn-icon"
          title={isAdded ? 'Remove from Journey' : 'Add to Journey'}
          aria-label={isAdded ? `Remove ${place.name} from Journey` : `Add ${place.name} to Journey`}
          style={{
            flexShrink: 0,
            width: '32px',
            height: '32px',
            backgroundColor: isAdded ? 'var(--gold)' : 'rgba(255, 255, 255, 0.03)',
            borderColor: isAdded ? 'var(--gold)' : 'var(--border)',
            color: isAdded ? '#08090C' : 'var(--text-secondary)'
          }}
        >
          <Icon name={isAdded ? 'check' : 'bookmark'} size={14} />
        </button>
      </div>

      {/* Description Snippet */}
      <p
        style={{
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          lineHeight: 'var(--lh-normal)',
          margin: '0 4px 12px 4px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {place.description}
      </p>

      {/* 3. Bottom Action Toggle Bar */}
      <div style={{ padding: '0 4px', marginTop: 'auto' }}>
        <button
          onClick={toggleJourneyStatus}
          className={`btn ${isAdded ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          style={{ width: '100%' }}
        >
          <Icon name={isAdded ? 'check' : 'plus'} size={13} />
          <span>{isAdded ? 'Saved in Journey' : 'Add to Journey'}</span>
        </button>
      </div>
    </article>
  );
}
