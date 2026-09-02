/* ==============================================================================
   AERORA — EDITORIAL NAVBAR
   Sticky header with telemetry chips, journey counter, and full-screen mobile menu
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
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Discover', path: '/' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Places', path: '/places' },
    { label: 'Trip Planner', path: '/planner' },
    { label: 'AI Guide', path: '/guide' }
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
          background: isScrolled ? 'rgba(9, 10, 14, 0.88)' : 'linear-gradient(180deg, rgba(9, 10, 14, 0.7) 0%, transparent 100%)',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent'
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
          {/* AERORA Brand Wordmark */}
          <Link
            to="/"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textDecoration: 'none'
            }}
            aria-label="AERORA Home"
          >
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '1.45rem',
                fontWeight: '600',
                letterSpacing: '0.24em',
                color: 'var(--color-text-primary)',
                lineHeight: 1
              }}
            >
              AERORA
            </span>
            <span
              style={{
                fontSize: '0.62rem',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
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
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: 'var(--ls-wide)',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    fontWeight: isActive ? '600' : '400',
                    transition: 'color var(--transition-fast)',
                    position: 'relative',
                    padding: '0.25rem 0'
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
                        backgroundColor: 'var(--color-accent)',
                        borderRadius: '1px'
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
              title="Change your origin location"
              aria-label={`Current location: ${currentLocation.name}. Click to change.`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.45rem 0.85rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.04em',
                color: 'var(--color-text-secondary)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)'
              }}
            >
              <Icon name="map-pin" size={13} style={{ color: 'var(--color-accent)' }} />
              <span style={{ color: 'var(--color-text-primary)', fontWeight: '500' }}>
                {currentLocation.name}
              </span>
              {weather && (
                <>
                  <span style={{ opacity: 0.35 }}>·</span>
                  <span style={{ color: 'var(--color-accent-light)' }}>
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
                gap: '0.45rem',
                padding: '0.45rem 0.95rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--text-xs)',
                letterSpacing: 'var(--ls-wide)',
                textTransform: 'uppercase',
                color: totalPlaces > 0 ? 'var(--color-accent-light)' : 'var(--color-text-secondary)',
                backgroundColor: totalPlaces > 0 ? 'var(--color-accent-dim)' : 'rgba(255, 255, 255, 0.03)'
              }}
            >
              <Icon name="bookmark" size={14} style={{ color: totalPlaces > 0 ? 'var(--color-accent)' : 'inherit' }} />
              <span style={{ fontWeight: '500' }}>Journey</span>
              {totalPlaces > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: '#090a0e',
                    fontSize: '0.68rem',
                    fontWeight: '700',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '2px',
                    animation: 'journey-bounce 0.4s ease'
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
                color: 'var(--color-text-primary)'
              }}
            >
              <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'calc(var(--z-header) - 1)',
            backgroundColor: 'rgba(9, 10, 14, 0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 'var(--space-2xl)',
            gap: 'var(--space-xl)',
            animation: 'modal-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)'
            }}
          >
            Navigation
          </span>

          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-lg)'
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
                    letterSpacing: '0.04em',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)'
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div
            style={{
              marginTop: 'var(--space-xl)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-md)'
            }}
          >
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openLocationSelector();
              }}
              className="btn btn-secondary btn-sm"
              style={{ width: '220px' }}
            >
              <Icon name="map-pin" size={14} />
              <span>Location: {currentLocation.name}</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                toggleDrawer();
              }}
              className="btn btn-primary btn-sm"
              style={{ width: '220px' }}
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
