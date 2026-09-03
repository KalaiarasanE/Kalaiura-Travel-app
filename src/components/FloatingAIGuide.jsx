/* ==============================================================================
   KALAIURA — FLOATING AI GUIDE ENTRY BUTTON & SLIDE-OVER DRAWER
   Accessible across all routes with quick prompt chips and direct AI consultation
   ============================================================================== */

import React, { useState } from 'react';
import { Icon } from './Icons';
import { AIGuide } from './AIGuide';

export function FloatingAIGuide() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Pill Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="floating-ai-guide-btn"
        aria-label="Open KALAIURA AI Travel Guide"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 90,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0.65rem 1.15rem',
          borderRadius: '9999px',
          backgroundColor: '#0d0f14',
          border: '1px solid rgba(224, 162, 77, 0.45)',
          color: 'var(--gold)',
          fontFamily: 'var(--font-accent)',
          fontSize: '0.8rem',
          fontWeight: '600',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(224, 162, 77, 0.25)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
          e.currentTarget.style.borderColor = 'var(--gold)';
          e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(224, 162, 77, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.borderColor = 'rgba(224, 162, 77, 0.45)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(224, 162, 77, 0.25)';
        }}
      >
        <span style={{ fontSize: '1rem', color: 'var(--gold)' }}>✦</span>
        <span>AI GUIDE</span>
      </button>

      {/* Slide-Over Drawer Modal */}
      {isOpen && (
        <div
          className="modal-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 6, 8, 0.75)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 100,
            display: 'flex',
            justifyContent: 'flex-end',
            animation: 'fade-in 0.25s ease'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="floating-ai-drawer"
            style={{
              width: '100%',
              maxWidth: 'var(--drawer-max-width, 580px)',
              height: '100%',
              backgroundColor: '#0a0c11',
              borderLeft: '1px solid rgba(224, 162, 77, 0.3)',
              boxShadow: '-15px 0 50px rgba(0, 0, 0, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'drawer-slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: 'var(--space-lg) var(--space-xl)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(13, 16, 22, 0.95)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>✦</span>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: '400',
                      color: 'var(--text-primary)',
                      margin: 0,
                      lineHeight: 1
                    }}
                  >
                    KALAIURA AI Guide
                  </h3>
                  <span style={{ fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    India Concierge & Telemetry
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="btn-icon"
                title="Close AI Assistant"
                aria-label="Close AI Assistant"
                style={{ width: '32px', height: '32px' }}
              >
                <Icon name="close" size={15} />
              </button>
            </div>

            {/* Quick Prompt Strip */}
            <div
              style={{
                padding: 'var(--space-md) var(--space-xl)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                display: 'flex',
                gap: '6px'
              }}
            >
              {[
                'Plan a 5-day Kerala trip',
                'Best places near Bengaluru',
                'Where should I go in December?',
                'Find a peaceful mountain destination',
                'Plan a budget trip to Rajasthan'
              ].map((prompt, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(224, 162, 77, 0.08)',
                    border: '1px solid rgba(224, 162, 77, 0.2)',
                    color: 'var(--gold)',
                    fontSize: '0.7rem',
                    cursor: 'default'
                  }}
                >
                  {prompt}
                </span>
              ))}
            </div>

            {/* AIGuide Component Container */}
            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-lg)' }}>
              <AIGuide initialDestinationId="kerala" />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes drawer-slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
