/* ==============================================================================
   KALAIURA — "INDIA, BEYOND THE OBVIOUS"
   Luxury travel magazine editorial feature showcasing rare, transcendental sanctuaries
   ============================================================================== */

import React, { useState } from 'react';
import { INDIA_BEYOND_OBVIOUS } from '../data/indiaExperiences';
import { Icon } from './Icons';
import { EditorialImage } from './EditorialImage';
import { useJourneyContext } from '../context/JourneyContext';

export function IndiaBeyondObvious() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeExp = INDIA_BEYOND_OBVIOUS[activeIdx] || INDIA_BEYOND_OBVIOUS[0];
  const { addPlace, hasPlace } = useJourneyContext();

  const isSaved = hasPlace(activeExp.id);

  const handleToggleSave = () => {
    if (!isSaved) {
      addPlace({
        id: activeExp.id,
        name: activeExp.title,
        category: activeExp.category,
        image: activeExp.image,
        destinationName: activeExp.region,
        recommendedDuration: activeExp.duration,
        description: activeExp.whySpecial
      });
    }
  };

  return (
    <section className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      {/* Editorial Section Header */}
      <div className="section-header centered" data-home-reveal>
        <span className="eyebrow">The Rare & The Unhurried</span>
        <h2 className="section-title">
          India, <span className="animate-gradient-shift">Beyond the Obvious</span>
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
          Depart from standard tourist corridors. Step into transcendental landscapes, biological architectures, and silent sanctuaries preserved across centuries.
        </p>
      </div>

      {/* Main Magazine Feature Layout */}
      <div
        className="beyond-obvious-card prompt-card-hover"
        data-home-reveal
        data-home-reveal-delay="1"
        style={{
          position: 'relative',
          backgroundColor: 'var(--surface-elevated)',
          border: '1px solid rgba(224, 162, 77, 0.25)',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 1.2fr)',
          minHeight: '560px',
          boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.8)'
        }}
      >
        {/* Left Interactive Experience Selector Strip */}
        <div
          style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(10, 12, 16, 0.95)',
            zIndex: 2
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-md)' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  color: 'var(--gold)',
                  backgroundColor: 'rgba(224, 162, 77, 0.1)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '9999px',
                  border: '1px solid rgba(224, 162, 77, 0.25)'
                }}
              >
                0{activeIdx + 1} / 0{INDIA_BEYOND_OBVIOUS.length}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {activeExp.region}
              </span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: '400',
                color: 'var(--text-primary)',
                lineHeight: 1.05,
                letterSpacing: '0.02em',
                marginBottom: '4px'
              }}
            >
              {activeExp.title}
            </h3>

            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--gold)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: '500',
                marginBottom: 'var(--space-lg)'
              }}
            >
              {activeExp.subtitle}
            </p>

            {/* Poetic Pullquote */}
            <blockquote
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontStyle: 'italic',
                lineHeight: 'var(--lh-relaxed)',
                color: 'var(--text-primary)',
                margin: '0 0 var(--space-lg) 0',
                borderLeft: '2px solid var(--gold)',
                paddingLeft: 'var(--space-md)'
              }}
            >
              “{activeExp.quote}”
            </blockquote>

            {/* Why This Experience Is Rare */}
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--lh-relaxed)',
                marginBottom: 'var(--space-lg)'
              }}
            >
              {activeExp.whySpecial}
            </p>

            {/* Sensory & Practical Metrics */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '10px',
                padding: 'var(--space-md)',
                marginBottom: 'var(--space-lg)',
                fontSize: '0.78rem'
              }}
            >
              <div style={{ color: 'var(--gold)', marginBottom: '4px', fontWeight: '500' }}>
                Sensory Dimension:
              </div>
              <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '8px' }}>
                {activeExp.sensoryDetail}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Ideal Window: <strong style={{ color: 'var(--text-primary)' }}>{activeExp.idealSeason}</strong></span>
                <span>Pace: <strong style={{ color: 'var(--gold)' }}>{activeExp.duration}</strong></span>
              </div>
            </div>
          </div>

          {/* Action Row & Carousel Navigation */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--space-md)',
              flexWrap: 'wrap',
              paddingTop: 'var(--space-md)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <button
              onClick={handleToggleSave}
              className={`btn ${isSaved ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            >
              <Icon name={isSaved ? 'check' : 'plus'} size={14} />
              <span>{isSaved ? 'Saved in Journey' : 'Save Experience'}</span>
            </button>

            {/* Arrows */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : INDIA_BEYOND_OBVIOUS.length - 1))}
                className="btn-icon"
                title="Previous Experience"
                aria-label="Previous experience"
              >
                <Icon name="chevron-left" size={16} />
              </button>
              <button
                onClick={() => setActiveIdx((prev) => (prev < INDIA_BEYOND_OBVIOUS.length - 1 ? prev + 1 : 0))}
                className="btn-icon"
                title="Next Experience"
                aria-label="Next experience"
              >
                <Icon name="chevron-right" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Large Editorial Photography Container */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#0a0c10',
            minHeight: '380px'
          }}
        >
          <EditorialImage
            src={activeExp.image}
            alt={activeExp.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.02)',
              transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />

          {/* Luxury Overlay Gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(8, 9, 12, 0.85) 0%, rgba(8, 9, 12, 0.2) 50%, transparent 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Quick Category Stamp (Top Right of Image) */}
          <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 2 }}>
            <span
              style={{
                display: 'inline-block',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                backgroundColor: 'rgba(8, 9, 12, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(224, 162, 77, 0.35)',
                fontSize: '0.72rem',
                color: 'var(--gold)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}
            >
              {activeExp.category}
            </span>
          </div>

          {/* Experience Mini-Pill Selector Ribbon across bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              right: '16px',
              zIndex: 3,
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              padding: '6px',
              backgroundColor: 'rgba(8, 9, 12, 0.75)',
              backdropFilter: 'blur(16px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {INDIA_BEYOND_OBVIOUS.map((exp, idx) => (
              <button
                key={exp.id}
                onClick={() => setActiveIdx(idx)}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: '8px',
                  backgroundColor: activeIdx === idx ? 'var(--gold)' : 'transparent',
                  color: activeIdx === idx ? '#08090C' : 'var(--text-secondary)',
                  border: 'none',
                  fontSize: '0.68rem',
                  fontWeight: activeIdx === idx ? '600' : '400',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                {exp.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
