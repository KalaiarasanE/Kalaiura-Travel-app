/* ==============================================================================
   AERORA — SKELETON UI LOADERS
   Custom skeleton states for destination cards, weather, and pages
   ============================================================================== */

import React from 'react';

export function DestinationCardSkeleton({ variant = 'standard' }) {
  const isFeatured = variant === 'card-featured';
  const isTall = variant === 'card-tall';
  const isWide = variant === 'card-wide';

  return (
    <div
      className="skeleton"
      style={{
        borderRadius: 'var(--radius-xs)',
        minHeight: isFeatured ? '540px' : isTall ? '540px' : '420px',
        gridColumn: isFeatured || isWide ? 'span 2' : 'span 1',
        gridRow: isTall ? 'span 2' : 'span 1',
        width: '100%'
      }}
    />
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-lg)'
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <DestinationCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function WeatherSkeleton() {
  return (
    <div
      className="skeleton"
      style={{
        height: '220px',
        width: '100%',
        borderRadius: 'var(--radius-xs)'
      }}
    />
  );
}
