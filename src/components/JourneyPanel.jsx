/* ==============================================================================
   AERORA — PERSONAL JOURNEY PANEL (SLIDE-OVER DRAWER)
   Floating travel curator displaying selected places, time estimates, and export
   ============================================================================== */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourneyContext } from '../context/JourneyContext';
import { Icon } from './Icons';
import { EditorialImage } from './EditorialImage';

export function JourneyPanel() {
  const {
    selectedPlaces,
    activeDestination,
    removePlace,
    clearJourney,
    isDrawerOpen,
    setIsDrawerOpen,
    totalPlaces,
    totalEstimatedHours,
    toastMessage
  } = useJourneyContext();

  const navigate = useNavigate();

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
      }
    };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, setIsDrawerOpen]);

  return (
    <>
      {/* Interactive Micro-interaction Toast Banner */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: 'var(--space-xl)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 'var(--z-toast)',
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-accent-border)',
            borderRadius: 'var(--radius-full)',
            padding: '0.65rem 1.4rem',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--ls-wide)',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-overlay)',
            animation: 'toast-pop 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <Icon name="check" size={14} style={{ color: 'var(--color-accent)' }} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Slide-over Drawer & Backdrop */}
      {isDrawerOpen && (
        <>
          <div
            className="drawer-backdrop"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />

          <aside
            className="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="journey-panel-title"
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: 'var(--space-lg) var(--space-xl)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(9, 10, 14, 0.65)'
              }}
            >
              <div>
                <span className="eyebrow" style={{ marginBottom: '2px' }}>
                  Voyage Dossier
                </span>
                <h3
                  id="journey-panel-title"
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: '1.4rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  My Journey
                </h3>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="btn-icon"
                aria-label="Close journey panel"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            {/* Destination & Meta Overview Banner */}
            <div
              style={{
                padding: 'var(--space-md) var(--space-xl)',
                backgroundColor: 'rgba(217, 155, 79, 0.05)',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Active Focus
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '500', color: 'var(--color-text-primary)' }}>
                  {activeDestination.name}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                  {activeDestination.country}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span
                  className="badge badge-accent"
                  style={{ marginBottom: '4px' }}
                >
                  {totalPlaces} Places Saved
                </span>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  ~{totalEstimatedHours.toFixed(1)} hrs total
                </div>
              </div>
            </div>

            {/* Selected Places List */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: 'var(--space-lg) var(--space-xl)'
              }}
            >
              {selectedPlaces.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-tertiary)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}
                  >
                    <span>Selected Places ({selectedPlaces.length})</span>
                    <button
                      onClick={clearJourney}
                      style={{
                        color: 'var(--color-error)',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                        background: 'none',
                        border: 'none'
                      }}
                    >
                      Clear All
                    </button>
                  </div>

                  {selectedPlaces.map((place) => (
                    <div
                      key={place.id}
                      style={{
                        display: 'flex',
                        gap: 'var(--space-md)',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-xs)',
                        padding: 'var(--space-sm)',
                        transition: 'border-color var(--transition-fast)'
                      }}
                    >
                      {/* Thumbnail */}
                      <div
                        style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: 'var(--radius-xs)',
                          overflow: 'hidden',
                          flexShrink: 0
                        }}
                      >
                        <EditorialImage
                          src={place.image}
                          alt={place.name}
                          aspectRatio="1/1"
                          fallbackType="landmark"
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.68rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {place.category}
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: '600',
                            color: 'var(--color-text-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {place.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-tertiary)' }}>
                          {place.recommendedDuration}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removePlace(place.id)}
                        className="btn-icon"
                        title={`Remove ${place.name}`}
                        aria-label={`Remove ${place.name} from personal journey`}
                        style={{ width: '28px', height: '28px', flexShrink: 0 }}
                      >
                        <Icon name="close" size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty Places State */
                <div className="empty-state" style={{ padding: 'var(--space-2xl) var(--space-md)' }}>
                  <Icon name="bookmark" size={36} className="empty-state-icon" />
                  <h4 className="empty-state-title" style={{ fontSize: '1.25rem' }}>
                    Your dossier is empty
                  </h4>
                  <p className="empty-state-desc" style={{ fontSize: 'var(--text-xs)' }}>
                    Wander through our destinations and famous landmarks. Click “Add to Journey” on any place to compose your personal itinerary.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                padding: 'var(--space-lg) var(--space-xl)',
                borderTop: '1px solid var(--color-border)',
                backgroundColor: 'rgba(9, 10, 14, 0.75)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-xs)'
              }}
            >
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/planner');
                }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <Icon name="sparkles" size={15} />
                <span>View Full Journey & Plan with AI</span>
              </button>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="btn btn-secondary"
                style={{ width: '100%' }}
              >
                <span>Continue Exploring</span>
              </button>
            </div>
          </aside>
        </>
      )}

      <style>{`
        @keyframes toast-pop {
          from { opacity: 0; transform: translate(-50%, 14px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </>
  );
}
