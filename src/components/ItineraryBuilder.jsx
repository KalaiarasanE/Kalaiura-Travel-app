/* ==============================================================================
   AERORA — AI ITINERARY BUILDER & INTELLIGENT TRAVEL WORKSPACE
   Parametric voyage synthesizer with expense estimates, weather telemetry & structured days
   ============================================================================== */

import React, { useState, useMemo } from 'react';
import { DESTINATIONS, TRAVEL_STYLES, BUDGET_LEVELS } from '../data/destinations';
import { generateStructuredItinerary } from '../services/ai';
import { ItineraryDay } from './ItineraryDay';
import { Icon } from './Icons';
import { useJourneyContext } from '../context/JourneyContext';

const AVAILABLE_INTERESTS = [
  'Photography',
  'Zen Gardens',
  'Fine Wine',
  'Mountain Trails',
  'Historic Ruins',
  'Street Food',
  'Local Artisans',
  'Waterfront Vistas'
];

export function ItineraryBuilder({ initialDestinationId = 'kyoto' }) {
  const { savedItinerary, setSavedItinerary, setActiveDestinationId } = useJourneyContext();

  const [destinationId, setDestinationId] = useState(initialDestinationId);
  const [durationDays, setDurationDays] = useState(5);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [travelStyle, setTravelStyle] = useState('Culture');
  const [budget, setBudget] = useState('Premium');
  const [pace, setPace] = useState('Balanced');
  const [selectedInterests, setSelectedInterests] = useState(['Photography', 'Historic Ruins']);

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(savedItinerary);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);

  const selectedDestination = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0];

  // Dynamic estimated expenses calculation based on budget and duration
  const estimatedExpenses = useMemo(() => {
    const dailyBase = budget === 'Ultra-Luxury' ? 650 : budget === 'Premium' ? 320 : 160;
    const lodging = dailyBase * durationDays * 0.55;
    const culinary = dailyBase * durationDays * 0.25;
    const cultural = dailyBase * durationDays * 0.2;
    const total = lodging + culinary + cultural;
    return {
      lodging: Math.round(lodging),
      culinary: Math.round(culinary),
      cultural: Math.round(cultural),
      total: Math.round(total)
    };
  }, [budget, durationDays]);

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleCreateJourney = async () => {
    setIsGenerating(true);
    setIsSavedFeedback(false);
    try {
      const plan = await generateStructuredItinerary({
        destinationId,
        durationDays,
        travelStyle,
        budget,
        pace,
        interests: selectedInterests
      });
      setCurrentPlan(plan);
      setActiveDestinationId(destinationId);
    } catch (err) {
      console.error('Failed to generate journey', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveJourney = () => {
    if (currentPlan) {
      setSavedItinerary(currentPlan);
      setIsSavedFeedback(true);
      setTimeout(() => setIsSavedFeedback(false), 3000);
    }
  };

  const handlePrintItinerary = () => {
    window.print();
  };

  return (
    <div className="itinerary-builder-wrapper" style={{ padding: 'var(--space-2xl) 0' }}>
      {/* Editorial Workspace Split Layout */}
      <div
        className="builder-split-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '400px 1fr',
          gap: 'var(--space-2xl)',
          alignItems: 'start'
        }}
      >
        {/* Controls Workspace Dashboard */}
        <aside
          className="builder-sidebar"
          style={{
            backgroundColor: 'var(--surface-elevated)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-xl)',
            boxShadow: 'var(--shadow-subtle)',
            position: 'sticky',
            top: 'calc(var(--nav-height) + 20px)'
          }}
        >
          <div style={{ marginBottom: 'var(--space-lg)' }}>
            <span className="eyebrow">Workspace Architect</span>
            <h3
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '1.45rem',
                fontWeight: '400',
                letterSpacing: '0.04em',
                lineHeight: 1.2
              }}
            >
              Build My Journey
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Configure expedition parameters for an AI-synthesized, day-by-day editorial itinerary.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateJourney();
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}
          >
            {/* Destination Selection */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--ls-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '6px'
                }}
              >
                Destination
              </label>
              <select
                className="input-field"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Weather Snapshot */}
            <div
              style={{
                backgroundColor: 'rgba(8, 9, 12, 0.65)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.65rem 0.95rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 'var(--text-xs)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Icon name="sun" size={14} style={{ color: 'var(--gold)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Season Telemetry:</span>
              </div>
              <span style={{ color: 'var(--gold)', fontWeight: '500' }}>
                {selectedDestination.defaultWeather.temp}°C · {selectedDestination.defaultWeather.condition}
              </span>
            </div>

            {/* Departure Date */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--ls-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '6px'
                }}
              >
                Target Departure Date
              </label>
              <input
                type="date"
                className="input-field"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </div>

            {/* Duration Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label
                  style={{
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--ls-wider)',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)'
                  }}
                >
                  Duration
                </label>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--gold)' }}>
                  {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: 'var(--gold)',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Travel Style */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--ls-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '6px'
                }}
              >
                Travel Style
              </label>
              <select
                className="input-field"
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
              >
                {TRAVEL_STYLES.filter((s) => s !== 'All').map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>

            {/* Pace: Slow, Balanced, Fast */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--ls-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '6px'
                }}
              >
                Pace
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-xs)' }}>
                {['Slow', 'Balanced', 'Fast'].map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPace(p)}
                    className={`pill-filter ${pace === p ? 'active' : ''}`}
                    style={{ textAlign: 'center', padding: '0.45rem 0' }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--ls-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '6px'
                }}
              >
                Budget Level
              </label>
              <select
                className="input-field"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                {BUDGET_LEVELS.filter((b) => b !== 'All').map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Estimated Expenses Breakdown Widget */}
            <div
              style={{
                backgroundColor: 'rgba(8, 9, 12, 0.65)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xs)',
                padding: 'var(--space-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Estimated Total:</span>
                <span style={{ color: 'var(--gold)', fontWeight: '600' }}>${estimatedExpenses.total} USD</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                <span>Lodging: ${estimatedExpenses.lodging}</span>
                <span>Dining: ${estimatedExpenses.culinary}</span>
                <span>Cultural: ${estimatedExpenses.cultural}</span>
              </div>
            </div>

            {/* Interests Multi-Select */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: 'var(--ls-wider)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: '6px'
                }}
              >
                Interests & Themes
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {AVAILABLE_INTERESTS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      style={{
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.7rem',
                        backgroundColor: isSelected ? 'rgba(224, 162, 77, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                        border: isSelected ? '1px solid var(--gold)' : '1px solid var(--border)',
                        color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                        cursor: 'pointer'
                      }}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: 'var(--space-sm)' }}
            >
              {isGenerating ? (
                <>
                  <Icon name="refresh" size={16} className="spinning" />
                  <span>Synthesizing Plan...</span>
                </>
              ) : (
                <>
                  <Icon name="sparkles" size={16} />
                  <span>Create My Journey</span>
                </>
              )}
            </button>
          </form>
        </aside>

        {/* Results Timeline Canvas */}
        <main style={{ minHeight: '520px' }}>
          {isGenerating ? (
            /* Loading State */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div className="skeleton" style={{ height: '90px', width: '100%' }} />
              <div className="skeleton" style={{ height: '240px', width: '100%' }} />
              <div className="skeleton" style={{ height: '240px', width: '100%' }} />
            </div>
          ) : currentPlan && currentPlan.length > 0 ? (
            /* Structured Rendered Days */
            <div>
              {/* Itinerary Title Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 'var(--space-md)',
                  backgroundColor: 'var(--surface-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-xs)',
                  padding: 'var(--space-lg)',
                  marginBottom: 'var(--space-xl)',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div>
                  <span className="eyebrow">Structured Itinerary</span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: '300',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {selectedDestination.name} · {durationDays} Days of Discovery
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                    Style: {travelStyle} · Pace: {pace} · Budget: {budget} · Est. Total: ${estimatedExpenses.total} USD
                  </p>
                </div>

                {/* Plan Management Actions */}
                <div style={{ display: 'flex', gap: 'var(--space-xs)', flexWrap: 'wrap' }}>
                  <button
                    onClick={handleCreateJourney}
                    className="btn btn-secondary btn-sm"
                    title="Regenerate with different variations"
                  >
                    <Icon name="refresh" size={13} />
                    <span>Regenerate</span>
                  </button>

                  <button
                    onClick={handleSaveJourney}
                    className="btn btn-primary btn-sm"
                    title="Save this itinerary to your personal journey"
                  >
                    <Icon name={isSavedFeedback ? 'check' : 'bookmark'} size={13} />
                    <span>{isSavedFeedback ? 'Saved' : 'Save Journey'}</span>
                  </button>

                  <button
                    onClick={handlePrintItinerary}
                    className="btn btn-ghost btn-sm"
                    title="Print or export itinerary"
                  >
                    <Icon name="share" size={13} />
                    <span>Print</span>
                  </button>
                </div>
              </div>

              {/* Day-by-Day Render */}
              <div className="itinerary-timeline-container">
                {currentPlan.map((day) => (
                  <ItineraryDay key={day.dayNumber} day={day} />
                ))}
              </div>
            </div>
          ) : (
            /* Initial Prompt State */
            <div className="empty-state" style={{ marginTop: 'var(--space-xl)' }}>
              <div className="empty-state-icon">
                <Icon name="sparkles" size={44} />
              </div>
              <h3 className="empty-state-title">Let Intelligence Shape Your Journey</h3>
              <p className="empty-state-desc">
                Select your preferred destination, departure date, pacing, and cultural themes on the left, then click <strong>Create My Journey</strong> to generate an unhurried, day-by-day travel architecture.
              </p>
              <button onClick={handleCreateJourney} className="btn btn-primary btn-sm">
                <span>Generate Kyoto Sample</span>
                <Icon name="arrow-right" size={14} />
              </button>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .spinning {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
