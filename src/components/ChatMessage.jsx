/* ==============================================================================
   KALAIURA — CHAT MESSAGE (PERSONAL TRAVEL ASSISTANT ENHANCED)
   Renders editorial messages, place-specific information panels, and action chips
   ============================================================================== */

import React from 'react';
import { DestinationAssistantCard } from './DestinationAssistantCard';

export function ChatMessage({ message, onQuickAsk }) {
  const isUser = message.sender === 'user';
  const hasCard = !isUser && message.destinationCard;

  // Format message lines for clean markdown bullets and emojis
  const formatParagraph = (text) => {
    return text.split('\n').map((line, lIdx) => {
      const trimmed = line.trim();

      // Formatted list bullet item (e.g. * 📍 Goa or • Baga Beach)
      if (trimmed.startsWith('* ') || trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
        const content = trimmed.substring(2);
        const parts = content.split(':');

        return (
          <div
            key={lIdx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              margin: '3px 0',
              lineHeight: 1.5
            }}
          >
            <span style={{ color: 'var(--gold)', flexShrink: 0 }}>•</span>
            <div>
              {parts.length > 1 ? (
                <>
                  <strong style={{ color: 'var(--gold)', fontWeight: '600' }}>
                    {parts[0]}:
                  </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {parts.slice(1).join(':')}
                  </span>
                </>
              ) : (
                <span style={{ color: 'var(--text-secondary)' }}>{content}</span>
              )}
            </div>
          </div>
        );
      }

      // Standard text line
      return (
        <span key={lIdx} style={{ display: 'block', margin: lIdx > 0 ? '4px 0 0 0' : 0 }}>
          {line}
        </span>
      );
    });
  };

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
          maxWidth: isUser ? '85%' : '94%'
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
          {isUser ? 'YOU' : 'KU'}
        </div>

        {/* Message Bubble */}
        <div
          style={{
            padding: '0.9rem 1.25rem',
            borderRadius: 'var(--radius-xs)',
            backgroundColor: isUser ? 'rgba(224, 162, 77, 0.1)' : 'var(--surface-elevated)',
            border: isUser ? '1px solid rgba(224, 162, 77, 0.35)' : '1px solid var(--border)',
            borderLeft: !isUser ? '2px solid var(--gold)' : '1px solid rgba(224, 162, 77, 0.35)',
            color: 'var(--text-primary)',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--lh-relaxed)',
            boxShadow: 'var(--shadow-subtle)',
            width: '100%'
          }}
        >
          {message.text && message.text.split('\n\n').map((para, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: idx < message.text.split('\n\n').length - 1 ? 'var(--space-xs)' : 0,
                color: isUser ? 'var(--text-primary)' : 'var(--text-secondary)'
              }}
            >
              {formatParagraph(para)}
            </div>
          ))}

          {/* Place-Specific Visual Travel Information Panel/Card */}
          {hasCard && (
            <DestinationAssistantCard
              data={message.destinationCard}
              onQuickAsk={onQuickAsk}
            />
          )}
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
