/* ==============================================================================
   KALAIURA — TRAVEL STORIES / INSPIRATION
   Memoirs, sensory essays, and visual reflections from travels across India
   ============================================================================== */

import React from 'react';
import { Icon } from './Icons';

export function TravelStories() {
  const stories = [
    {
      title: 'Dawn Over the Vermilion Ghats of Kashi',
      author: 'Aravind Swaminathan',
      role: 'Cultural Anthropologist',
      location: 'Varanasi, Uttar Pradesh',
      snippet: 'At 05:15 AM, as the first wooden oars dip into the sacred mist of the Ganges, the chants begin. The river reflects centuries of devotion before the city awakens to commerce.',
      readTime: '4 min dispatch'
    },
    {
      title: 'The Silent Teakwood Canals of Kumarakom',
      author: 'Maya Sen',
      role: 'Landscape Photographer',
      location: 'Kumarakom, Kerala',
      snippet: 'Moored in Vembanad Lake under a canopy of coconut palms, night falls with complete auditory stillness broken only by leaping pearl spot fish and fireflies.',
      readTime: '3 min dispatch'
    },
    {
      title: 'Trans-Himalayan Starlight in Spiti Valley',
      author: 'Rohit Nambiar',
      role: 'Astronomical Journalist',
      location: 'Key Gompa, Himachal Pradesh',
      snippet: 'At 12,000 feet, devoid of all synthetic light pollution, the Milky Way arches across the 1,000-year-old cliffside monastery in blinding high-altitude clarity.',
      readTime: '5 min dispatch'
    }
  ];

  return (
    <section className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="section-header centered" data-home-reveal>
        <span className="eyebrow">Cultural Dispatches & Memoirs</span>
        <h2 className="section-title">
          Travel <span className="animate-gradient-shift">Stories & Inspiration</span>
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '640px', margin: '0 auto' }}>
          Reflections from writers, photographers, and architects who journey through the subcontinent with intentional depth.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'var(--space-xl)'
        }}
      >
        {stories.map((story, idx) => (
          <article
            key={idx}
            className="prompt-card-hover animate-parallax-fade-up"
            data-home-reveal
            data-home-reveal-delay={idx + 1}
            style={{
              padding: 'var(--space-2xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'var(--surface-elevated)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              animationDelay: `${idx * 0.12}s`
            }}
          >
            <div>
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
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    backgroundColor: 'rgba(224, 162, 77, 0.08)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '9999px',
                    border: '1px solid rgba(224, 162, 77, 0.2)'
                  }}
                >
                  {story.location}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {story.readTime}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: '400',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-sm)',
                  lineHeight: 1.2
                }}
              >
                {story.title}
              </h3>

              <p
                style={{
                  fontSize: '0.86rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--lh-relaxed)',
                  marginBottom: 'var(--space-lg)',
                  fontStyle: 'italic'
                }}
              >
                “{story.snippet}”
              </p>
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: 'var(--space-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {story.author}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  {story.role}
                </div>
              </div>

              <Icon name="sparkles" size={14} style={{ color: 'var(--gold)' }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
