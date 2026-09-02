/* ==============================================================================
   AERORA — ITINERARY DAY COMPONENT
   Structured day-by-day timeline node with luxury editorial styling
   ============================================================================== */

import React from 'react';
import { Icon } from './Icons';

export function ItineraryDay({ day }) {
  return (
    <article
      className="prompt-card-hover animate-parallax-fade-up"
      style={{
        padding: 'var(--space-2xl)',
        marginBottom: 'var(--space-xl)',
        position: 'relative',
        animationDelay: `${((day.dayNumber - 1) % 6) * 0.1}s`
      }}
    >
      {/* Day Identification & Theme */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: 'var(--space-md)',
          marginBottom: 'var(--space-lg)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-md)' }}>
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '1.75rem',
              fontWeight: '600',
              color: 'var(--color-accent)',
              letterSpacing: '0.08em'
            }}
          >
            DAY {String(day.dayNumber).padStart(2, '0')}
          </span>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              fontWeight: '300',
              color: 'var(--color-text-primary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            {day.theme}
          </h4>
        </div>

        <span
          className="badge"
          style={{
            fontSize: '0.68rem',
            color: 'var(--color-text-tertiary)'
          }}
        >
          {day.schedule.length} Milestones
        </span>
      </div>

      {/* Structured Day Timeline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-lg)',
          position: 'relative',
          paddingLeft: 'var(--space-md)'
        }}
      >
        {/* Subtle Vertical Timeline Connector Line */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            bottom: '24px',
            left: '26px',
            width: '1px',
            backgroundColor: 'var(--color-border)'
          }}
        />

        {day.schedule.map((event, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              gap: 'var(--space-lg)',
              alignItems: 'flex-start',
              position: 'relative'
            }}
          >
            {/* Timeline Dot & Time Indicator */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '58px',
                zIndex: 1
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: 'var(--color-accent-light)',
                  backgroundColor: 'var(--color-surface)',
                  padding: '2px 4px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--color-border)'
                }}
              >
                {event.time}
              </span>
            </div>

            {/* Event Description Card */}
            <div
              style={{
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-xs)',
                padding: 'var(--space-md)',
                transition: 'border-color var(--transition-fast)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-xs)',
                  marginBottom: '4px'
                }}
              >
                <h5
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  {event.activity}
                </h5>

                <span
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--color-text-tertiary)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Icon name="clock" size={11} />
                  {event.duration}
                </span>
              </div>

              {/* Location Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.75rem',
                  color: 'var(--color-accent)',
                  marginBottom: '6px'
                }}
              >
                <Icon name="map-pin" size={11} />
                <span>{event.location}</span>
              </div>

              {/* Editorial Explanation */}
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: '#b5b9c5',
                  lineHeight: 'var(--lh-normal)'
                }}
              >
                {event.explanation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
