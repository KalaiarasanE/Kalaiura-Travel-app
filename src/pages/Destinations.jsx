/* ==============================================================================
   AERORA — DESTINATIONS PAGE
   Full destination catalogue with multi-filter suite and climate indexing
   ============================================================================== */

import React from 'react';
import { DestinationExplorer } from '../components/DestinationExplorer';

export function Destinations() {
  return (
    <main style={{ paddingTop: 'calc(var(--nav-height) + var(--space-2xl))' }}>
      <DestinationExplorer id="all-destinations" />
    </main>
  );
}
