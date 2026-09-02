/* ==============================================================================
   AERORA — COMPACT WEATHER TELEMETRY CARD
   Editorial climate metrics visualization with real-time station feeds
   ============================================================================== */

import React from 'react';
import { Icon } from './Icons';

export function WeatherCard({ weather, loading, error, title = 'Current Conditions' }) {
  if (loading) {
    return (
      <div
        className="skeleton"
        style={{
          width: '100%',
          height: '220px',
          borderRadius: 'var(--radius-xs)',
          padding: 'var(--space-lg)'
        }}
      />
    );
  }

  if (error || !weather) {
    return (
      <div
        style={{
          padding: 'var(--space-lg)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xs)',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--text-sm)'
        }}
      >
        <span style={{ color: 'var(--color-accent)' }}>Telemetry Notice:</span> Weather is taking a moment to catch up. Calibrating local atmospheric sensors.
      </div>
    );
  }

  return (
    <div
      className="weather-compact-card"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xs)',
        padding: 'var(--space-xl)',
        boxShadow: 'var(--shadow-subtle)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Editorial Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-md)'
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
          {title}
        </span>

        <span
          style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: weather.isLive ? 'var(--color-success)' : 'var(--color-text-tertiary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: weather.isLive ? 'var(--color-success)' : 'var(--color-text-tertiary)'
            }}
          />
          {weather.source}
        </span>
      </div>

      {/* Main Temperature & Primary Condition Display */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-xl)',
          paddingBottom: 'var(--space-lg)',
          borderBottom: '1px solid var(--color-border)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-sm)' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '4.25rem',
              lineHeight: 0.9,
              fontWeight: '300',
              color: 'var(--color-text-primary)'
            }}
          >
            {weather.temp}°
          </span>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '1.25rem',
                color: 'var(--color-text-primary)',
                letterSpacing: '0.04em'
              }}
            >
              {weather.condition}
            </div>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)',
                marginTop: '2px'
              }}
            >
              Feels like {weather.feelsLike}°C
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            color: 'var(--color-accent)'
          }}
        >
          <Icon name="sun" size={32} />
        </div>
      </div>

      {/* Detailed Telemetry Metrics Grid */}
      <div
        className="telemetry-metrics-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-md)'
        }}
      >
        {/* Humidity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Icon name="droplet" size={11} />
            Humidity
          </span>
          <span style={{ fontSize: '1.05rem', fontWeight: '500', color: 'var(--color-text-primary)' }}>
            {weather.humidity}%
          </span>
        </div>

        {/* Wind */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Icon name="wind" size={11} />
            Wind
          </span>
          <span style={{ fontSize: '1.05rem', fontWeight: '500', color: 'var(--color-text-primary)' }}>
            {weather.wind} km/h
          </span>
        </div>

        {/* Sunrise */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Icon name="sunrise" size={11} />
            Sunrise
          </span>
          <span style={{ fontSize: '1.05rem', fontWeight: '500', color: 'var(--color-text-primary)' }}>
            {weather.sunrise}
          </span>
        </div>

        {/* Sunset */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Icon name="sunset" size={11} />
            Sunset
          </span>
          <span style={{ fontSize: '1.05rem', fontWeight: '500', color: 'var(--color-text-primary)' }}>
            {weather.sunset}
          </span>
        </div>
      </div>
    </div>
  );
}
