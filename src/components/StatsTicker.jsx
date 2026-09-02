/* ==============================================================================
   KALAIURA — ANIMATED STATS & TELEMETRY MARQUEE
   Smooth infinite ribbon animation inspired by motionsites-ai motion language
   ============================================================================== */

import React from 'react';
import { Icon } from './Icons';

export function StatsTicker() {
  const stats = [
    {
      value: '12',
      label: 'Curated Sanctuaries',
      sublabel: 'Global Heritage Centers',
      icon: 'compass'
    },
    {
      value: '24/7',
      label: 'Climate Telemetry',
      sublabel: 'Live Diurnal Feeds',
      icon: 'sun'
    },
    {
      value: '100%',
      label: 'Bespoke AI Itineraries',
      sublabel: 'Tailored Pacing & Light',
      icon: 'sparkles'
    },
    {
      value: '0',
      label: 'Tourist Clichés',
      sublabel: 'Pure Unhurried Depth',
      icon: 'eye'
    },
    {
      value: '5',
      label: 'Continental Waypoints',
      sublabel: 'Verified Route Geometry',
      icon: 'compass'
    },
    {
      value: '18°C',
      label: 'Kyoto Dawn Average',
      sublabel: 'Autumn Mists & Solitude',
      icon: 'sun'
    }
  ];

  // Duplicate for seamless 360 loop
  const tickerItems = [...stats, ...stats];

  return (
    <section
      className="stats-ticker-section"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--surface)',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)'
      }}
    >
      <div
        className="animate-marquee-x"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2xl)',
          padding: 'var(--space-lg) 0'
        }}
      >
        {tickerItems.map((stat, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              padding: '0 var(--space-xl)',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              flexShrink: 0,
              cursor: 'default',
              transition: 'transform 0.2s ease'
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(224, 162, 77, 0.08)',
                border: '1px solid rgba(224, 162, 77, 0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold)',
                flexShrink: 0
              }}
            >
              <Icon name={stat.icon} size={18} />
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '1.45rem',
                  fontWeight: '600',
                  lineHeight: 1,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.04em',
                  marginBottom: '3px'
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  fontWeight: '600',
                  color: 'var(--gold)'
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)'
                }}
              >
                {stat.sublabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
