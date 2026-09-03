/* ==============================================================================
   AERORA — AI TRAVEL GUIDE ("AERORA GUIDE")
   Conversational travel assistant with contextual destination intelligence & landmark cards
   ============================================================================== */

import React, { useState, useRef, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { PLACES } from '../data/places';
import { askAIGuide } from '../services/ai';
import { ChatMessage } from './ChatMessage';
import { Icon } from './Icons';
import { useJourneyContext } from '../context/JourneyContext';

const SUGGESTED_QUESTIONS = [
  'How many days should I spend here?',
  'What should I see first?',
  'When is the best time to visit?',
  'What should I avoid?',
  'Plan a 5-day trip for me.'
];

let globalMsgCounter = 0;
function nextMsgId(prefix = 'msg') {
  globalMsgCounter += 1;
  return `${prefix}-${globalMsgCounter}`;
}

export function AIGuide({ initialDestinationId = 'kyoto' }) {
  const [selectedDestId, setSelectedDestId] = useState(initialDestinationId);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { addPlace, hasPlace } = useJourneyContext();

  const selectedDestination = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];
  const destinationLandmarks = PLACES.filter((p) => p.destinationId === selectedDestination.id);

  const [messages, setMessages] = useState(() => [
    {
      id: 'init-1',
      sender: 'ai',
      text: `Greetings. I am KALAIURA Guide, your cultural intelligence curator for ${selectedDestination.name}, ${selectedDestination.country}. Ask me about sacred architectural timings, off-map dining sanctuaries, or optimal seasonal windows. What would you like to uncover?`,
      timestamp: 'Just now'
    }
  ]);

  const chatStreamRef = useRef(null);

  // Auto-scroll the internal chat messages stream container ONLY (never affects page window scroll)
  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTop = chatStreamRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Handle destination switch
  const handleDestinationChange = (newDestId) => {
    setSelectedDestId(newDestId);
    const newDest = DESTINATIONS.find((d) => d.id === newDestId) || DESTINATIONS[0];
    const newId = nextMsgId('dest');
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      {
        id: newId,
        sender: 'ai',
        text: `Now attuned to ${newDest.name}, ${newDest.country} (${newDest.climate} climate). How may I illuminate your expedition here?`,
        timestamp: timeStr
      }
    ]);
  };

  const handleSendMessage = async (queryText) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = nextMsgId('user');
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage = {
      id: userMsgId,
      sender: 'user',
      text: textToSend,
      timestamp: userTime
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const aiReply = await askAIGuide(textToSend, selectedDestId);
      const aiMsgId = nextMsgId('ai');
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const aiMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: aiReply,
        timestamp: aiTime
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.warn('AERORA Guide error:', err);
      setErrorMessage('Your guide is temporarily offline. Calibrating connection.');
      const fallbackId = nextMsgId('err');
      const fallbackTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const fallbackMsg = {
        id: fallbackId,
        sender: 'ai',
        text: `Your guide is temporarily offline. While our neural connection recalibrates, consider visiting ${selectedDestination.name}’s iconic quarters early in the morning for serene contemplation.`,
        timestamp: fallbackTime
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    const clearId = nextMsgId('clear');
    const clearTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: clearId,
        sender: 'ai',
        text: `Conversation cleared. Ready for your inquiries regarding ${selectedDestination.name}.`,
        timestamp: clearTime
      }
    ]);
    setErrorMessage(null);
  };

  return (
    <div
      className="ai-guide-container"
      style={{
        backgroundColor: 'var(--surface-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        flexDirection: 'column',
        height: '680px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-elevated)'
      }}
    >
      {/* Editorial Header */}
      <div
        style={{
          padding: 'var(--space-md) var(--space-lg)',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'rgba(8, 9, 12, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="sparkles" size={16} style={{ color: 'var(--gold)' }} />
            <h3
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '1.25rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}
            >
              KALAIURA Guide
            </h3>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
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

      {/* Suggested Questions Strip */}
      <div
        style={{
          padding: '0.65rem var(--space-lg)',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-xs)',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        <span style={{ fontSize: '0.68rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>
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
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--gold)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <div
        ref={chatStreamRef}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'rgba(224, 162, 77, 0.12)',
                border: '1px solid rgba(224, 162, 77, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-accent)',
                color: 'var(--gold)'
              }}
            >
              KU
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

        
      </div>

      {/* Destination Landmark Recommendations Quick-Drawer */}
      {destinationLandmarks.length > 0 && (
        <div
          style={{
            padding: '0.65rem var(--space-lg)',
            backgroundColor: 'rgba(8, 9, 12, 0.85)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}
        >
          <span style={{ fontSize: '0.68rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Curated Places:
          </span>
          {destinationLandmarks.map((place) => {
            const isAdded = hasPlace(place.id);
            return (
              <button
                key={place.id}
                onClick={() => addPlace(place)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: isAdded ? 'rgba(224, 162, 77, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: isAdded ? '1px solid var(--gold)' : '1px solid var(--border)',
                  color: isAdded ? 'var(--gold)' : 'var(--text-secondary)',
                  fontSize: 'var(--text-xs)',
                  cursor: 'pointer'
                }}
              >
                <Icon name={isAdded ? 'check' : 'plus'} size={12} />
                <span>{place.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        style={{
          padding: 'var(--space-md) var(--space-lg)',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'rgba(8, 9, 12, 0.9)',
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
          aria-label={`Ask KALAIURA Guide about ${selectedDestination.name}`}
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
