/* ==============================================================================
   AERORA — CONVERSATIONAL CHAT MESSAGE (REFERENCE DESIGN ALIGNED)
   Editorial chat bubble with gold highlight borders and distinctive travel identity
   ============================================================================== */

import React from 'react';

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
          gap: 'var(--space-sm)',
          alignItems: 'flex-start',
          flexDirection: isUser ? 'row-reverse' : 'row',
          maxWidth: '85%'
        }}
      >
        {/* Avatar Monogram */}
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: isUser ? 'rgba(255, 255, 255, 0.06)' : 'rgba(224, 162, 77, 0.12)',
            border: isUser ? '1px solid var(--border)' : '1px solid rgba(224, 162, 77, 0.4)',
            color: isUser ? 'var(--text-secondary)' : 'var(--gold)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.68rem',
            fontFamily: 'var(--font-accent)',
            fontWeight: '600',
            flexShrink: 0,
            marginTop: '2px',
            boxShadow: !isUser ? '0 0 10px rgba(224, 162, 77, 0.15)' : 'none'
          }}
        >
          {isUser ? 'YOU' : 'AE'}
        </div>

        {/* Message Bubble */}
        <div
          style={{
            padding: '1rem 1.35rem',
            borderRadius: 'var(--radius-xs)',
            backgroundColor: isUser ? 'rgba(224, 162, 77, 0.1)' : 'var(--surface-elevated)',
            border: isUser ? '1px solid rgba(224, 162, 77, 0.35)' : '1px solid var(--border)',
            borderLeft: !isUser ? '2px solid var(--gold)' : '1px solid rgba(224, 162, 77, 0.35)',
            color: 'var(--text-primary)',
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
                color: isUser ? 'var(--text-primary)' : 'var(--text-secondary)'
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
          color: 'var(--text-muted)',
          marginTop: '4px',
          paddingRight: isUser ? '40px' : '0',
          paddingLeft: !isUser ? '40px' : '0'
        }}
      >
        {message.timestamp}
      </span>
    </div>
  );
}
