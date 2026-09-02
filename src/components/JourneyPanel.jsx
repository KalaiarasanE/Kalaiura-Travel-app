/* ==============================================================================
   AERORA — PERSONAL JOURNEY PANEL (REFERENCE DESIGN UPGRADE)
   Slide-over travel dossier with favorite places, saved itineraries & upcoming trips
   ============================================================================== */

import React, { useState, useEffect } from 'react';
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
    savedItinerary,
    isDrawerOpen,
    setIsDrawerOpen,
    totalPlaces,
    totalEstimatedHours,
    toastMessage
  } = useJourneyContext();

  const [activeTab, setActiveTab] = useState('places'); // 'places' | 'itinerary'
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
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid rgba(224, 162, 77, 0.45)',
            borderRadius: 'var(--radius-full)',
            padding: '0.65rem 1.4rem',
            color: 'var(--text-primary)',
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
          <Icon name="check" size={14} style={{ color: 'var(--gold)' }} />
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
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(8, 9, 12, 0.85)'
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
                    color: 'var(--text-primary)'
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

            {/* Destination Focus Banner */}
            <div
              style={{
                padding: 'var(--space-md) var(--space-xl)',
                backgroundColor: 'rgba(224, 162, 77, 0.05)',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: '600' }}>
                  Active Sanctuary
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                  {activeDestination.name}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  {activeDestination.country} · {activeDestination.climate}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-accent" style={{ marginBottom: '4px' }}>
                  {totalPlaces} Places Saved
                </span>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  ~{totalEstimatedHours.toFixed(1)} hrs exploring
                </div>
              </div>
            </div>

            {/* Sub-navigation Tabs */}
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid var(--border)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)'
              }}
            >
              <button
                onClick={() => setActiveTab('places')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: activeTab === 'places' ? '600' : '400',
                  color: activeTab === 'places' ? 'var(--gold)' : 'var(--text-secondary)',
                  borderBottom: activeTab === 'places' ? '2px solid var(--gold)' : '2px solid transparent',
                  cursor: 'pointer'
                }}
              >
                Selected Places ({totalPlaces})
              </button>

              <button
                onClick={() => setActiveTab('itinerary')}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: activeTab === 'itinerary' ? '600' : '400',
                  color: activeTab === 'itinerary' ? 'var(--gold)' : 'var(--text-secondary)',
                  borderBottom: activeTab === 'itinerary' ? '2px solid var(--gold)' : '2px solid transparent',
                  cursor: 'pointer'
                }}
              >
                Saved Itinerary {savedItinerary ? '(1)' : '(0)'}
              </button>
            </div>

            {/* Drawer Body Content */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: 'var(--space-lg) var(--space-xl)'
              }}
            >
              {activeTab === 'places' ? (
                /* Tab 1: Selected Places */
                selectedPlaces.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em'
                      }}
                    >
                      <span>Landmarks ({selectedPlaces.length})</span>
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
                          backgroundColor: 'var(--surface-elevated)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-xs)',
                          padding: 'var(--space-sm)',
                          transition: 'border-color var(--transition-fast)'
                        }}
                      >
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

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.68rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {place.category}
                          </div>
                          <div
                            style={{
                              fontSize: 'var(--text-sm)',
                              fontWeight: '600',
                              color: 'var(--text-primary)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {place.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            {place.recommendedDuration}
                          </div>
                        </div>

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
                  <div className="empty-state" style={{ padding: 'var(--space-2xl) var(--space-md)' }}>
                    <Icon name="bookmark" size={36} className="empty-state-icon" />
                    <h4 className="empty-state-title" style={{ fontSize: '1.25rem' }}>
                      Your dossier is empty
                    </h4>
                    <p className="empty-state-desc" style={{ fontSize: 'var(--text-xs)' }}>
                      Wander through our destinations and famous landmarks. Click “Add to Journey” on any place to compose your personal itinerary.
                    </p>
                  </div>
                )
              ) : (
                /* Tab 2: Saved Itinerary */
                savedItinerary ? (
                  <div>
                    <div style={{ marginBottom: 'var(--space-md)' }}>
                      <span className="eyebrow">Saved Timeline</span>
                      <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                        {activeDestination.name} Synthesis
                      </h4>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                        {savedItinerary.length} Days Generated with AI
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                      {savedItinerary.map((day) => (
                        <div
                          key={day.dayNumber}
                          style={{
                            backgroundColor: 'var(--surface-elevated)',
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius-xs)',
                            padding: 'var(--space-md)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ color: 'var(--gold)', fontWeight: '600', fontSize: 'var(--text-xs)' }}>
                              DAY {String(day.dayNumber).padStart(2, '0')}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              {day.schedule?.length || 0} Events
                            </span>
                          </div>
                          <div style={{ fontSize: 'var(--text-sm)', fontWeight: '500', color: 'var(--text-primary)' }}>
                            {day.theme}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="empty-state" style={{ padding: 'var(--space-2xl) var(--space-md)' }}>
                    <Icon name="sparkles" size={36} className="empty-state-icon" />
                    <h4 className="empty-state-title" style={{ fontSize: '1.25rem' }}>
                      No Saved Itinerary
                    </h4>
                    <p className="empty-state-desc" style={{ fontSize: 'var(--text-xs)' }}>
                      Launch the AI Itinerary Builder to synthesize a structured day-by-day expedition and click “Save Journey”.
                    </p>
                    <button
                      onClick={() => {
                        setIsDrawerOpen(false);
                        navigate('/planner');
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      <span>Build Itinerary</span>
                      <Icon name="arrow-right" size={13} />
                    </button>
                  </div>
                )
              )}
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                padding: 'var(--space-lg) var(--space-xl)',
                borderTop: '1px solid var(--border)',
                backgroundColor: 'rgba(8, 9, 12, 0.85)',
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
                <span>Open Full Workspace & Plan with AI</span>
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
