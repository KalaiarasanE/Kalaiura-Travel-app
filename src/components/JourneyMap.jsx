/* ==============================================================================
   AERORA — INTERACTIVE JOURNEY MAP / ROUTE VISUALIZATION
   Stylized SVG expedition path with interactive waypoints and flight telemetry
   ============================================================================== */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_WAYPOINTS } from '../data/curatedRoutes';
import { Icon } from './Icons';
import { EditorialImage } from './EditorialImage';

export function JourneyMap() {
  const [activeWaypointId, setActiveWaypointId] = useState('kyoto');
  const navigate = useNavigate();

  const activeWaypoint = ROUTE_WAYPOINTS.find((w) => w.id === activeWaypointId) || ROUTE_WAYPOINTS[0];

  // SVG dimensions for scalable responsive mapping
  const width = 1000;
  const height = 480;

  // Compute waypoint coordinates in SVG space
  const points = ROUTE_WAYPOINTS.map((w) => ({
    ...w,
    x: (w.xPercent / 100) * width,
    y: (w.yPercent / 100) * height
  }));

  // Build curved SVG path connecting the points smoothly
  const pathD = points.reduce((acc, pt, idx, arr) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    const cx1 = prev.x + (pt.x - prev.x) * 0.5;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) * 0.5;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, '');

  return (
    <section className="container" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="section-header centered">
        <span className="eyebrow">Cartographic Trajectory</span>
        <h2 className="section-title">The Grand Transcontinental Arc</h2>
        <p className="section-subtitle">
          An atmospheric route visualizing movement across cultural hemispheres. Tap any waypoint to inspect regional telemetry and embark.
        </p>
      </div>

      {/* Visual Map Canvas Card */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-elevated)',
          position: 'relative'
        }}
      >
        {/* Stylized SVG Map Canvas */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '460px',
            backgroundColor: '#0a0c11',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Latitude / Longitude Editorial Grid Lines */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(to right, rgba(245, 242, 235, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(245, 242, 235, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              pointerEvents: 'none'
            }}
          />

          <svg
            viewBox={`0 0 ${width} ${height}`}
            style={{ width: '100%', height: '100%', display: 'block' }}
            aria-label="Interactive Journey Route Map"
          >
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d99b4f" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#d99b4f" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ecc07e" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* Glowing route backdrop path */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(217, 155, 79, 0.2)"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Animated Dashed Flow Route Path */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animated-route-dash"
            />

            {/* Waypoint Pins & Rings */}
            {points.map((pt) => {
              const isActive = pt.id === activeWaypointId;
              return (
                <g
                  key={pt.id}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  onClick={() => setActiveWaypointId(pt.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer pulse when active */}
                  {isActive && (
                    <circle
                      r="22"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="1.5"
                      opacity="0.4"
                      className="waypoint-pulse-ring"
                    />
                  )}

                  {/* Base Circle */}
                  <circle
                    r={isActive ? '9' : '6'}
                    fill={isActive ? 'var(--color-accent)' : '#191d27'}
                    stroke={isActive ? '#f5f2eb' : 'var(--color-accent)'}
                    strokeWidth="2"
                    style={{ transition: 'all 0.3s ease' }}
                  />

                  {/* Waypoint Code Label */}
                  <text
                    y="-16"
                    textAnchor="middle"
                    fill={isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'}
                    fontSize={isActive ? '13' : '11'}
                    fontFamily="var(--font-accent)"
                    fontWeight={isActive ? '600' : '400'}
                    letterSpacing="0.1em"
                  >
                    {pt.code}
                  </text>
                  <text
                    y="24"
                    textAnchor="middle"
                    fill={isActive ? 'var(--color-accent)' : 'var(--color-text-tertiary)'}
                    fontSize="10"
                    fontFamily="var(--font-body)"
                  >
                    {pt.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Waypoint Telemetry Drawer Strip */}
        <div
          style={{
            padding: 'var(--space-xl)',
            backgroundColor: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 340px) 1fr auto',
            gap: 'var(--space-xl)',
            alignItems: 'center'
          }}
        >
          {/* Waypoint Preview Thumbnail & Identity */}
          <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                flexShrink: 0
              }}
            >
              <EditorialImage
                src={activeWaypoint.previewImage}
                alt={activeWaypoint.name}
                aspectRatio="1/1"
              />
            </div>
            <div>
              <span className="eyebrow" style={{ marginBottom: '2px' }}>
                Waypoint: {activeWaypoint.category}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.65rem',
                  fontWeight: '400',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.1
                }}
              >
                {activeWaypoint.name}, {activeWaypoint.country}
              </h3>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent-light)', marginTop: '2px' }}>
                {activeWaypoint.coordinatesText} · Elev: {activeWaypoint.elevation}
              </div>
            </div>
          </div>

          {/* Route Narrative & Leg Metrics */}
          <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: 'var(--space-lg)' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: '#cfd2db', marginBottom: 'var(--space-xs)' }}>
              {activeWaypoint.routeNote}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-lg)', fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
              <span>Leg Distance: <strong style={{ color: 'var(--color-text-primary)' }}>{activeWaypoint.distanceFromPrev}</strong></span>
              <span>En-route Transit: <strong style={{ color: 'var(--color-text-primary)' }}>{activeWaypoint.flightTimeFromPrev}</strong></span>
              <span>Climate: <strong style={{ color: 'var(--color-accent)' }}>{activeWaypoint.tempDefault}</strong></span>
            </div>
          </div>

          {/* Action to Jump to Destination Detail */}
          <div>
            {activeWaypoint.destinationId ? (
              <button
                onClick={() => navigate(`/destination/${activeWaypoint.destinationId}`)}
                className="btn btn-primary"
              >
                <span>Explore {activeWaypoint.name}</span>
                <Icon name="arrow-right" size={14} />
              </button>
            ) : (
              <button
                onClick={() => navigate('/destinations')}
                className="btn btn-secondary"
              >
                <span>View Route</span>
                <Icon name="arrow-right" size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .animated-route-dash {
          animation: route-dash 24s linear infinite;
        }
        @keyframes route-dash {
          to { stroke-dashoffset: -300; }
        }
        .waypoint-pulse-ring {
          animation: waypoint-pulse 2s ease-out infinite;
        }
        @keyframes waypoint-pulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
