/* ==============================================================================
   KALAIURA — AI TRAVEL COMPASS (INTELLIGENT CURATION EXPERIENCE)
   Signature AI feature: Glowing Orb core, gold particle ambiance, multi-step
   interactive preference wizard, dynamic staggered recommendations, and conversational India intelligence.
   ============================================================================== */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';
import { EditorialImage } from './EditorialImage';
import { DestinationAssistantCard } from './DestinationAssistantCard';
import { INDIA_DESTINATIONS } from '../data/indiaDestinations';
import { useJourneyContext } from '../context/JourneyContext';
import { askAIGuide } from '../services/ai';

const TRIP_TYPES = [
  { id: 'weekend', label: 'Weekend escape', icon: 'compass', desc: 'Short rejuvenation 2–3 days away' },
  { id: 'beach', label: 'Beach holiday', icon: 'sun', desc: 'Warm sands, coastal breezes & seafood' },
  { id: 'mountain', label: 'Mountain adventure', icon: 'compass', desc: 'High cedar valleys & snowy ridgelines' },
  { id: 'heritage', label: 'Heritage & culture', icon: 'sparkles', desc: 'Living temples, royal palaces & antiquity' },
  { id: 'food', label: 'Food journey', icon: 'sparkles', desc: 'Fragrant spices, royal curries & artisanal tea' },
  { id: 'wildlife', label: 'Nature & wildlife', icon: 'eye', desc: 'Rainforest canopies & elephant reserves' },
  { id: 'romantic', label: 'Romantic getaway', icon: 'sparkles', desc: 'Lake palaces, starry skies & quiet coves' },
  { id: 'solo', label: 'Solo adventure', icon: 'compass', desc: 'Unhurried contemplation & off-map trails' }
];

const DURATIONS = ['2–3 Days', '4–5 Days', '1 Week', '10+ Days'];
const TRAVEL_STYLES = ['Slow & Luxury', 'Cultural Immersion', 'Active Adventure', 'Wellness & Retreat'];
const BUDGET_TIERS = ['Essential (₹₹)', 'Curated (₹₹₹)', 'Royal Heritage (₹₹₹₹)'];
const STARTING_CITIES = ['Bengaluru', 'Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Hyderabad'];

