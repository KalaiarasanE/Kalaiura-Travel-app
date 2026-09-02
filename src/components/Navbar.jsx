/* ==============================================================================
   AERORA — EDITORIAL NAVBAR (REFERENCE REDESIGN)
   Transparent/near-black header, uppercase navigation, gold active indicators
   ============================================================================== */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from './Icons';
import { useLocation as useAppLocation } from '../hooks/useLocation';
import { useJourneyContext } from '../context/JourneyContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentLocation, weather, openLocationSelector } = useAppLocation();
  const { totalPlaces, toggleDrawer } = useJourneyContext();

  // Handle scroll backdrop effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'DISCOVER', path: '/' },
    { label: 'DESTINATIONS', path: '/destinations' },
    { label: 'PLACES', path: '/places' },
    { label: 'TRIP PLANNER', path: '/planner' },
    { label: 'AI GUIDE', path: '/guide' }
  ];

  return (
    <>
      <header
        className={`aerora-header ${isScrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 'var(--z-header)',
          transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
          background: isScrolled ? 'rgba(8, 9, 12, 0.92)' : 'linear-gradient(180deg, rgba(8, 9, 12, 0.75) 0%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent'
        }}
      >
        <div
          className="container"
          style={{
            height: 'var(--nav-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-md)'
          }}
        >
          {/* AERORA Brand Wordmark (Clean & Transparent) */}
          <Link
            to="/"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textDecoration: 'none',
              background: 'transparent',
              padding: 0
            }}
            aria-label="KALAIURA Home"
          >
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '1.45rem',
                fontWeight: '600',
                letterSpacing: '0.24em',
                color: 'var(--text-primary)',
                lineHeight: 1
              }}
            >
              KALAIURA
            </span>
            <span
              style={{
                fontSize: '0.62rem',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginTop: '4px',
                fontWeight: '500'
              }}
            >
              Travel Beyond the Map
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="nav-desktop-links"
            aria-label="Primary Navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-xl)'
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                    fontWeight: isActive ? '600' : '400',
                    transition: 'color var(--transition-fast)',
                    position: 'relative',
                    padding: '0.35rem 0'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--gold)',
                        borderRadius: '1px',
                        boxShadow: '0 0 10px rgba(224, 162, 77, 0.6)'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Telemetry & Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)'
            }}
          >
            {/* Location & Weather Chip */}
            <button
              onClick={openLocationSelector}
              className="btn-ghost"
              title="Change your departure coordinates"
              aria-label={`Current location: ${currentLocation.name}. Click to change.`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 0.95rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.05em',
                color: 'var(--text-secondary)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                transition: 'border-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <Icon name="map-pin" size={13} style={{ color: 'var(--gold)' }} />
              <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                {currentLocation.name}
              </span>
              {weather && (
                <>
                  <span style={{ opacity: 0.35 }}>·</span>
                  <span style={{ color: 'var(--gold)' }}>
                    {weather.temp}°C
                  </span>
                </>
              )}
            </button>

            {/* Journey Panel Button */}
            <button
              onClick={toggleDrawer}
              className="btn-ghost"
              aria-label={`Open Personal Journey with ${totalPlaces} places`}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.45rem 1rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--ls-wide)',
                textTransform: 'uppercase',
                color: totalPlaces > 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                backgroundColor: totalPlaces > 0 ? 'rgba(224, 162, 77, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                borderColor: totalPlaces > 0 ? 'rgba(224, 162, 77, 0.4)' : 'var(--border)',
                transition: 'all var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = totalPlaces > 0 ? 'rgba(224, 162, 77, 0.4)' : 'var(--border)')}
            >
              <Icon name="bookmark" size={14} style={{ color: totalPlaces > 0 ? 'var(--gold)' : 'inherit' }} />
              <span style={{ fontWeight: '500' }}>Journey</span>
              {totalPlaces > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--gold)',
                    color: '#08090C',
                    fontSize: '0.68rem',
                    fontWeight: '700',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '2px',
                    boxShadow: '0 0 10px rgba(224, 162, 77, 0.5)'
                  }}
                >
                  {totalPlaces}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-icon nav-mobile-toggle"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={isMobileMenuOpen}
              style={{
                display: 'none',
                color: 'var(--text-primary)'
              }}
            >
              <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay (Clean & Transparent Logo) */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'calc(var(--z-header) + 10)',
            backgroundColor: 'rgba(8, 9, 12, 0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'var(--space-2xl) var(--space-xl)',
            animation: 'modal-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Top Bar with Clean Transparent Logo & Close Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textDecoration: 'none',
                background: 'transparent',
                padding: 0
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '1.45rem',
                  fontWeight: '600',
                  letterSpacing: '0.24em',
                  color: 'var(--text-primary)',
                  lineHeight: 1
                }}
              >
                KALAIURA
              </span>
              <span
                style={{
                  fontSize: '0.62rem',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginTop: '4px'
                }}
              >
                Travel Beyond the Map
              </span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-icon"
              aria-label="Close mobile navigation"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* Nav Links Stack */}
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-lg)',
              margin: 'auto 0'
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: '300',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--gold)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)'
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-md)',
              width: '100%'
            }}
          >
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openLocationSelector();
              }}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', maxWidth: '280px' }}
            >
              <Icon name="map-pin" size={14} style={{ color: 'var(--gold)' }} />
              <span>Location: {currentLocation.name}</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                toggleDrawer();
              }}
              className="btn btn-primary btn-sm"
              style={{ width: '100%', maxWidth: '280px' }}
            >
              <Icon name="bookmark" size={14} />
              <span>Personal Journey ({totalPlaces})</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
