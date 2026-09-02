/* ==============================================================================
   AERORA — DESTINATION DETAIL & CONTENT FEATURES
   Styled with exact motionsites-ai feature card patterns & typography
   ============================================================================== */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWeather } from '../hooks/useWeather';
import { PLACES } from '../data/places';
import { WeatherCard } from './WeatherCard';
import { FamousPlaces } from './FamousPlaces';
import { EditorialImage } from './EditorialImage';
import { Icon } from './Icons';

export function DestinationDetail({ destination }) {
  const navigate = useNavigate();

  // Fetch real-time weather telemetry for this destination
  const { weather, loading: weatherLoading, error: weatherError } = useWeather(
    destination.coordinates?.lat,
    destination.coordinates?.lon,
    destination.name
  );

  // Filter famous places for this destination
  const destinationPlaces = PLACES.filter((p) => p.destinationId === destination.id);

  return (
    <div className="destination-detail-page" style={{ minHeight: '100vh', paddingBottom: 'var(--space-4xl)' }}>
      {/* 1. TOP SECTION: Cinematic Hero Banner */}
      <section
        style={{
          position: 'relative',
          height: '75vh',
          minHeight: '520px',
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 'var(--space-3xl)',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <EditorialImage
            src={destination.heroImage}
            alt={`Atmospheric vista of ${destination.name}`}
            aspectRatio="auto"
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />

          {/* Cinematic Vignettes */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(8, 9, 12, 0.4) 0%, rgba(8, 9, 12, 0.65) 50%, #08090C 100%)',
              pointerEvents: 'none'
            }}
          />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-xs)',
              fontSize: 'var(--text-xs)',
              letterSpacing: 'var(--ls-wide)',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: 'var(--space-md)'
            }}
          >
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <Link to="/destinations" style={{ color: 'var(--text-secondary)' }}>Destinations</Link>
            <span>/</span>
            <span style={{ color: 'var(--gold)' }}>{destination.name}</span>
          </nav>

          <span className="eyebrow">{destination.country} · {destination.region}</span>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: '300',
              lineHeight: 1,
              letterSpacing: '0.02em',
              marginBottom: 'var(--space-md)',
              textTransform: 'uppercase'
            }}
          >
            {destination.name}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'var(--text-secondary)',
              maxWidth: '780px',
              lineHeight: 'var(--lh-relaxed)',
              fontWeight: '300'
            }}
          >
            {destination.shortDescription}
          </p>
        </div>
      </section>

      {/* 2. REAL-TIME WEATHER TELEMETRY SECTION */}
      <section className="container" style={{ marginTop: 'calc(-1 * var(--space-xl))', position: 'relative', zIndex: 3, marginBottom: 'var(--space-3xl)' }}>
        <WeatherCard
          weather={weather}
          loading={weatherLoading}
          error={weatherError}
          title={`Live Telemetry · ${destination.name}`}
        />
      </section>

      {/* 3. "WHY GO" FEATURE PILLARS (MOTIONSITES CARD STYLE) */}
      <section className="container" style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="section-header">
          <span className="eyebrow">The Editorial Perspective</span>
          <h2 className="section-title">Why Go</h2>
          <p className="section-subtitle">
            Beyond postcard sights—the distinctive character, textures, and sensory nuances that make {destination.name} irreplaceable.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-xl)'
          }}
        >
          {destination.whyGo?.map((pillar, idx) => (
            <div
              key={idx}
              className="prompt-card-hover"
              style={{
                padding: 'var(--space-2xl) var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(224, 162, 77, 0.1)',
                  border: '1px solid rgba(224, 162, 77, 0.3)',
                  color: 'var(--gold)',
                  fontSize: '0.72rem',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  width: 'fit-content',
                  marginBottom: 'var(--space-md)'
                }}
              >
                <span>Pillar 0{idx + 1}</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: '400',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-sm)'
                }}
              >
                {pillar.title}
              </h3>

              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--lh-relaxed)', margin: 0 }}>
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. "THE PLACES THAT DEFINE IT" LANDMARKS */}
      <div className="container">
        <FamousPlaces
          places={destinationPlaces}
          destinationName={destination.name}
          title="The Places That Define It"
        />
      </div>

      {/* 5. "WHEN TO GO" CLIMATIC RHYTHMS (MOTIONSITES CARD STYLE) */}
      <section className="container" style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="section-header">
          <span className="eyebrow">Climatic Rhythms</span>
          <h2 className="section-title">When to Go</h2>
          <p className="section-subtitle">
            {destination.whenToGo?.recommendation}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-md)'
          }}
        >
          {destination.whenToGo?.seasons.map((season, idx) => (
            <div
              key={idx}
              className="prompt-card-hover"
              style={{ padding: 'var(--space-lg)' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--gold)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  marginBottom: 'var(--space-xs)'
                }}
              >
                <Icon name="calendar" size={13} />
                <span>Seasonal Phase</span>
              </div>

              <h4
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-xs)'
                }}
              >
                {season.name}
              </h4>

              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--lh-relaxed)', margin: 0 }}>
                {season.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. "LOCAL NOTES" INSIDER ETIQUETTE (MOTIONSITES CARD STYLE) */}
      <section className="container" style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="section-header">
          <span className="eyebrow">Insider Etiquette</span>
          <h2 className="section-title">Local Notes</h2>
          <p className="section-subtitle">
            Subtle customs, cultural nuances, and resident perspectives to honor while exploring.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-lg)'
          }}
        >
          {destination.localNotes?.map((note, idx) => (
            <div
              key={idx}
              className="prompt-card-hover"
              style={{
                padding: 'var(--space-xl)',
                borderLeft: '3px solid var(--gold)'
              }}
            >
              <div style={{ fontSize: '0.68rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '600', marginBottom: '4px' }}>
                Cultural Note
              </div>
              <h4
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-xs)'
                }}
              >
                {note.label}
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--lh-relaxed)', margin: 0 }}>
                {note.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. "PLAN YOUR DAYS" LAUNCHPAD SECTION */}
      <section className="container" style={{ padding: 'var(--space-3xl) 0' }}>
        <div
          className="prompt-card-hover"
          style={{
            padding: 'clamp(2.5rem, 5vw, 4rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Radial Gold Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px',
              height: '350px',
              background: 'radial-gradient(circle, rgba(224, 162, 77, 0.14) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '650px', margin: '0 auto' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              Day-by-Day Synthesis
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '300',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-sm)'
              }}
            >
              Ready to Navigate {destination.name}?
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--lh-relaxed)', marginBottom: 'var(--space-xl)' }}>
              Let our AI Voyage Architect compose an unhurried, day-by-day expedition schedule calibrated for {destination.name}’s seasonal light and pacing.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/planner')}
                className="btn btn-primary"
              >
                <span>Synthesize {destination.name} Plan</span>
                <Icon name="sparkles" size={15} />
              </button>

              <button
                onClick={() => navigate('/guide')}
                className="btn btn-secondary"
              >
                <span>Consult AI Guide</span>
                <Icon name="arrow-right" size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