export function AITravelCompass() {
  const [activeStep, setActiveStep] = useState(1); // 1: Trip Type, 2: Duration & Style, 3: Recommendations
  const [selectedType, setSelectedType] = useState('weekend');
  const [selectedDuration, setSelectedDuration] = useState('4–5 Days');
  const [selectedStyle, setSelectedStyle] = useState('Slow & Luxury');
  const [selectedBudget, setSelectedBudget] = useState('Curated (₹₹₹)');
  const [startingCity, setStartingCity] = useState('Bengaluru');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  // Conversational Query Mode
  const [conversationalQuery, setConversationalQuery] = useState('');
  const [chatResponse, setChatResponse] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const { addPlace } = useJourneyContext();

  // Trigger AI recommendation generation
  const handleGenerateRecommendations = () => {
    setIsSynthesizing(true);
    setActiveStep(3);

    setTimeout(() => {
      // Intelligent matching algorithm for India destinations
      let matched = [];

      if (selectedType === 'weekend') {
        if (startingCity === 'Bengaluru' || startingCity === 'Chennai') {
          matched = INDIA_DESTINATIONS.filter(d => ['coorg', 'wayanad', 'ooty', 'pondicherry'].includes(d.id));
        } else if (startingCity === 'Delhi') {
          matched = INDIA_DESTINATIONS.filter(d => ['rishikesh', 'taj-mahal-agra', 'jaipur'].includes(d.id));
        } else if (startingCity === 'Mumbai') {
          matched = INDIA_DESTINATIONS.filter(d => ['goa', 'udaipur', 'maharashtra'].includes(d.id));
        } else {
          matched = INDIA_DESTINATIONS.filter(d => ['coorg', 'rishikesh', 'pondicherry'].includes(d.id));
        }
      } else if (selectedType === 'mountain') {
        matched = INDIA_DESTINATIONS.filter(d => ['kashmir', 'himachal-pradesh', 'manali', 'leh-ladakh', 'munnar', 'darjeeling', 'sikkim'].includes(d.id));
      } else if (selectedType === 'beach') {
        matched = INDIA_DESTINATIONS.filter(d => ['goa', 'andaman-nicobar', 'kerala', 'pondicherry'].includes(d.id));
      } else if (selectedType === 'heritage') {
        matched = INDIA_DESTINATIONS.filter(d => ['rajasthan', 'jaipur', 'udaipur', 'varanasi', 'taj-mahal-agra', 'tamil-nadu', 'karnataka'].includes(d.id));
      } else if (selectedType === 'nature' || selectedType === 'wildlife') {
        matched = INDIA_DESTINATIONS.filter(d => ['kerala', 'munnar', 'wayanad', 'meghalaya', 'andaman-nicobar'].includes(d.id));
      } else if (selectedType === 'romantic') {
        matched = INDIA_DESTINATIONS.filter(d => ['udaipur', 'kashmir', 'kerala', 'andaman-nicobar'].includes(d.id));
      } else {
        matched = INDIA_DESTINATIONS.filter(d => ['kerala', 'rajasthan', 'himachal-pradesh', 'coorg'].includes(d.id));
      }

      if (matched.length === 0) {
        matched = INDIA_DESTINATIONS.slice(0, 3);
      }

      // Add dynamic AI rationale to each match
      const enriched = matched.slice(0, 3).map((dest, idx) => ({
        ...dest,
        aiRationale: `Ideal match for your ${selectedDuration} ${selectedType} from ${startingCity}. Balances ${selectedStyle.toLowerCase()} pacing with exceptional local hospitality.`,
        confidence: 96 - idx * 3
      }));

      setRecommendations(enriched);
      setIsSynthesizing(false);
    }, 1100);
  };

  // Conversational India Travel Queries
  const handleAskCustom = async (queryText) => {
    const text = queryText || conversationalQuery;
    if (!text.trim() || isChatLoading) return;

    setIsChatLoading(true);
    setChatResponse(null);

    try {
      const reply = await askAIGuide(text, 'kerala');
      setChatResponse(reply);
    } catch (err) {
      console.warn("AI Guide note:", err);
      setChatResponse('For a serene trip from your origin, we recommend Coorg or Wayanad—nestled in misty coffee canopies with calm uncrowded roads.');
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <section id="ai-guide" className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      {/* Section Header */}
      <div className="section-header centered" data-home-reveal>
        <span className="eyebrow">Algorithmic Voyage Synthesis</span>
        <h2 className="section-title">
          Your Journey, <span className="animate-gradient-shift">Intelligently Curated.</span>
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
          Tell us where you want to go, what you love, and how you travel. Our AI will shape the journey around you.
        </p>
      </div>

      {/* Main AI Compass Centerpiece Card */}
      <div
        className="ai-compass-container prompt-card-hover"
        data-home-reveal
        data-home-reveal-delay="1"
        style={{
          position: 'relative',
          backgroundColor: 'rgba(12, 14, 19, 0.95)',
          border: '1px solid rgba(224, 162, 77, 0.3)',
          borderRadius: '24px',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(224, 162, 77, 0.08)',
          overflow: 'hidden'
        }}
      >
        {/* Soft Ambient Gold Radial Core Background Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '380px',
            height: '380px',
            background: 'radial-gradient(circle, rgba(224, 162, 77, 0.15) 0%, rgba(224, 162, 77, 0.03) 60%, transparent 80%)',
            pointerEvents: 'none',
            filter: 'blur(30px)'
          }}
        />

        {/* Visual Header: Animated Glowing Orb / AI Core & Compass Telemetry */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            paddingBottom: 'var(--space-xl)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: 'var(--space-xl)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            {/* Concentric Animated Glowing Orb */}
            <div
              className="ai-orb-wrapper"
              style={{
                position: 'relative',
                width: '52px',
                height: '52px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                className="ai-orb-ring-outer"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '1px solid rgba(224, 162, 77, 0.4)',
                  animation: 'ai-ring-rotate 8s linear infinite'
                }}
              />
              <div
                className="ai-orb-ring-inner"
                style={{
                  position: 'absolute',
                  inset: '6px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(224, 162, 77, 0.6)',
                  animation: 'ai-ring-rotate-reverse 6s linear infinite'
                }}
              />
              <div
                className="ai-orb-core"
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #fcd34d 0%, #d97706 70%, #78350f 100%)',
                  boxShadow: '0 0 16px rgba(245, 158, 11, 0.8), 0 0 30px rgba(245, 158, 11, 0.4)',
                  animation: 'ai-orb-pulse 2.4s ease-in-out infinite'
                }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.45rem',
                    fontWeight: '400',
                    color: 'var(--text-primary)',
                    margin: 0,
                    letterSpacing: '0.02em'
                  }}
                >
                  KALAIURA Intelligent Compass
                </h3>
                <span
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    backgroundColor: 'rgba(224, 162, 77, 0.1)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(224, 162, 77, 0.3)'
                  }}
                >
                  India Edition
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Diurnal climate telemetry · Verified travel pacing · Curated sanctuary matching
              </p>
            </div>
          </div>

          {/* Wizard Step Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => setActiveStep(1)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeStep === 1 ? 'var(--gold)' : 'rgba(255, 255, 255, 0.05)',
                color: activeStep === 1 ? '#08090C' : 'var(--text-secondary)',
                fontSize: '0.74rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              1. Theme
            </button>
            <span style={{ color: 'var(--border)' }}>—</span>
            <button
              onClick={() => setActiveStep(2)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeStep === 2 ? 'var(--gold)' : 'rgba(255, 255, 255, 0.05)',
                color: activeStep === 2 ? '#08090C' : 'var(--text-secondary)',
                fontSize: '0.74rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              2. Logistics
            </button>
            <span style={{ color: 'var(--border)' }}>—</span>
            <button
              onClick={handleGenerateRecommendations}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeStep === 3 ? 'var(--gold)' : 'rgba(255, 255, 255, 0.05)',
                color: activeStep === 3 ? '#08090C' : 'var(--text-secondary)',
                fontSize: '0.74rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              3. Sanctuaries
            </button>
          </div>
        </div>

        {/* STEP 1: "Where should we take you?" Suggestion Chips */}
        {activeStep === 1 && (
          <div style={{ animation: 'fade-in 0.3s ease' }}>
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <span className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '4px' }}>
                Question 01
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: '400',
                  color: 'var(--text-primary)',
                  margin: 0
                }}
              >
                Where should we take you?
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Select an overarching expedition motif or mood to calibrate regional climate and terrain.
              </p>
            </div>

            {/* Grid of Interactive Quick Suggestion Chips */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: 'var(--space-md)',
                marginBottom: 'var(--space-2xl)'
              }}
            >
              {TRIP_TYPES.map((chip) => {
                const isSelected = selectedType === chip.id;
                return (
                  <div
                    key={chip.id}
                    onClick={() => setSelectedType(chip.id)}
                    style={{
                      padding: 'var(--space-md)',
                      borderRadius: '14px',
                      backgroundColor: isSelected ? 'rgba(224, 162, 77, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: isSelected ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isSelected ? '0 0 20px rgba(224, 162, 77, 0.15)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          backgroundColor: isSelected ? 'var(--gold)' : 'rgba(255, 255, 255, 0.08)',
                          color: isSelected ? '#08090C' : 'var(--gold)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icon name={chip.icon} size={14} />
                      </div>
                      <strong
                        style={{
                          fontSize: '0.92rem',
                          color: isSelected ? 'var(--gold)' : 'var(--text-primary)'
                        }}
                      >
                        {chip.label}
                      </strong>
                    </div>
                    <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.3 }}>
                      {chip.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setActiveStep(2)} className="btn btn-primary">
                <span>Configure Pacing & Days</span>
                <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Intelligent Follow-Up Questions (Duration, Starting City, Budget, Style) */}
        {activeStep === 2 && (
          <div style={{ animation: 'fade-in 0.3s ease' }}>
            <div style={{ marginBottom: 'var(--space-xl)' }}>
              <span className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '4px' }}>
                Question 02 & 03
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontWeight: '400',
                  color: 'var(--text-primary)',
                  margin: 0
                }}
              >
                Calibrate Your Expedition Parameters
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Fine-tune transit logistics, duration, and sensory preferences.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'var(--space-xl)',
                marginBottom: 'var(--space-2xl)'
              }}
            >
              {/* 1. Days Available */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
                  How many days do you have?
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {DURATIONS.map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setSelectedDuration(dur)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        border: selectedDuration === dur ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: selectedDuration === dur ? 'rgba(224, 162, 77, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        color: selectedDuration === dur ? 'var(--gold)' : 'var(--text-secondary)',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Starting City */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
                  Starting City / Hub
                </label>
                <select
                  value={startingCity}
                  onChange={(e) => setStartingCity(e.target.value)}
                  className="input-field"
                  style={{
                    backgroundColor: 'rgba(20, 24, 32, 0.9)',
                    borderColor: 'var(--border)',
                    fontSize: '0.85rem',
                    padding: '0.5rem 0.85rem'
                  }}
                >
                  {STARTING_CITIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* 3. Travel Style */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
                  What's your travel style?
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {TRAVEL_STYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        border: selectedStyle === style ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: selectedStyle === style ? 'rgba(224, 162, 77, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        color: selectedStyle === style ? 'var(--gold)' : 'var(--text-secondary)',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Approximate Budget Tier */}
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
                  Approximate Budget
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {BUDGET_TIERS.map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedBudget(tier)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        border: selectedBudget === tier ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                        backgroundColor: selectedBudget === tier ? 'rgba(224, 162, 77, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        color: selectedBudget === tier ? 'var(--gold)' : 'var(--text-secondary)',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setActiveStep(1)} className="btn btn-secondary btn-sm">
                <span>← Back</span>
              </button>
              <button onClick={handleGenerateRecommendations} className="btn btn-primary">
                <Icon name="sparkles" size={14} />
                <span>Synthesize Sanctuaries</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Dynamic Recommendation Results */}
        {activeStep === 3 && (
          <div style={{ animation: 'fade-in 0.4s ease' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 'var(--space-md)',
                marginBottom: 'var(--space-xl)'
              }}
            >
              <div>
                <span className="eyebrow" style={{ color: 'var(--gold)', marginBottom: '4px' }}>
                  Synthesis Complete
                </span>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.9rem',
                    fontWeight: '400',
                    color: 'var(--text-primary)',
                    margin: 0
                  }}
                >
                  Based on your preferences...
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Curated for {selectedDuration} · {selectedStyle} · Departing from {startingCity}
                </p>
              </div>

              <button
                onClick={() => setActiveStep(1)}
                className="btn btn-secondary btn-xs"
              >
                <span>Reset Parameters</span>
              </button>
            </div>

            {/* Synthesizing Loading State */}
            {isSynthesizing ? (
              <div
                style={{
                  padding: 'var(--space-4xl) var(--space-xl)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-md)'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '2px solid rgba(224, 162, 77, 0.2)',
                    borderTopColor: 'var(--gold)',
                    animation: 'ai-ring-rotate 0.8s linear infinite'
                  }}
                />
                <div style={{ fontSize: '0.88rem', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Synthesizing seasonal light and geographic transit...
                </div>
              </div>
            ) : (
              /* Staggered Recommendation Cards */
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 'var(--space-xl)',
                  marginBottom: 'var(--space-2xl)'
                }}
              >
                {recommendations.map((item, idx) => (
                  <article
                    key={item.id}
                    className="prompt-card-hover animate-parallax-fade-up"
                    style={{
                      backgroundColor: 'rgba(18, 21, 28, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      animationDelay: `${idx * 0.15}s`
                    }}
                  >
                    {/* Media Showcase */}
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
                      <EditorialImage
                        src={item.cardImage}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(8, 9, 12, 0.9) 0%, transparent 60%)'
                        }}
                      />
                      <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            fontWeight: '600',
                            color: '#08090C',
                            backgroundColor: 'var(--gold)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px'
                          }}
                        >
                          #{idx + 1} Recommendation
                        </span>
                      </div>
                      <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 2 }}>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            color: 'var(--text-primary)',
                            backgroundColor: 'rgba(8, 9, 12, 0.8)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px',
                            border: '1px solid rgba(255, 255, 255, 0.15)'
                          }}
                        >
                          {item.confidence}% Match
                        </span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div style={{ padding: 'var(--space-lg)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                        <h4
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.5rem',
                            fontWeight: '400',
                            color: 'var(--text-primary)',
                            margin: 0,
                            textTransform: 'uppercase'
                          }}
                        >
                          {item.name}
                        </h4>
                        <span style={{ fontSize: '0.74rem', color: 'var(--gold)', fontWeight: '600' }}>
                          {item.idealDays}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 'var(--space-sm)' }}>
                        {item.state} · {item.category}
                      </div>

                      {/* AI Why Recommended rationale */}
                      <p
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 'var(--lh-normal)',
                          marginBottom: 'var(--space-md)',
                          flex: 1
                        }}
                      >
                        {item.aiRationale}
                      </p>

                      {/* Highlights Pill Strip */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'var(--space-lg)' }}>
                        {item.highlights?.slice(0, 3).map((h, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '0.68rem',
                              padding: '0.2rem 0.55rem',
                              borderRadius: '9999px',
                              backgroundColor: 'rgba(255, 255, 255, 0.04)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                        <Link
                          to={`/destination/${item.id}`}
                          className="btn btn-secondary btn-sm"
                          style={{ flex: 1 }}
                        >
                          <span>Explore</span>
                          <Icon name="arrow-right" size={13} />
                        </Link>
                        <button
                          onClick={() => addPlace({ id: item.id, name: item.name, category: item.category, image: item.cardImage })}
                          className="btn btn-primary btn-sm"
                          style={{ flex: 1 }}
                        >
                          <Icon name="plus" size={13} />
                          <span>Add to Journey</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Conversational Prompt Box & Quick Suggestions */}
        <div
          style={{
            marginTop: 'var(--space-2xl)',
            paddingTop: 'var(--space-xl)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-sm)' }}>
            <Icon name="sparkles" size={14} style={{ color: 'var(--gold)' }} />
            <span style={{ fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: '600' }}>
              Or Ask Any Specific India Travel Question
            </span>
          </div>

          {/* Prompt Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'var(--space-md)' }}>
            {[
              'I have 4 days from Bengaluru and want a peaceful trip',
              'Plan a 5-day Kerala trip',
              'Best places near Bengaluru in monsoon',
              'Where should I go in December?',
              'Find a peaceful mountain destination',
              'Plan a budget trip to Rajasthan'
            ].map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setConversationalQuery(p); handleAskCustom(p); }}
                style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Search Input Bar */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={conversationalQuery}
              onChange={(e) => setConversationalQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskCustom()}
              placeholder="e.g. 'Where should I travel with family in October for 5 days?'"
              className="input-field"
              style={{
                borderRadius: '12px',
                backgroundColor: 'rgba(20, 24, 32, 0.95)',
                border: '1px solid var(--border)',
                fontSize: '0.88rem'
              }}
            />
            <button
              onClick={() => handleAskCustom()}
              disabled={isChatLoading}
              className="btn btn-primary"
              style={{ minWidth: '120px' }}
            >
              <Icon name="sparkles" size={14} />
              <span>{isChatLoading ? 'Curating...' : 'Ask AI'}</span>
            </button>
          </div>

          {/* Chat Response Display */}
          {chatResponse && (
            <div
              style={{
                marginTop: 'var(--space-lg)',
                padding: 'var(--space-lg)',
                backgroundColor: 'rgba(224, 162, 77, 0.06)',
                border: '1px solid rgba(224, 162, 77, 0.25)',
                borderRadius: '14px',
                animation: 'fade-in 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '6px' }}>
                <Icon name="compass" size={14} />
                <span>KALAIURA Guide Dispatch</span>
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 'var(--lh-relaxed)', margin: 0, whiteSpace: 'pre-line' }}>
                {chatResponse.text || String(chatResponse)}
              </div>
              {chatResponse.destinationCard && (
                <div style={{ marginTop: 'var(--space-md)' }}>
                  <DestinationAssistantCard
                    data={chatResponse.destinationCard}
                    onQuickAsk={(q) => { setConversationalQuery(q); handleAskCustom(q); }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ai-ring-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ai-ring-rotate-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes ai-orb-pulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.15); opacity: 1; filter: drop-shadow(0 0 12px #f59e0b); }
        }
      `}</style>
    </section>
  );
}
