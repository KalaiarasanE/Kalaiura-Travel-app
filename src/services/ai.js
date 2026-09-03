/* ==============================================================================
   KALAIURA — AI TRAVEL INTELLIGENCE SERVICE
   Place-specific personal travel assistant with dynamic destination detection,
   rich destination cards, and structured answers for all project destinations.
   ============================================================================== */

import { DESTINATIONS } from '../data/destinations';
import { PLACES } from '../data/places';
import { DESTINATION_GUIDE_DATA } from '../data/destinationGuideData';

// Map of keywords and aliases to identify destinations from natural queries
const DESTINATION_ALIASES = [
  { id: 'goa', keywords: ['goa', 'panaji', 'panjim', 'calangute', 'baga', 'anjuna', 'palolem', 'aguada'] },
  { id: 'kerala', keywords: ['kerala', 'alleppey', 'alappuzha', 'kochi', 'cochin', 'varkala', 'kumarakom', 'periyar'] },
  { id: 'rajasthan', keywords: ['rajasthan', 'jodhpur', 'jaisalmer', 'thar', 'bikaner', 'pushkar', 'mewar'] },
  { id: 'kashmir', keywords: ['kashmir', 'srinagar', 'gulmarg', 'pahalgam', 'sonamarg', 'dal lake'] },
  { id: 'himachal-pradesh', keywords: ['himachal', 'himachal pradesh', 'spiti', 'dharamshala', 'mcleodganj', 'kasol', 'kullu', 'kalka', 'shimla'] },
  { id: 'manali', keywords: ['manali', 'solang', 'atal tunnel', 'sissu', 'rohtang', 'hadimba'] },
  { id: 'uttarakhand', keywords: ['uttarakhand', 'mussoorie', 'nainital', 'corbett', 'haridwar', 'auli', 'ganga aarti'] },
  { id: 'rishikesh', keywords: ['rishikesh', 'triveni ghat', 'lakshman jhula', 'beatles ashram', 'shivpuri'] },
  { id: 'tamil-nadu', keywords: ['tamil nadu', 'tamilnadu', 'madurai', 'mahabalipuram', 'thanjavur', 'rameswaram', 'chennai', 'chettinad'] },
  { id: 'ooty', keywords: ['ooty', 'udhagamandalam', 'nilgiri', 'coonoor', 'doddabetta', 'pykara'] },
  { id: 'karnataka', keywords: ['karnataka', 'hampi', 'mysore', 'mysuru', 'gokarna', 'chikmagalur', 'bengaluru', 'bangalore'] },
  { id: 'coorg', keywords: ['coorg', 'kodagu', 'madikeri', 'talacauvery', 'bylakuppe', 'abbey falls', 'dubare'] },
  { id: 'wayanad', keywords: ['wayanad', 'edakkal', 'banasura', 'chembra', 'kuruva', 'soochipara'] },
  { id: 'munnar', keywords: ['munnar', 'kolukkumalai', 'eravikulam', 'mattupetty', 'lockhart'] },
  { id: 'maharashtra', keywords: ['maharashtra', 'mumbai', 'bombay', 'ajanta', 'ellora', 'lonavala', 'alibaug', 'nashik', 'mahabaleshwar'] },
  { id: 'meghalaya', keywords: ['meghalaya', 'shillong', 'cherrapunji', 'sohra', 'dawki', 'mawlynnong', 'living root bridge'] },
  { id: 'sikkim', keywords: ['sikkim', 'gangtok', 'tsomgo', 'nathula', 'pelling', 'yumthang', 'kangchenjunga'] },
  { id: 'andaman-nicobar', keywords: ['andaman', 'nicobar', 'havelock', 'radhanagar', 'neil island', 'port blair', 'cellular jail'] },
  { id: 'taj-mahal-agra', keywords: ['taj mahal', 'agra', 'fatehpur sikri', 'mehtab bagh'] },
  { id: 'jaipur', keywords: ['jaipur', 'pink city', 'amber fort', 'hawa mahal', 'jantar mantar', 'nahargarh'] },
  { id: 'udaipur', keywords: ['udaipur', 'lake pichola', 'city palace', 'jag mandir', 'saheliyon'] },
  { id: 'varanasi', keywords: ['varanasi', 'kashi', 'banaras', 'dashashwamedh', 'sarnath', 'manikarnika'] },
  { id: 'leh-ladakh', keywords: ['ladakh', 'leh', 'pangong', 'nubra', 'khardung la', 'zanskar', 'hunder', 'thiksey'] },
  { id: 'pondicherry', keywords: ['pondicherry', 'puducherry', 'auroville', 'white town', 'promenade beach'] },
  { id: 'darjeeling', keywords: ['darjeeling', 'tiger hill', 'batasia loop', 'ghoom', 'glenary'] },
  { id: 'kyoto', keywords: ['kyoto', 'japan', 'fushimi inari', 'arashiyama', 'gion', 'kinkaku'] },
  { id: 'santorini', keywords: ['santorini', 'greece', 'oia', 'fira', 'caldera', 'aegean'] },
  { id: 'reykjavik', keywords: ['reykjavik', 'iceland', 'blue lagoon', 'golden circle', 'aurora'] },
  { id: 'bali', keywords: ['bali', 'indonesia', 'ubud', 'uluwatu', 'canggu', 'tanah lot'] }
];

