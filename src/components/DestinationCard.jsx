/* ==============================================================================
   AERORA — DESTINATION CONTENT FEATURE CARD
   Styled with exact motionsites-ai prompt-card-hover pattern & visual language
   ============================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { EditorialImage } from './EditorialImage';
import { Icon } from './Icons';
import { useJourneyContext } from '../context/JourneyContext';

export function DestinationCard({ destination, variant = 'standard', index = 0 }) {
  const isFeatured = variant === 'card-featured';
  const isTall = variant === 'card-tall';
  const isWide = variant === 'card-wide';
  const { activeDestination, setActiveDestinationId } = useJourneyContext();

  const isCurrentFocus = activeDestination?.id === destination.id;

  return (
    <article
      className="prompt-card-hover animate-parallax-fade-up"
      style={{
        gridColumn: isFeatured || isWide ? 'span 2' : 'span 1',
        gridRow: isTall ? 'span 2' : 'span 1',
        minHeight: isFeatured ? '480px' : isTall ? '480px' : '380px',
        animationDelay: `${(index % 8) * 0.075}s`
      }}
    >
      {/* 1. Upper Media Showcase (Motionsites Aspect-Ratio Container) */}
      <div className="card-media-wrap" style={{ aspectRatio: isTall ? '4/5' : '16/10' }}>
        <EditorialImage
          src={destination.cardImage}
          alt={`Scenic perspective of ${destination.name}, ${destination.country}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Ambient Dark Gradient on Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(8, 9, 12, 0.2) 0%, transparent 40%, rgba(8, 9, 12, 0.85) 100%)',
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
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: '600',
              color: 'var(--gold)'
            }}
          >
            {destination.region}
          </span>
        </div>

        {/* Live Climate Telemetry Pill (Top Right) */}
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
              gap: '0.35rem',
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
            <Icon name="sun" size={12} style={{ color: 'var(--gold)' }} />
            <span>{destination.defaultWeather.temp}°C · {destination.defaultWeather.condition}</span>
          </span>
        </div>

        {/* Quick Set Active Destination Focus Button (Bottom Right of Media) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setActiveDestinationId(destination.id);
          }}
          className="btn-icon"
          title={isCurrentFocus ? 'Active Focus' : 'Set as Focus'}
          aria-label={`Set ${destination.name} as active journey focus`}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            zIndex: 2,
            width: '32px',
            height: '32px',
            backgroundColor: isCurrentFocus ? 'var(--gold)' : 'rgba(8, 9, 12, 0.75)',
            borderColor: isCurrentFocus ? 'var(--gold)' : 'rgba(255, 255, 255, 0.2)',
            color: isCurrentFocus ? '#08090C' : 'var(--text-secondary)'
          }}
        >
          <Icon name="compass" size={14} />
        </button>
      </div>

      {/* 2. Lower Meta Information (Motionsites Header + Action Layout) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--space-md)',
          padding: '0 4px',
          marginBottom: '8px'
        }}
      >
        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              fontWeight: '400',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              margin: 0,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {destination.name}
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
            {destination.country} · {destination.climate} Climate
          </span>
        </div>

        {/* Direct Link to Sanctuary Profile */}
        <Link
          to={`/destination/${destination.id}`}
          className="btn-icon"
          title={`Explore ${destination.name}`}
          aria-label={`Explore ${destination.name}`}
          style={{
            flexShrink: 0,
            width: '32px',
            height: '32px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'var(--border)'
          }}
        >
          <Icon name="arrow-right" size={14} />
        </Link>
      </div>

      {/* Editorial Short Description */}
      <p
        style={{
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          lineHeight: 'var(--lh-normal)',
          margin: '0 4px 10px 4px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {destination.shortDescription}
      </p>

      {/* 3. Motionsites-style Feature Tags Strip */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          padding: '0 4px',
          marginTop: 'auto'
        }}
      >
        {destination.travelStyles.slice(0, 2).map((style) => (
          <span
            key={style}
            style={{
              padding: '0.2rem 0.55rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.68rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.04em'
            }}
          >
            {style}
          </span>
        ))}

        <span
          style={{
            padding: '0.2rem 0.55rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(224, 162, 77, 0.08)',
            border: '1px solid rgba(224, 162, 77, 0.22)',
            fontSize: '0.68rem',
            color: 'var(--gold)',
            letterSpacing: '0.04em'
          }}
        >
          Best in {destination.bestSeason}
        </span>
      </div>
    </article>
  );
}
