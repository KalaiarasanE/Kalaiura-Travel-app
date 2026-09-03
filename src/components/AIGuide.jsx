/* ==============================================================================
   KALAIURA — AI TRAVEL GUIDE (PERSONAL TRAVEL ASSISTANT)
   Place-specific travel intelligence, dynamic destination switching,
   curated assistant panels, and authentic Indian & global travel guidance.
   ============================================================================== */

import React, { useState, useRef, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { PLACES } from '../data/places';
import { askAIGuide, getDestinationGuide } from '../services/ai';
import { ChatMessage } from './ChatMessage';
import { Icon } from './Icons';
import { useJourneyContext } from '../context/JourneyContext';

let globalMsgCounter = 0;
function nextMsgId(prefix = 'msg') {
  globalMsgCounter += 1;
  return `${prefix}-${globalMsgCounter}`;
}

export function AIGuide({ initialDestinationId = 'goa' }) {
  const [selectedDestId, setSelectedDestId] = useState(initialDestinationId);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { addPlace, hasPlace } = useJourneyContext();

  const selectedDestination = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];
  const initialGuideData = getDestinationGuide(selectedDestId);
  const destinationLandmarks = PLACES.filter((p) => p.destinationId === selectedDestination.id);

  // Dynamic place-specific suggested questions
  const suggestedQuestions = [
    `What can I do in ${selectedDestination.name}?`,
    `Plan a 3-day ${selectedDestination.name} trip`,
    `Best places to visit in ${selectedDestination.name}?`,
    `What food should I try in ${selectedDestination.name}?`,
    `Is ${selectedDestination.name} good for a family trip?`,
    `What is the best time to visit ${selectedDestination.name}?`
  ];

  const [messages, setMessages] = useState(() => [
    {
      id: 'init-1',
      sender: 'ai',
      text: `Greetings. I am your KALAIURA Personal Travel Assistant for ${initialGuideData.name}. Here is your instant expedition overview:`,
      destinationCard: initialGuideData,
      timestamp: 'Just now'
    }
  ]);

  const chatStreamRef = useRef(null);

  // Auto-scroll the internal chat stream container ONLY (never jumps parent page window)
  useEffect(() => {
    if (chatStreamRef.current) {
      chatStreamRef.current.scrollTop = chatStreamRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Handle destination switch from dropdown
  const handleDestinationChange = (newDestId) => {
    setSelectedDestId(newDestId);
    const newGuide = getDestinationGuide(newDestId);
    const newId = nextMsgId('dest');
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        id: newId,
        sender: 'ai',
        text: `Now attuned to ${newGuide.name}. Here are the essential attractions, culinary highlights, and optimal travel window for your voyage:`,
        destinationCard: newGuide,
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
      const replyObj = await askAIGuide(textToSend, selectedDestId);
      const aiMsgId = nextMsgId('ai');
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      // If user query mentioned a different destination, update the dropdown context
      if (replyObj.detectedDestId && replyObj.detectedDestId !== selectedDestId) {
        setSelectedDestId(replyObj.detectedDestId);
      }

      const aiMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: replyObj.text || String(replyObj),
        destinationCard: replyObj.destinationCard || null,
        timestamp: aiTime
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.warn('KALAIURA Guide error:', err);
      setErrorMessage('Your assistant is temporarily reconnecting.');
      const fallbackId = nextMsgId('err');
      const fallbackTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const fallbackMsg = {
        id: fallbackId,
        sender: 'ai',
        text: `While our connection refreshes, explore ${selectedDestination.name}’s top attractions or sample regional delicacies.`,
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
    const guide = getDestinationGuide(selectedDestId);

    setMessages([
      {
        id: clearId,
        sender: 'ai',
        text: `Conversation cleared. I am ready for your questions about ${guide.name}.`,
        destinationCard: guide,
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
        border: '1px solid rgba(224, 162, 77, 0.25)',
        borderRadius: '16px',
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
          backgroundColor: 'rgba(8, 9, 12, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>✦</span>
            <h3
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '1.2rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: '600',
                color: 'var(--text-primary)',
                margin: 0
              }}
            >
              KALAIURA Travel Assistant
            </h3>
          </div>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
            Place-specific guidance, attractions, dining & itineraries.
          </p>
        </div>

        {/* Destination Context Selector & Clear Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
          <select
            className="input-field"
            value={selectedDestId}
            onChange={(e) => handleDestinationChange(e.target.value)}
            aria-label="Select destination context for AI Assistant"
            style={{
              padding: '0.45rem 1.8rem 0.45rem 0.85rem',
              fontSize: 'var(--text-xs)',
              width: 'auto',
              minWidth: '160px',
              borderColor: 'rgba(224, 162, 77, 0.3)'
            }}
          >
            {DESTINATIONS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.country || 'India'})
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
          gap: '6px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        <span style={{ fontSize: '0.68rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>
          Suggested:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            style={{
              padding: '0.3rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(224, 162, 77, 0.06)',
              border: '1px solid rgba(224, 162, 77, 0.2)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--gold)';
              e.currentTarget.style.color = 'var(--gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(224, 162, 77, 0.2)';
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
          <ChatMessage
            key={msg.id}
            message={msg}
            onQuickAsk={handleSendMessage}
          />
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
            padding: '0.5rem var(--space-lg)',
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
            Quick Places:
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
                  padding: '0.25rem 0.6rem',
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
          backgroundColor: 'rgba(8, 9, 12, 0.95)',
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
          placeholder={`Ask about ${selectedDestination.name} (e.g. "Top places", "Plan a 3-day trip", "Food to try")...`}
          aria-label={`Ask KALAIURA Guide about ${selectedDestination.name}`}
          disabled={isLoading}
          style={{ flex: 1, padding: '0.75rem 1.15rem', borderRadius: '10px' }}
        />

        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className="btn btn-primary btn-sm"
          aria-label="Submit message"
          style={{ padding: '0.75rem 1.25rem', borderRadius: '10px' }}
        >
          <span>Ask</span>
          <Icon name="send" size={14} />
        </button>
      </form>
    </div>
  );
}