/**
 * Detects destination ID from natural user text
 */
export function detectDestinationFromQuery(text, fallbackId = 'goa') {
  if (!text) return fallbackId;
  const lower = text.toLowerCase();

  for (const item of DESTINATION_ALIASES) {
    for (const kw of item.keywords) {
      // Word boundary or containment check
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(lower) || lower.includes(kw)) {
        return item.id;
      }
    }
  }

  return fallbackId;
}

/**
 * Retrieve guide data for a specific destination
 */
export function getDestinationGuide(destId) {
  if (!destId) return DESTINATION_GUIDE_DATA.goa;
  const direct = DESTINATION_GUIDE_DATA[destId];
  if (direct) return direct;

  // Search by partial match or fallback
  const found = Object.values(DESTINATION_GUIDE_DATA).find(
    d => d.id === destId || d.name.toLowerCase().includes(destId.toLowerCase())
  );

  return found || DESTINATION_GUIDE_DATA.goa;
}

/**
 * Main AI Guide Consultation entry point
 * Returns structured result: { text: string, destinationCard: object, detectedDestId: string }
 */
export async function askAIGuide(prompt, contextDestinationId = 'goa') {
  // 1. Detect if the user mentioned a specific destination in their query
  const detectedDestId = detectDestinationFromQuery(prompt, contextDestinationId);
  const guideData = getDestinationGuide(detectedDestId);
  const destination = DESTINATIONS.find(d => d.id === detectedDestId) || { name: guideData.name, country: 'India' };

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const systemContext = `You are KALAIURA Guide, an elite personal travel assistant and cultural concierge.
Current Destination: ${guideData.name} (${guideData.state})
Category: ${guideData.category}
Known Top Places: ${guideData.topPlaces.join(', ')}
Known Must-Try Foods: ${guideData.mustTryFood.join(', ')}
Best Time: ${guideData.bestTime}
Suggested Plan: ${guideData.suggestedPlan}

Provide a visually structured, place-specific response tailored to the question.
If the user asks a general question or "tell me about [place]", format the response clearly with:
* 📍 ${guideData.name}
* 🏝️ Top Places: ${guideData.topPlaces.slice(0, 4).join(', ')}
* 🍴 Must Try: ${guideData.mustTryFood.slice(0, 4).join(', ')}
* 🗓️ Best Time: ${guideData.bestTime}
* 🎯 Best For: ${guideData.bestFor}
* 🧭 Suggested Plan: ${guideData.suggestedPlan}

Follow with 1-2 evocative, insightful paragraphs. Keep responses engaging and directly actionable.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `${systemContext}\n\nVisitor Question: ${prompt}` }
                ]
              }
            ]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const geminiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiText) {
          const result = new String(geminiText);
          result.text = geminiText;
          result.destinationCard = guideData;
          result.detectedDestId = detectedDestId;
          return result;
        }
      }
    } catch (err) {
      console.warn('KALAIURA AI: Gemini API unavailable, using place-specific knowledge engine', err);
    }
  }

  // 2. High-precision place-specific editorial knowledge generator
  const generatedText = generatePlaceSpecificResponse(prompt, guideData, destination);

  // Return enhanced string object for full backward compatibility
  const result = new String(generatedText);
  result.text = generatedText;
  result.destinationCard = guideData;
  result.detectedDestId = detectedDestId;
  return result;
}

/**
 * Generates tailored place-specific responses based on user query intent
 */
function generatePlaceSpecificResponse(prompt, guide, _destination) {
  const lower = prompt.toLowerCase();
  const name = guide.name;

  // Intent A: "What can I do in [place]?" / "Things to do" / "Activities"
  if (lower.includes('what can i do') || lower.includes('things to do') || lower.includes('activities') || lower.includes('what to do')) {
    return `Here are the top curated experiences and things to do in ${name}:

• ${guide.thingsToDo[0] || 'Explore iconic local landmarks at morning golden hour'}
• ${guide.thingsToDo[1] || 'Sample authentic regional culinary specialties'}
• ${guide.thingsToDo[2] || 'Experience panoramic vistas and nature trails'}
• ${guide.thingsToDo[3] || 'Immerse in local living heritage and artisan markets'}
• ${guide.thingsToDo[4] || 'Relax with sunset views by local waters or viewpoints'}
• ${guide.thingsToDo[5] || 'Discover off-map cultural quarters and quiet streets'}

💡 Travel Tip: ${guide.travelTips[0]}

Would you like me to structure a customized day-by-day plan for ${name}?`;
  }

  // Intent B: "Plan a 3-day [place] trip" / "Itinerary" / "Plan"
  if (lower.includes('plan') || lower.includes('itinerary') || lower.includes('3-day') || lower.includes('5-day') || lower.includes('days trip')) {
    if (guide.itinerary3Day && guide.itinerary3Day.length > 0) {
      const it = guide.itinerary3Day;
      return `Here is your curated 3-Day / 2-Night Expedition Architecture for ${name}:

🗓️ Day 1 — ${it[0].title}
${it[0].plan}

🗓️ Day 2 — ${it[1].title}
${it[1].plan}

🗓️ Day 3 — ${it[2] ? it[2].title : 'Leisure & Departure'}
${it[2] ? it[2].plan : 'Savor a relaxed local breakfast, souvenir shopping for authentic crafts, and departure.'}

🧭 Suggested Pace: ${guide.suggestedPlan}
💡 Travel Tip: ${guide.travelTips[1] || guide.travelTips[0]}

You can also launch our interactive Trip Planner to customize this itinerary day by day!`;
    }
  }

  // Intent C: "Best places to visit in [place]?" / "Top places" / "Attractions" / "Sightseeing"
  if (lower.includes('best places') || lower.includes('top places') || lower.includes('attractions') || lower.includes('sightseeing') || lower.includes('what should i see')) {
    return `Here are the unmissable places to visit in ${name}:

🏝️ Top Attractions:
${guide.topPlaces.map(p => `• ${p}`).join('\n')}

🎯 Best For: ${guide.bestFor}
🗓️ Best Time: ${guide.bestTime}

💡 Local Recommendation: ${guide.travelTips[0]}

Click any of the suggested prompts below to explore dining or day-by-day itineraries for ${name}!`;
  }

  // Intent D: "What food should I try in [place]?" / "Food" / "Eat" / "Cuisine" / "Dish"
  if (lower.includes('food') || lower.includes('eat') || lower.includes('cuisine') || lower.includes('dish') || lower.includes('must try') || lower.includes('taste')) {
    return `Here are the iconic culinary masterpieces you must experience in ${name}:

🍴 Signature Delicacies:
${guide.mustTryFood.map(f => `• ${f}`).join('\n')}

💡 Dining Note: Authentic regional recipes are best savored at family-run heritage eateries and local culinary institutions. Pair your meals with regional fresh juices, teas, or cool herbal infusions for the complete sensory experience.`;
  }

  // Intent E: "Which places are good for a family trip?" / "Family" / "Kids"
  if (lower.includes('family') || lower.includes('kids') || lower.includes('children')) {
    return `For families exploring ${name}, here are our curated recommendations:

👨‍👩‍👧 Family Travel Highlights:
${guide.familyRecommendations}

🧭 Pacing & Comfort:
We recommend planning for ${guide.approxDuration || '3–4 days'} to allow comfortable travel pacing without rushing between sites. ${guide.travelTips[0]}`;
  }

  // Intent F: "Couples" / "Romantic" / "Honeymoon"
  if (lower.includes('couple') || lower.includes('romantic') || lower.includes('honeymoon')) {
    return `For couples seeking an intimate and memorable voyage to ${name}:

💑 Romantic Experiences:
${guide.coupleRecommendations}

🗓️ Ideal Window: ${guide.bestTime}
🧭 Suggested Stay: ${guide.suggestedPlan}`;
  }

  // Intent G: "Best time to visit" / "Weather" / "Season" / "When"
  if (lower.includes('best time') || lower.includes('when') || lower.includes('weather') || lower.includes('season') || lower.includes('climate') || lower.includes('month')) {
    return `The optimal time to visit ${name} is ${guide.bestTime}.

During this period:
• Weather: Optimal temperatures for outdoor exploration and sightseeing.
• Vistas: Clear skies casting dramatic golden hour light across the landscapes.
• Pacing: Ideal for a ${guide.suggestedPlan}.

💡 Packing Advice: ${guide.travelTips[2] || guide.travelTips[0]}`;
  }

  // Intent H: General Query / "Tell me about [place]" / Direct Destination Information Card
  return `* 📍 ${guide.name}
* 🏝️ Top Places: ${guide.topPlaces.slice(0, 4).join(', ')}
* 🍴 Must Try: ${guide.mustTryFood.slice(0, 3).join(', ')}
* 🗓️ Best Time: ${guide.bestTime}
* 🎯 Best For: ${guide.bestFor}
* 🧭 Suggested Plan: ${guide.suggestedPlan}

Welcome to ${guide.name}—${guide.tagline}. Whether you are drawn by its iconic landmarks, regional delicacies, or tranquil natural retreats, ${name} offers profound depth for travelers who value intentional exploration.

How may I assist your voyage to ${name} further?`;
}

/**
 * AI Structured Itinerary Generator for Planner
 */
export async function generateStructuredItinerary({
  destinationId = 'goa',
  durationDays = 3,
  _travelStyle = 'Culture',
  _budget = 'Premium',
  pace = 'Balanced',
  _interests = []
}) {
  const guide = getDestinationGuide(destinationId);
  const destPlaces = PLACES.filter(p => p.destinationId === destinationId);

  const days = [];
  const totalDays = Math.min(Math.max(Number(durationDays) || 3, 1), 14);

  for (let i = 1; i <= totalDays; i++) {
    const dayPlace = destPlaces[(i - 1) % (destPlaces.length || 1)] || {
      name: guide.topPlaces[(i - 1) % guide.topPlaces.length] || `${guide.name} Heritage Quarter`,
      location: guide.name,
      recommendedDuration: '2.5 Hours'
    };

    const schedule = [
      {
        time: pace === 'Slow' ? '10:00' : '08:30',
        activity: `Morning Exploration of ${dayPlace.name}`,
        location: dayPlace.location || guide.name,
        explanation: `Begin in soft morning light before crowds gather. Experience the unique architectural contours and serene atmosphere.`,
        duration: '2.5 Hours'
      },
      {
        time: '12:30',
        activity: `Authentic ${guide.name} Gastronomy Lunch`,
        location: `Central ${guide.name}`,
        explanation: `Enjoy unhurried regional specialties including ${guide.mustTryFood[i % guide.mustTryFood.length] || 'local culinary delicacies'}.`,
        duration: '1.5 Hours'
      },
      {
        time: '15:30',
        activity: `Discovery of ${guide.topPlaces[(i + 1) % guide.topPlaces.length] || 'Scenic Viewpoint'}`,
        location: guide.name,
        explanation: `Immerse in the sensory depth and cultural heritage of the area.`,
        duration: '2 Hours'
      },
      {
        time: '18:30',
        activity: 'Golden Hour Vista & Twilight Gathering',
        location: `${guide.name} Sunset Point`,
        explanation: `Watch twilight settle over the landscape with evening refreshments and local music.`,
        duration: '2 Hours'
      }
    ];

    days.push({
      dayNumber: i,
      theme: `${dayPlace.name} & Surrounds`,
      schedule
    });
  }

  return days;
}
