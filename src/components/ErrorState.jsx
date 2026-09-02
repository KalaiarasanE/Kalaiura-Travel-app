/* ==============================================================================
   AERORA — RESILIENT ERROR & EMPTY STATES
   Graceful editorial recovery screens
   ============================================================================== */

import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';

export function ErrorState({
  title = 'Something unexpected occurred',
  message = 'Our servers are taking a moment to catch up.',
  actionText = 'Return to Discover',
  actionLink = '/',
  onActionClick
}) {
  return (
    <div className="error-state" role="alert">
      <div className="error-state-icon">
        <Icon name="compass" size={44} />
      </div>
      <h3 className="error-state-title">{title}</h3>
      <p className="error-state-desc">{message}</p>

      {onActionClick ? (
        <button onClick={onActionClick} className="btn btn-primary btn-sm">
          <span>{actionText}</span>
          <Icon name="arrow-right" size={14} />
        </button>
      ) : (
        <Link to={actionLink} className="btn btn-primary btn-sm">
          <span>{actionText}</span>
          <Icon name="arrow-right" size={14} />
        </Link>
      )}
    </div>
  );
}
