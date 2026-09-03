/* ==============================================================================
   KALAIURA — DESTINATION ASSISTANT CARD
   Visually attractive personal travel assistant panel showcasing place-specific intelligence:
   Top places, must-try food, best time, suggested plan, and interactive quick questions.
   ============================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';
import { EditorialImage } from './EditorialImage';
import { useJourneyContext } from '../context/JourneyContext';

export function DestinationAssistantCard({ data, onQuickAsk }) {
  const { addPlace, hasPlace } = useJourneyContext();
  if (!data) return null;

  const isSaved = hasPlace(data.id);

  const handleSaveToJourney = () => {
    addPlace({
      id: data.id,
      name: data.name,
      category: data.category,
      image: data.image,
      destinationName: data.name,
      recommendedDuration: data.approxDuration || '3–5 Days',
      description: data.tagline || data.bestFor
    });
  };

  return (
    <div
      className="assistant-destination-card prompt-card-hover"
      style={{
        marginTop: 'var(--space-md)',
        borderRadius: '16px',
        backgroundColor: 'rgba(12, 14, 19, 0.95)',
        border: '1px solid rgba(224, 162, 77, 0.35)',
        overflow: 'hidden',
        boxShadow: '0 12px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(224, 162, 77, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '560px'
      }}
    >
      {/* 1. Header with Destination Image Banner */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/8',
          overflow: 'hidden',
          backgroundColor: '#0a0c10'
        }}
      >
        <EditorialImage
          src={data.image}
          alt={data.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(12, 14, 19, 0.95) 0%, rgba(12, 14, 19, 0.3) 50%, transparent 100%)'
          }}
        />

        {/* Category Pill (Top Left) */}
        <div style={{ position: 'absolute', top: '12px', left: '14px', zIndex: 2 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0.25rem 0.65rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(8, 9, 12, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(224, 162, 77, 0.35)',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: '600',
              color: 'var(--gold)'
            }}
          >
            {data.category}
          </span>
        </div>

        {/* Title & Tagline (Bottom Left of Banner) */}
        <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.65rem',
                fontWeight: '400',
                color: 'var(--text-primary)',
                margin: 0,
                letterSpacing: '0.02em',
                lineHeight: 1.1
              }}
            >
              📍 {data.name}
            </h4>
            <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: '600', letterSpacing: '0.05em' }}>
              {data.approxDuration || '3–5 Days'}
            </span>
          </div>
          <p style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.75)', margin: '2px 0 0 0', fontStyle: 'italic' }}>
            {data.tagline}
          </p>
        </div>
      </div>

      {/* 2. Structured Travel Assistant Information Body */}
      <div style={{ padding: 'var(--space-md) var(--space-lg)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Top Places */}
        {data.topPlaces && data.topPlaces.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem' }}>
            <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.2 }}>🏝️</span>
            <div>
              <strong style={{ color: 'var(--gold)', fontWeight: '600' }}>Top Places: </strong>
              <span style={{ color: 'var(--text-secondary)' }}>
                {data.topPlaces.slice(0, 4).join(', ')}
                {data.topPlaces.length > 4 ? `, and ${data.topPlaces[4]}` : ''}
              </span>
            </div>
          </div>
        )}

        {/* Must Try Food */}
        {data.mustTryFood && data.mustTryFood.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem' }}>
            <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.2 }}>🍴</span>
            <div>
              <strong style={{ color: 'var(--gold)', fontWeight: '600' }}>Must Try: </strong>
              <span style={{ color: 'var(--text-secondary)' }}>
                {data.mustTryFood.slice(0, 4).join(', ')}
              </span>
            </div>
          </div>
        )}

        {/* Best Time */}
        {data.bestTime && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem' }}>
            <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.2 }}>🗓️</span>
            <div>
              <strong style={{ color: 'var(--gold)', fontWeight: '600' }}>Best Time: </strong>
              <span style={{ color: 'var(--text-secondary)' }}>{data.bestTime}</span>
            </div>
          </div>
        )}

        {/* Best For */}
        {data.bestFor && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem' }}>
            <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.2 }}>🎯</span>
            <div>
              <strong style={{ color: 'var(--gold)', fontWeight: '600' }}>Best For: </strong>
              <span style={{ color: 'var(--text-secondary)' }}>{data.bestFor}</span>
            </div>
          </div>
        )}

        {/* Suggested Plan */}
        {data.suggestedPlan && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem' }}>
            <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1.2 }}>🧭</span>
            <div>
              <strong style={{ color: 'var(--gold)', fontWeight: '600' }}>Suggested Plan: </strong>
              <span style={{ color: 'var(--text-secondary)' }}>{data.suggestedPlan}</span>
            </div>
          </div>
        )}

        {/* Travel Tip */}
        {data.travelTips && data.travelTips.length > 0 && (
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              borderRadius: '8px',
              padding: '0.5rem 0.75rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '6px',
              fontSize: '0.78rem',
              marginTop: '4px'
            }}
          >
            <span style={{ fontSize: '0.9rem' }}>💡</span>
            <div>
              <strong style={{ color: 'var(--gold)', fontWeight: '600' }}>Travel Tip: </strong>
              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{data.travelTips[0]}</span>
            </div>
          </div>
        )}
      </div>

      {/* 3. Interactive Quick Follow-up Question Chips */}
      {onQuickAsk && (
        <div
          style={{
            padding: '0.5rem var(--space-lg)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          <span style={{ fontSize: '0.68rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>
            Ask Assistant:
          </span>
          <button
            onClick={() => onQuickAsk(`What can I do in ${data.name}?`)}
            className="btn-pill-chip"
            style={chipStyle}
          >
            🏝️ Things to do
          </button>
          <button
            onClick={() => onQuickAsk(`Plan a 3-day ${data.name} trip`)}
            className="btn-pill-chip"
            style={chipStyle}
          >
            🧭 3-Day Plan
          </button>
          <button
            onClick={() => onQuickAsk(`What food should I try in ${data.name}?`)}
            className="btn-pill-chip"
            style={chipStyle}
          >
            🍴 Food to try
          </button>
          <button
            onClick={() => onQuickAsk(`Is ${data.name} good for a family or couples trip?`)}
            className="btn-pill-chip"
            style={chipStyle}
          >
            👨‍👩‍👧 Family & Couples
          </button>
        </div>
      )}

      {/* 4. Action Row (Explore Destination & Add to Journey) */}
      <div
        style={{
          padding: '0.65rem var(--space-lg)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          backgroundColor: 'rgba(8, 9, 12, 0.85)'
        }}
      >
        <Link
          to={`/destination/${data.id}`}
          className="btn btn-secondary btn-xs"
          style={{ textDecoration: 'none' }}
        >
          <span>Explore {data.name}</span>
          <Icon name="arrow-right" size={12} />
        </Link>

        <button
          onClick={handleSaveToJourney}
          className={`btn ${isSaved ? 'btn-primary' : 'btn-secondary'} btn-xs`}
        >
          <Icon name={isSaved ? 'check' : 'plus'} size={12} />
          <span>{isSaved ? 'Saved in Journey' : 'Add to Journey'}</span>
        </button>
      </div>
    </div>
  );
}

const chipStyle = {
  padding: '0.22rem 0.6rem',
  borderRadius: '9999px',
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: 'var(--text-secondary)',
  fontSize: '0.72rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};
