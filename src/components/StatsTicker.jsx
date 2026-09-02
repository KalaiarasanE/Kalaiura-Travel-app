/* ==============================================================================
   AERORA — STATS TICKER STRIP (REFERENCE DESIGN INSPIRATION)
   Minimalist telemetry bar highlighting editorial curation and intelligence standards
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
      sublabel: 'Live Solar & Wind Feeds',
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
    }
  ];

  return (
    <section
      className="stats-ticker-section"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--surface)',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            divideX: '1px solid var(--border)'
          }}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              style={{
                padding: 'var(--space-xl) var(--space-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                borderRight: idx < stats.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background-color var(--transition-fast)'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'rgba(224, 162, 77, 0.08)',
                  border: '1px solid rgba(224, 162, 77, 0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold)',
                  flexShrink: 0
                }}
              >
                <Icon name={stat.icon} size={20} />
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: '1.65rem',
                    fontWeight: '600',
                    lineHeight: 1,
                    color: 'var(--text-primary)',
                    letterSpacing: '0.04em',
                    marginBottom: '4px'
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-xs)',
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
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginTop: '2px'
                  }}
                >
                  {stat.sublabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
