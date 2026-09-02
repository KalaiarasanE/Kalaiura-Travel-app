/* ==============================================================================
   AERORA — AI TRAVEL GUIDE ("AERORA GUIDE")
   Conversational travel assistant with contextual destination intelligence
   ============================================================================== */

import React, { useState, useRef, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { askAIGuide } from '../services/ai';
import { ChatMessage } from './ChatMessage';
import { Icon } from './Icons';

const SUGGESTED_QUESTIONS = [
  'How many days should I spend here?',
  'What should I see first?',
  'When is the best time to visit?',
  'What should I avoid?',
  'Plan a 5-day trip for me.'
];

export function AIGuide({ initialDestinationId = 'kyoto' }) {
  const [selectedDestId, setSelectedDestId] = useState(initialDestinationId);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const selectedDestination = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  const [messages, setMessages] = useState(() => [
    {
      id: 'init-1',
      sender: 'ai',
      text: `Greetings. I am AERORA Guide, your cultural intelligence curator for ${selectedDestination.name}, ${selectedDestination.country}. Ask me about sacred architectural timings, off-map dining sanctuaries, or optimal seasonal windows. What would you like to uncover?`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll chat to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle destination switch
  const handleDestinationChange = (newDestId) => {
    setSelectedDestId(newDestId);
    const newDest = DESTINATIONS.find((d) => d.id === newDestId) || DESTINATIONS[0];
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: `Now attuned to ${newDest.name}, ${newDest.country} (${newDest.climate} climate). How may I illuminate your expedition here?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const aiReply = await askAIGuide(textToSend, selectedDestId);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setErrorMessage('Your guide is temporarily offline. Calibrating connection.');
      const fallbackMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `Your guide is temporarily offline. While our neural connection recalibrates, consider visiting ${selectedDestination.name}’s iconic quarters early in the morning for serene contemplation.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: `Conversation cleared. Ready for your inquiries regarding ${selectedDestination.name}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorMessage(null);
  };

  return (
    <div
      className="ai-guide-container"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        flexDirection: 'column',
        height: '640px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-elevated)'
      }}
    >
      {/* Editorial Header */}
      <div
        style={{
          padding: 'var(--space-md) var(--space-lg)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'rgba(9, 10, 14, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Icon name="sparkles" size={16} style={{ color: 'var(--color-accent)' }} />
            <h3
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '1.25rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}
            >
              AERORA Guide
            </h3>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
            Ask the place anything.
          </p>
        </div>

        {/* Destination Context Selector & Clear Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
          <select
            className="input-field"
            value={selectedDestId}
            onChange={(e) => handleDestinationChange(e.target.value)}
            aria-label="Select destination context for AI Guide"
            style={{
              padding: '0.45rem 1.8rem 0.45rem 0.85rem',
              fontSize: 'var(--text-xs)',
              width: 'auto',
              minWidth: '150px'
            }}
          >
            {DESTINATIONS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.country})
              </option>
            ))}
          </select>

          <button
            onClick={clearConversation}
            className="btn-icon"
            title="Clear conversation"
            aria-label="Clear conversation history"
            style={{ width: '34px', height: '34px' }}
          >
            <Icon name="trash" size={14} />
          </button>
        </div>
      </div>

      {/* Suggested Questions Fast Strip */}
      <div
        style={{
          padding: '0.65rem var(--space-lg)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-xs)',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Suggested:
        </span>
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--text-xs)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--space-lg)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-md)' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent-dim)',
                border: '1px solid var(--color-accent-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-accent)',
                color: 'var(--color-accent)'
              }}
            >
              AE
            </div>
            <div className="typing-indicator">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}

        {errorMessage && (
          <div
            style={{
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'rgba(229, 62, 62, 0.1)',
              border: '1px solid rgba(229, 62, 62, 0.3)',
              color: '#fc8181',
              fontSize: 'var(--text-xs)',
              marginBottom: 'var(--space-md)'
            }}
          >
            {errorMessage}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        style={{
          padding: 'var(--space-md) var(--space-lg)',
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'rgba(9, 10, 14, 0.7)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-xs)'
        }}
      >
        <input
          type="text"
          className="input-field"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Inquire about ${selectedDestination.name}...`}
          aria-label={`Ask AERORA Guide about ${selectedDestination.name}`}
          disabled={isLoading}
          style={{ flex: 1, padding: '0.75rem 1.15rem' }}
        />

        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="btn btn-primary btn-sm"
          aria-label="Submit message"
          style={{ padding: '0.75rem 1.25rem' }}
        >
          <span>Send</span>
          <Icon name="send" size={14} />
        </button>
      </form>
    </div>
  );
}
