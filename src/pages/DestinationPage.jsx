/* ==============================================================================
   AERORA — DEDICATED DESTINATION PAGE
   Dynamic route page for deep-linked destination experiences (/destination/:id)
   ============================================================================== */

import React from 'react';
import { useParams } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { DestinationDetail } from '../components/DestinationDetail';
import { ErrorState } from '../components/ErrorState';

export function DestinationPage() {
  const { id } = useParams();
  const destination = DESTINATIONS.find((d) => d.id === id);

  if (!destination) {
    return (
      <main className="container" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-4xl))' }}>
        <ErrorState
          title="Sanctuary Not Found"
          message={`We could not locate an editorial entry for "${id}". It may have slipped beyond our mapped coordinates.`}
          actionText="Return to Destinations"
          actionLink="/destinations"
        />
      </main>
    );
  }

  return <DestinationDetail destination={destination} />;
}
