/* ==============================================================================
   AERORA — CONVERSATIONAL CHAT MESSAGE
   Editorial chat bubbles with typography hierarchy and timestamping
   ============================================================================== */

import React from 'react';
import { Icon } from './Icons';

export function ChatMessage({ message }) {
  const isUser = message.sender === 'user';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 'var(--space-md)',
        maxWidth: '100%'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-xs)',
          alignItems: 'flex-start',
          flexDirection: isUser ? 'row-reverse' : 'row',
          maxWidth: '85%'
        }}
      >
        {/* Avatar Monogram */}
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: isUser ? 'rgba(255, 255, 255, 0.08)' : 'var(--color-accent-dim)',
            border: isUser ? '1px solid var(--color-border)' : '1px solid var(--color-accent-border)',
            color: isUser ? 'var(--color-text-secondary)' : 'var(--color-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.68rem',
            fontFamily: 'var(--font-accent)',
            fontWeight: '600',
            flexShrink: 0,
            marginTop: '2px'
          }}
        >
          {isUser ? 'YOU' : 'AE'}
        </div>

        {/* Message Bubble */}
        <div
          style={{
            padding: '0.9rem 1.25rem',
            borderRadius: 'var(--radius-xs)',
            backgroundColor: isUser ? 'rgba(217, 155, 79, 0.12)' : 'var(--color-surface)',
            border: isUser ? '1px solid rgba(217, 155, 79, 0.25)' : '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--lh-relaxed)',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          {message.text.split('\n\n').map((para, idx) => (
            <p
              key={idx}
              style={{
                marginBottom: idx < message.text.split('\n\n').length - 1 ? 'var(--space-xs)' : 0,
                color: isUser ? 'var(--color-text-primary)' : '#d7dbe3'
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Timestamp */}
      <span
        style={{
          fontSize: '0.65rem',
          color: 'var(--color-text-muted)',
          marginTop: '4px',
          paddingRight: isUser ? '36px' : '0',
          paddingLeft: !isUser ? '36px' : '0'
        }}
      >
        {message.timestamp}
      </span>
    </div>
  );
}
