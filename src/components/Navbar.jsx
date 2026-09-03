/* ==============================================================================
   KALAIURA — EDITORIAL NAVBAR WITH HIGH-PERFORMANCE SCROLL-SPY
   5 Canonical Sections: DISCOVER, DESTINATIONS, PLACES, TRIP PLANNER, AI GUIDE
   Fluid smooth navigation, active section indicator & zero-lag IntersectionObserver
   ============================================================================== */

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './Icons';
import { useLocation as useAppLocation } from '../hooks/useLocation';
import { useJourneyContext } from '../context/JourneyContext';

const NAV_LINKS = [
  { label: 'DISCOVER', path: '/', sectionId: 'discover' },
  { label: 'DESTINATIONS', path: '/destinations', sectionId: 'destinations' },
  { label: 'PLACES', path: '/places', sectionId: 'places' },
  { label: 'TRIP PLANNER', path: '/planner', sectionId: 'planner' },
  { label: 'AI GUIDE', path: '/guide', sectionId: 'ai-guide' }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('discover');
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLocation, weather, openLocationSelector } = useAppLocation();
  const { totalPlaces, toggleDrawer } = useJourneyContext();

  const isHomePage = location.pathname === '/';

  // 1. Zero-lag header background detection via IntersectionObserver on #top-sentinel
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel');
    if (sentinel && window.IntersectionObserver) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsScrolled(!entry.isIntersecting);
        },
        { threshold: 0 }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    } else {
      // Fallback throttled listener
      let ticking = false;
      const onScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setIsScrolled(window.scrollY > 30);
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [location.pathname]);

  // 2. High-performance scroll-spy for the 5 landing-page sections (IntersectionObserver)
  useEffect(() => {
    if (!isHomePage || typeof window === 'undefined') return;

    const sectionIds = ['discover', 'destinations', 'places', 'planner', 'ai-guide'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sectionElements.length === 0 || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section with highest intersection or top proximity
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio or boundingClientRect top
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topVisible = visibleEntries[0];
          if (topVisible && topVisible.target.id) {
            setActiveSection(topVisible.target.id);
          }
        }
      },
      {
        root: null,
        // Active zone across the upper-center viewport
        rootMargin: '-15% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5]
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isHomePage]);

  // 3. Smooth, responsive navigation click handler
  const handleNavClick = (e, link) => {
    if (isHomePage) {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      if (link.sectionId === 'discover') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('discover');
        return;
      }

      const el = document.getElementById(link.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(link.sectionId);
      } else {
        navigate(link.path);
      }
    } else {
      setIsMobileMenuOpen(false);
      // If navigating from another page to a section on home
      if (link.path === '/') {
        navigate('/');
      } else {
        navigate(link.path);
      }
    }
  };

  // Determine active state for each nav item
  const isLinkActive = (link) => {
    if (isHomePage) {
      return activeSection === link.sectionId;
    }
    return location.pathname === link.path;
  };

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
          transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
          background: isScrolled ? 'rgba(8, 9, 12, 0.94)' : 'linear-gradient(180deg, rgba(8, 9, 12, 0.8) 0%, transparent 100%)',
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
          {/* KALAIURA Brand Wordmark (Clean & Transparent) */}
          <Link
            to="/"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('discover');
              }
            }}
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

          {/* Desktop Navigation Links with Active Scroll Indicator */}
          <nav
            className="nav-desktop-links"
            aria-label="Primary Navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-xl)'
            }}
          >
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link);
              return (
                <a
                  key={link.label}
                  href={isHomePage ? `#${link.sectionId}` : link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--gold)' : 'var(--text-secondary)',
                    fontWeight: active ? '600' : '400',
                    transition: 'color var(--transition-fast)',
                    position: 'relative',
                    padding: '0.35rem 0',
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: 'var(--gold)',
                        borderRadius: '1px',
                        boxShadow: '0 0 10px rgba(224, 162, 77, 0.7)'
                      }}
                    />
                  )}
                </a>
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
              className="btn-ghost nav-location-desktop"
              title="Change your departure coordinates"
              aria-label={`Current location: ${currentLocation.name}. Click to change.`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.85rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                letterSpacing: 'var(--ls-wide)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icon name="map-pin" size={13} style={{ color: 'var(--gold)' }} />
              <span>{currentLocation.name}</span>
              {weather && (
                <>
                  <span style={{ color: 'var(--border)' }}>·</span>
                  <span style={{ color: 'var(--gold)', fontWeight: '500' }}>
                    {weather.temp}°C
                  </span>
                </>
              )}
            </button>

            {/* Saved Dossier / Journey Counter */}
            <button
              onClick={toggleDrawer}
              className="btn-ghost"
              aria-label={`Open Saved Journey Dossier. ${totalPlaces} items selected.`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.85rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-full)',
                backgroundColor: totalPlaces > 0 ? 'rgba(224, 162, 77, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                borderColor: totalPlaces > 0 ? 'var(--gold)' : 'var(--border)',
                fontSize: 'var(--text-xs)',
                color: totalPlaces > 0 ? 'var(--gold)' : 'var(--text-secondary)',
                letterSpacing: 'var(--ls-wide)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <Icon name="bookmark" size={13} style={{ color: totalPlaces > 0 ? 'var(--gold)' : 'inherit' }} />
              <span style={{ textTransform: 'uppercase', fontWeight: totalPlaces > 0 ? '600' : '400' }}>
                Journey
              </span>
              {totalPlaces > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--gold)',
                    color: 'var(--background)',
                    borderRadius: 'var(--radius-full)',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.65rem',
                    fontWeight: '700'
                  }}
                >
                  {totalPlaces}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
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

      {/* Full-Screen Mobile Navigation Overlay */}
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
            animation: 'modal-fade-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Top Bar with Logo & Close Button */}
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

          {/* Mobile Location Selector Strip */}
          <div style={{ padding: 'var(--space-md) 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: 'var(--space-lg)' }}>
            <button
              onClick={() => { openLocationSelector(); setIsMobileMenuOpen(false); }}
              className="btn btn-secondary btn-sm mobile-menu-location-chip"
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="map-pin" size={14} style={{ color: 'var(--gold)' }} />
                <span>{currentLocation.name}</span>
                {weather && <span style={{ color: 'var(--gold)' }}>· {weather.temp}°C</span>}
              </div>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Change</span>
            </button>
          </div>

          {/* Mobile Nav Links Stack */}
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-lg)',
              margin: 'auto 0'
            }}
          >
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link);
              return (
                <a
                  key={link.label}
                  href={isHomePage ? `#${link.sectionId}` : link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: '300',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: active ? 'var(--gold)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'color var(--transition-fast)'
                  }}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span
                      style={{
                        width: '24px',
                        height: '2px',
                        backgroundColor: 'var(--gold)',
                        borderRadius: '1px',
                        boxShadow: '0 0 10px rgba(224, 162, 77, 0.8)'
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile Drawer Footer with Telemetry */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-md)',
              borderTop: '1px solid var(--border)',
              paddingTop: 'var(--space-lg)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)'
              }}
            >
              <span>DEPARTURE TELEMETRY</span>
              <span style={{ color: 'var(--gold)', fontFamily: 'var(--font-accent)' }}>
                {currentLocation.lat.toFixed(2)}°N, {currentLocation.lng.toFixed(2)}°E
              </span>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                toggleDrawer();
              }}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Icon name="bookmark" size={14} />
              <span>Open Saved Dossier ({totalPlaces})</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
