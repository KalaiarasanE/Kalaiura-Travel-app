/* ==============================================================================
   AERORA — DESTINATION DETAIL EXPERIENCE
   Comprehensive dedicated sanctuary profile with telemetry, narratives & landmarks
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
              background: 'linear-gradient(to bottom, rgba(9, 10, 14, 0.4) 0%, rgba(9, 10, 14, 0.6) 50%, rgba(9, 10, 14, 0.98) 100%)',
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
              color: 'var(--color-text-tertiary)',
              marginBottom: 'var(--space-md)'
            }}
          >
            <Link to="/" style={{ color: 'var(--color-text-secondary)' }}>Home</Link>
            <span>/</span>
            <Link to="/destinations" style={{ color: 'var(--color-text-secondary)' }}>Destinations</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-accent)' }}>{destination.name}</span>
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
              color: '#d4d8e2',
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

      {/* 3. "WHY GO" SECTION */}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-xl)'
          }}
        >
          {destination.whyGo?.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xs)',
                padding: 'var(--space-xl)',
                position: 'relative',
                transition: 'border-color var(--transition-fast)'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '2rem',
                  fontWeight: '600',
                  color: 'rgba(217, 155, 79, 0.3)',
                  marginBottom: 'var(--space-xs)'
                }}
              >
                0{idx + 1}
              </div>
              <h3
                style={{
                  fontSize: '1.35rem',
                  fontWeight: '500',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-sm)'
                }}
              >
                {pillar.title}
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: '#b2b6c2', lineHeight: 'var(--lh-relaxed)' }}>
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. "THE PLACES THAT DEFINE IT" SECTION */}
      <div className="container">
        <FamousPlaces
          places={destinationPlaces}
          destinationName={destination.name}
          title="The Places That Define It"
        />
      </div>

      {/* 5. "WHEN TO GO" SECTION */}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 'var(--space-md)'
          }}
        >
          {destination.whenToGo?.seasons.map((season, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xs)',
                padding: 'var(--space-lg)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: 'var(--color-accent)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--ls-wide)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-xs)'
                }}
              >
                <Icon name="calendar" size={13} />
                <span>Season Profile</span>
              </div>
              <h4
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-xs)'
                }}
              >
                {season.name}
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: '#a7abb6', lineHeight: 'var(--lh-relaxed)' }}>
                {season.note}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. "LOCAL NOTES" SECTION */}
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
              style={{
                borderLeft: '2px solid var(--color-accent)',
                paddingLeft: 'var(--space-lg)',
                paddingTop: 'var(--space-xs)',
                paddingBottom: 'var(--space-xs)'
              }}
            >
              <h4
                style={{
                  fontSize: '1.15rem',
                  fontWeight: '500',
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-xs)'
                }}
              >
                {note.label}
              </h4>
              <p style={{ fontSize: 'var(--text-sm)', color: '#b5b9c5', lineHeight: 'var(--lh-relaxed)' }}>
                {note.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. "PLAN YOUR DAYS" SECTION */}
      <section className="container" style={{ padding: 'var(--space-3xl) 0' }}>
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-accent-border)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-3xl) var(--space-2xl)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-overlay)'
          }}
        >
          {/* Subtle Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '300px',
              background: 'radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <span className="eyebrow" style={{ justifyContent: 'center' }}>
            Structured Expedition
          </span>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: '300',
              marginBottom: 'var(--space-sm)',
              color: 'var(--color-text-primary)'
            }}
          >
            Plan Your Days in {destination.name}
          </h2>

          <p
            style={{
              fontSize: 'var(--text-md)',
              color: 'var(--color-text-secondary)',
              maxWidth: '620px',
              margin: '0 auto var(--space-2xl)',
              lineHeight: 'var(--lh-relaxed)'
            }}
          >
            Synthesize a bespoke day-by-day itinerary calibrated for {destination.name}’s local tempo, seasonal light, and landmark distances.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/planner')}
              className="btn btn-primary btn-lg"
            >
              <Icon name="sparkles" size={16} />
              <span>Launch AI Itinerary Builder</span>
            </button>

            <button
              onClick={() => navigate('/guide')}
              className="btn btn-secondary btn-lg"
            >
              <span>Consult AERORA Guide</span>
              <Icon name="arrow-right" size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
