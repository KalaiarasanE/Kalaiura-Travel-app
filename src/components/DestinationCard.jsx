/* ==============================================================================
   AERORA — EDITORIAL DESTINATION CARD
   Asymmetric layout card with weather telemetry, styles, and micro-interactions
   ============================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { EditorialImage } from './EditorialImage';
import { Icon } from './Icons';

export function DestinationCard({ destination, variant = 'standard' }) {
  const isFeatured = variant === 'card-featured';
  const isTall = variant === 'card-tall';
  const isWide = variant === 'card-wide';

  return (
    <article
      className={`destination-card ${variant}`}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-xs)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: isFeatured ? '540px' : isTall ? '540px' : '420px',
        gridColumn: isFeatured || isWide ? 'span 2' : 'span 1',
        gridRow: isTall ? 'span 2' : 'span 1',
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.45s ease',
        boxShadow: 'var(--shadow-subtle)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'rgba(217, 155, 79, 0.45)';
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0, 0, 0, 0.6)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      {/* Background Image with Ambient Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}
      >
        <EditorialImage
          src={destination.cardImage}
          alt={`Scenic perspective of ${destination.name}, ${destination.country}`}
          style={{
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        {/* Cinematic Multi-stop Dark Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(9, 10, 14, 0.15) 0%, rgba(9, 10, 14, 0.5) 45%, rgba(9, 10, 14, 0.95) 100%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Top Floating Telemetry Chips */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--space-md)',
          left: 'var(--space-md)',
          right: 'var(--space-md)',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none'
        }}
      >
        <span
          className="badge badge-accent"
          style={{
            backgroundColor: 'rgba(9, 10, 14, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          {destination.region}
        </span>

        {/* Weather Snapshot */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.3rem 0.65rem',
            borderRadius: 'var(--radius-xs)',
            backgroundColor: 'rgba(9, 10, 14, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)'
          }}
        >
          <Icon name="sun" size={13} style={{ color: 'var(--color-accent)' }} />
          <span>{destination.defaultWeather.temp}°C · {destination.defaultWeather.condition}</span>
        </span>
      </div>

      {/* Card Editorial Information */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: 'var(--space-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-xs)'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)'
          }}
        >
          {destination.country}
        </span>

        <h3
          style={{
            fontSize: isFeatured ? '2.4rem' : '1.85rem',
            fontWeight: '300',
            color: 'var(--color-text-primary)',
            margin: '2px 0 6px 0',
            lineHeight: 1.1
          }}
        >
          {destination.name}
        </h3>

        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: '#c2c6d1',
            lineHeight: 'var(--lh-normal)',
            marginBottom: 'var(--space-sm)',
            display: '-webkit-box',
            WebkitLineClamp: isTall ? 4 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {destination.shortDescription}
        </p>

        {/* Travel Style Pills & Best Season */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: 'var(--space-md)'
          }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent-light)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <Icon name="calendar" size={12} />
            Season: {destination.bestSeason}
          </span>

          <span style={{ color: 'var(--color-text-tertiary)', fontSize: '0.75rem' }}>•</span>

          {destination.travelStyles.slice(0, 3).map((style) => (
            <span
              key={style}
              style={{
                fontSize: '0.68rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.05em'
              }}
            >
              #{style}
            </span>
          ))}
        </div>

        {/* Explore Button */}
        <Link
          to={`/destination/${destination.id}`}
          className="btn btn-secondary btn-sm"
          style={{
            alignSelf: 'flex-start',
            borderColor: 'rgba(245, 242, 235, 0.25)',
            backgroundColor: 'rgba(255, 255, 255, 0.06)'
          }}
        >
          <span>Explore Destination</span>
          <Icon name="arrow-right" size={14} />
        </Link>
      </div>
    </article>
  );
}
