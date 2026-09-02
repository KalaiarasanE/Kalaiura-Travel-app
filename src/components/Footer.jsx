/* ==============================================================================
   AERORA — MINIMAL LUXURY FOOTER
   Editorial closing statement, semantic navigation, and accessibility notes
   ============================================================================== */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';

export function Footer() {
  const [modalType, setModalType] = useState(null); // 'privacy' | 'accessibility' | null

  return (
    <>
      <footer
        className="aerora-footer"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderTop: '1px solid var(--color-border)',
          padding: 'var(--space-4xl) 0 var(--space-2xl) 0',
          marginTop: 'auto'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-3xl)',
              marginBottom: 'var(--space-3xl)'
            }}
          >
            {/* Brand Statement Column */}
            <div style={{ maxWidth: '420px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '1.6rem',
                  fontWeight: '600',
                  letterSpacing: '0.22em',
                  color: 'var(--color-text-primary)',
                  display: 'block',
                  marginBottom: 'var(--space-sm)'
                }}
              >
                AERORA
              </span>

              <blockquote
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  fontStyle: 'italic',
                  lineHeight: '1.4',
                  color: '#cfd2db',
                  marginBottom: 'var(--space-md)'
                }}
              >
                “Travel is not about collecting places. It is about collecting perspectives.”
              </blockquote>

              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', lineHeight: 'var(--lh-normal)' }}>
                An editorial discovery platform and intelligent voyage synthesizer honoring the silence, craft, and architectural antiquity of the Earth.
              </p>
            </div>

            {/* Navigation Links Column */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  display: 'block',
                  marginBottom: 'var(--space-md)'
                }}
              >
                Navigation
              </span>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <li>
                  <Link to="/" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    Discover
                  </Link>
                </li>
                <li>
                  <Link to="/destinations" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link to="/places" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    Famous Places
                  </Link>
                </li>
                <li>
                  <Link to="/planner" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    Trip Planner
                  </Link>
                </li>
                <li>
                  <Link to="/guide" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    AI Guide
                  </Link>
                </li>
              </ul>
            </div>

            {/* Principles & Standards Column */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  display: 'block',
                  marginBottom: 'var(--space-md)'
                }}
              >
                Principles
              </span>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                <li>
                  <button
                    onClick={() => setModalType('privacy')}
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', cursor: 'pointer', textAlign: 'left' }}
                  >
                    Privacy Commitment
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModalType('accessibility')}
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', cursor: 'pointer', textAlign: 'left' }}
                  >
                    Accessibility Standards
                  </button>
                </li>
                <li>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    Low-Impact Tourism
                  </span>
                </li>
                <li>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
                    Cultural Integrity
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              paddingTop: 'var(--space-xl)',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-md)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-tertiary)'
            }}
          >
            <div>
              © {new Date().getFullYear()} AERORA. Designed with architectural restraint and editorial rigor.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span>HTML5 · CSS3 · ES6+ · React</span>
              <span>•</span>
              <span style={{ color: 'var(--color-accent)' }}>Beyond the Map</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy & Accessibility Modal Dialogs */}
      {modalType && (
        <div
          className="modal-backdrop"
          onClick={() => setModalType(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModalType(null)}
              className="btn-icon"
              style={{ position: 'absolute', top: 'var(--space-md)', right: 'var(--space-md)' }}
              aria-label="Close dialog"
            >
              <Icon name="close" size={16} />
            </button>

            {modalType === 'privacy' ? (
              <div>
                <span className="eyebrow">Data Ethics</span>
                <h3 style={{ fontSize: '1.65rem', marginBottom: 'var(--space-xs)' }}>Privacy Commitment</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-relaxed)', marginBottom: 'var(--space-md)' }}>
                  AERORA operates on principles of minimal telemetry. Your geolocation is queried purely client-side via modern Geolocation APIs to calculate regional climate telemetry and is never persisted to any remote database. Personal journeys and custom itineraries are stored strictly within your browser’s localStorage.
                </p>
                <button onClick={() => setModalType(null)} className="btn btn-secondary btn-sm">
                  <span>Understood</span>
                </button>
              </div>
            ) : (
              <div>
                <span className="eyebrow">WCAG 2.1 AA Standards</span>
                <h3 style={{ fontSize: '1.65rem', marginBottom: 'var(--space-xs)' }}>Accessibility</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--lh-relaxed)', marginBottom: 'var(--space-md)' }}>
                  AERORA is engineered with semantic HTML5 elements (header, nav, main, section, article, footer), high-contrast typography, visible keyboard focus indicators, meaningful alt attributes on all photography, screen-reader status regions, and pause capabilities for atmospheric video backgrounds.
                </p>
                <button onClick={() => setModalType(null)} className="btn btn-secondary btn-sm">
                  <span>Close</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
