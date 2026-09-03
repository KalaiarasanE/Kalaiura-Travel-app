/* ==============================================================================
   KALAIURA — INDIA DESTINATION CARD
   Luxury editorial card with smooth zoom, gold arrow glide, and hover sheen
   ============================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';
import { EditorialImage } from './EditorialImage';
import { useJourneyContext } from '../context/JourneyContext';

export function IndiaCard({ destination, index = 0 }) {
  const { activeDestination, setActiveDestinationId } = useJourneyContext();
  const isCurrentFocus = activeDestination?.id === destination.id;

  return (
    <article
      className="india-dest-card prompt-card-hover"
      data-home-reveal
      data-home-reveal-delay={(index % 4) + 1}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--surface-elevated)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease'
      }}
    >
      {/* 1. Large Visual Showcase Container */}
      <div
        className="india-card-media-wrap card-media-wrap"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/11',
          overflow: 'hidden',
          backgroundColor: '#0d0f14'
        }}
      >
        <EditorialImage
          src={destination.cardImage}
          alt={`Scenic view of ${destination.name}, ${destination.state}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        {/* Ambient Dark Gradient on Image */}
        <div
          className="india-card-gradient"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(8, 9, 12, 0.25) 0%, rgba(8, 9, 12, 0.3) 40%, rgba(8, 9, 12, 0.9) 100%)',
            transition: 'opacity 0.4s ease'
          }}
        />

        {/* Floating State/Region Tag (Top Left) */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 2 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0.3rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(8, 9, 12, 0.75)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(224, 162, 77, 0.3)',
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: '600',
              color: 'var(--gold)'
            }}
          >
            {destination.state}
          </span>
        </div>

        {/* Live Weather / Climate Pill (Top Right) */}
        {destination.weather && (
          <div style={{ position: 'absolute', top: '14px', right: '14px', zIndex: 2 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(8, 9, 12, 0.75)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                fontSize: '0.7rem',
                color: 'var(--text-primary)'
              }}
            >
              <Icon name="sun" size={12} style={{ color: 'var(--gold)' }} />
              <span>{destination.weather.temp}°C · {destination.weather.condition}</span>
            </span>
          </div>
        )}

        {/* Category Pill (Bottom Left of Media) */}
        <div style={{ position: 'absolute', bottom: '12px', left: '14px', zIndex: 2 }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.8)',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              padding: '0.2rem 0.6rem',
              borderRadius: '6px',
              backdropFilter: 'blur(6px)'
            }}
          >
            {destination.category}
          </span>
        </div>
      </div>

      {/* 2. Content & Information Body */}
      <div
        style={{
          padding: 'var(--space-lg)',
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <div className="india-card-header" style={{ marginBottom: '8px', transition: 'transform 0.35s ease' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.65rem',
                fontWeight: '400',
                color: 'var(--text-primary)',
                letterSpacing: '0.02em',
                margin: 0,
                textTransform: 'uppercase',
                lineHeight: 1.15
              }}
            >
              {destination.name}
            </h3>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--gold)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: '500'
              }}
            >
              {destination.idealDays}
            </span>
          </div>

          <p
            style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
              margin: '3px 0 0 0'
            }}
          >
            {destination.tagline}
          </p>
        </div>

        {/* Short Editorial Description */}
        <p
          style={{
            fontSize: '0.84rem',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--lh-normal)',
            margin: '0 0 var(--space-md) 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            flex: 1
          }}
        >
          {destination.shortDescription}
        </p>

        {/* Best Season Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-sm)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: 'var(--space-md)',
            fontSize: '0.74rem'
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>
            Best: <strong style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{destination.bestTime}</strong>
          </span>
          <span style={{ color: 'var(--gold)', fontWeight: '600' }}>
            {destination.budgetTier}
          </span>
        </div>

        {/* 3. Action Footer: Explore Button with animated gold arrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-sm)',
            marginTop: 'auto'
          }}
        >
          <Link
            to={`/destination/${destination.id}`}
            className="india-card-explore-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--gold)',
              fontSize: '0.85rem',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '0.45rem 0'
            }}
          >
            <span>Explore</span>
            <span className="india-card-arrow" style={{ display: 'inline-block', transition: 'transform 0.3s ease' }}>
              →
            </span>
          </Link>

          <button
            onClick={() => setActiveDestinationId(destination.id)}
            className="btn btn-secondary btn-xs"
            title="Set as active journey focus"
            style={{
              borderColor: isCurrentFocus ? 'var(--gold)' : 'rgba(255, 255, 255, 0.12)',
              backgroundColor: isCurrentFocus ? 'rgba(224, 162, 77, 0.15)' : 'transparent',
              color: isCurrentFocus ? 'var(--gold)' : 'var(--text-secondary)'
            }}
          >
            <Icon name="compass" size={12} />
            <span>{isCurrentFocus ? 'Focused' : 'Focus'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
