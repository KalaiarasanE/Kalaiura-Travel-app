/* ==============================================================================
   AERORA — AI TRAVEL INTELLIGENCE SERVICE
   Google Gemini API integration with sophisticated editorial knowledge fallback
   ============================================================================== */

import { DESTINATIONS } from '../data/destinations';
import { PLACES } from '../data/places';

/**
 * Editorial fallback knowledge engine for destinations
 */
const EDITORIAL_KNOWLEDGE = {
  kyoto: {
    duration: 'We recommend 4 to 6 days to truly absorb Kyoto’s contemplative cadence without rushing between temple districts.',
    firstSeen: 'Begin at dawn at Fushimi Inari Taisha (06:30 AM) before the world stirs, then wander into the moss sanctuaries of Higashiyama.',
    bestSeason: 'Late March to mid-April for ephemeral sakura blossom, or November when Japanese maple leaves ignite temple ponds in crimson.',
    avoid: 'Avoid visiting Arashiyama and Kiyomizu-dera during peak midday tourist buses (11:00 to 15:00). Never chase Maiko or photograph private residences in Gion.',
    overview: 'Kyoto is the spiritual heart of Japan, preserving over 1,200 years of imperial architecture, zen gardens, and kaiseki culinary traditions.'
  },
  santorini: {
    duration: '3 to 5 days is ideal—allowing time to sail the caldera, hike the cliff trails, and unwind in volcanic vineyard estates.',
    firstSeen: 'Hike the caldera footpath from Imerovigli to Oia in the late afternoon, arriving just as the Aegean cobalt gives way to amber twilight.',
    bestSeason: 'May to June or September to October, when the sea is warm, winds are balmy, and the summer crowds have dispersed.',
    avoid: 'Avoid high midday sun in July/August without sun protection. Don’t climb onto private cycladic church domes or private cave roof gardens.',
    overview: 'Santorini is a dramatic geological wonder perched on 300-meter volcanic cliffs overlooking the submerged caldera.'
  },
  reykjavik: {
    duration: '5 to 7 days provides time to explore Reykjavik’s design scene, traverse the Golden Circle, and venture into south coast waterfalls.',
    firstSeen: 'The geothermal waters of the Sky Lagoon or Blue Lagoon, followed by an evening aurora expedition away from city glow.',
    bestSeason: 'October to March for dancing Aurora Borealis; June and July for 24-hour Midnight Sun adventures.',
    avoid: 'Never drive off designated gravel roads—the sub-arctic moss takes decades to regenerate. Avoid ignoring maritime weather warnings.',
    overview: 'Iceland is the land of primordial elements: geothermal lagoons, tectonic continental rifts, and dancing celestial lights.'
  },
  'cape-town': {
    duration: '5 to 7 days to combine Table Mountain summits, Cape Winelands tastings, and coastal penguin encounters.',
    firstSeen: 'Table Mountain’s summit plateau via the revolving cableway on the first crystal-clear morning you have.',
    bestSeason: 'December to March for Mediterranean warmth and beach life; September to November for southern right whale watching.',
    avoid: 'Don’t hike Table Mountain alone or without warm layers—the infamous "tablecloth" cloud causes sudden temperature drops.',
    overview: 'Cape Town is where two majestic oceans meet towering sandstone crags, home to the world’s most biodiverse floral kingdom.'
  },
  udaipur: {
    duration: '3 to 4 days is sufficient to tour the marble palaces, enjoy sunset boat cruises, and wander the historic artisan quarters.',
    firstSeen: 'A late afternoon boat cruise across Lake Pichola as the marble facades of the City Palace catch the golden hour light.',
    bestSeason: 'October to March when Rajasthan enjoys dry, breezy, pleasant winter weather.',
    avoid: 'Avoid peak afternoon heat between 13:00 and 16:00. Dress with modesty when entering Jagdish Temple and old quarter shrines.',
    overview: 'Udaipur is Rajasthan’s romantic jewel of the lakes, surrounded by the ancient Aravalli Range and royal Mewar heritage.'
  },
  lisbon: {
    duration: '3 to 4 days allows you to navigate the seven hills, historic Belém, and take a day trip to the romantic palaces of Sintra.',
    firstSeen: 'Miradouro de Santa Luzia at dawn overlooking the tiled roofs of Alfama down to the glittering Tagus estuary.',
    bestSeason: 'April to June and September to October for gentle Atlantic breezes, jacaranda blossoms, and alfresco dining.',
    avoid: 'Avoid wearing smooth-soled shoes on Lisbon’s slick calçada limestone pavements. Avoid boarding Tram 28 at midday peak lines.',
    overview: 'Lisbon is the sun-drenched capital of seven hills, melancholic Fado melodies, ornate azulejo tiles, and maritime legacy.'
  },
  bali: {
    duration: '7 to 10 days to divide your stay between Ubud’s cultural rainforests and Uluwatu’s dramatic clifftop coasts.',
    firstSeen: 'The Jatiluwih UNESCO rice terraces early in the morning before tropical midday humidity rises.',
    bestSeason: 'May to September during the dry season, featuring cool coastal breezes and crystal-clear dive conditions.',
    avoid: 'Never step directly onto canang sari (daily woven palm offerings on sidewalks). Always wear a sarong and sash at sacred temples.',
    overview: 'Bali is Indonesia’s Island of the Gods, blending volcanic landscapes, ancient Subak irrigation, and living Hindu spiritual rituals.'
  },
  'swiss-alps': {
    duration: '5 to 7 days to ride panoramic alpine rail lines and hike high-altitude glacial passes.',
    firstSeen: 'The Matterhorn Glacier Paradise cableway early in the morning for 360-degree views of 38 alpine peaks.',
    bestSeason: 'January to March for premier powder snow and skiing; July to September for wildflower alpine meadows and crystal lakes.',
    avoid: 'Don’t attempt alpine trails without proper mountain boots and weather checks—high-altitude conditions shift rapidly.',
    overview: 'The Swiss Alps represent European alpine majesty, with razor-sharp granite peaks, timeless wooden chalets, and precision rail journeys.'
  }
};

/**
 * Ask AERORA Guide travel assistant
 */
export async function askAIGuide(prompt, destinationId = 'kyoto') {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const destination = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];

  if (apiKey) {
    try {
      const systemContext = `You are KALAIURA Guide, an elite editorial travel concierge and cultural curator.
Destination: ${destination.name}, ${destination.country}
Climate: ${destination.climate}
Atmosphere: Editorial, sophisticated, evocative, sensory, and concise. Avoid generic tourist clichés. Speak with the authority and poetic elegance of a luxury travel magazine editor. Limit responses to 2-3 evocative paragraphs with actionable insight.`;

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
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (err) {
      console.warn('AERORA AI Service: Gemini API unavailable, engaging editorial knowledge base', err);
    }
  }

  // Graceful fallback with intelligent editorial response matching
  return generateEditorialResponse(prompt, destination);
}

/**
 * Intelligent editorial response generator when offline or without API key
 */
function generateEditorialResponse(prompt, destination) {
  const lower = prompt.toLowerCase();
  const info = EDITORIAL_KNOWLEDGE[destination.id] || EDITORIAL_KNOWLEDGE.kyoto;

  if (lower.includes('how many days') || lower.includes('duration') || lower.includes('how long')) {
    return `${info.duration} For ${destination.name}, a rushed itinerary diminishes the poetic essence of the location. Allow unscripted hours for contemplation and spontaneous wandering.`;
  }

  if (lower.includes('first') || lower.includes('start') || lower.includes('must see') || lower.includes('priority')) {
    return `Without hesitation, make your first pilgrimage to ${info.firstSeen}. Arriving during off-peak lighting transforms an ordinary tourist sight into a profound sensory memory.`;
  }

  if (lower.includes('when') || lower.includes('best time') || lower.includes('season') || lower.includes('weather')) {
    return `The optimal window for ${destination.name} is ${info.bestSeason}. The climate aligns harmoniously with outdoor exploration, casting dramatic light across the landscape.`;
  }

  if (lower.includes('avoid') || lower.includes('mistake') || lower.includes('don\'t') || lower.includes('scam')) {
    return `To preserve the sanctity of your voyage: ${info.avoid} Respecting local customs and spatial etiquette elevates your relationship with the place from visitor to welcomed guest.`;
  }

  if (lower.includes('plan') || lower.includes('itinerary') || lower.includes('5-day') || lower.includes('3-day')) {
    return `For ${destination.name}, a refined journey moves between architectural heritage, sensory culinary rituals, and untouched nature. We recommend structuring mornings around historic sanctuaries, afternoons in quiet tea houses or galleries, and evenings savoring regional vintages as the sun descends.`;
  }

  return `${info.overview} When exploring ${destination.name}, pay close attention to the subtle textures—the sound of footsteps on ancient stone, the scent of local flora, and the warm hospitality of generational craftsmen. How else may I assist your voyage?`;
}

/**
 * AI Structured Itinerary Generator
 * Produces structured day-by-day itineraries
 */
export async function generateStructuredItinerary({
  destinationId = 'kyoto',
  durationDays = 3,
  travelStyle = 'Culture',
  budget = 'Premium',
  pace = 'Balanced',
  interests = []
}) {
  const dest = DESTINATIONS.find(d => d.id === destinationId) || DESTINATIONS[0];
  const destPlaces = PLACES.filter(p => p.destinationId === dest.id);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const prompt = `Generate a structured, elegant ${durationDays}-day travel itinerary for ${dest.name}, ${dest.country}.
Travel Style: ${travelStyle}, Pace: ${pace}, Budget: ${budget}, Interests: ${interests.join(', ') || 'Culture, Architecture'}.
Return ONLY a valid JSON array of days. Do not include markdown code block backticks.
Schema:
[
  {
    "dayNumber": 1,
    "theme": "Arrival & Historic Immersion",
    "schedule": [
      {
        "time": "09:00",
        "activity": "Activity Name",
        "location": "Specific Location",
        "explanation": "2 sentence elegant description",
        "duration": "2 Hours"
      }
    ]
  }
]`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );

      if (response.ok) {
        const data = await response.json();
        let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (rawText) {
          // Clean possible markdown code fences
          rawText = rawText.replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
          const parsed = JSON.parse(rawText);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (err) {
      console.warn('AERORA AI: Gemini Itinerary parsing failed, using curated generator', err);
    }
  }

  // Graceful Algorithmic Itinerary Generator
  return buildCuratedItinerary(dest, durationDays, travelStyle, pace, destPlaces);
}

/**
 * Algorithmic generator producing exquisite structured day plans
 */
function buildCuratedItinerary(destination, daysCount, style, pace, places) {
  const days = [];
  const totalDays = Math.min(Math.max(Number(daysCount) || 3, 1), 14);

  const themes = [
    'Arrival & First Impressions',
    'Sacred Architecture & Living Heritage',
    'Culinary Traditions & Old Quarter Wandering',
    'Elemental Horizons & Natural Solitude',
    'Contemporary Art & Hidden Sanctuaries',
    'Panoramas & Golden Hour Farewell',
    'Artisan Crafts & Slow Contemplation'
  ];

  for (let i = 1; i <= totalDays; i++) {
    const theme = themes[(i - 1) % themes.length];
    const place = places[(i - 1) % (places.length || 1)] || {
      name: `${destination.name} Heritage Quarter`,
      location: destination.name,
      recommendedDuration: '2.5 Hours'
    };

    const schedule = [];

    // Morning
    schedule.push({
      time: pace === 'Slow' ? '10:00' : '08:30',
      activity: `Dawn Exploration of ${place.name}`,
      location: place.location,
      explanation: `Begin in quiet morning light before crowds gather. Absorb the architectural contours and tranquil surroundings.`,
      duration: place.recommendedDuration || '2 Hours'
    });

    // Midday / Lunch
    schedule.push({
      time: '12:30',
      activity: `Seasonal ${style} Gastronomy Tasting`,
      location: `Central ${destination.name}`,
      explanation: `Enjoy an unhurried regional meal emphasizing seasonal ingredients and local culinary heritage.`,
      duration: '1.5 Hours'
    });

    // Afternoon
    if (pace !== 'Slow') {
      const nextPlace = places[i % (places.length || 1)] || place;
      schedule.push({
        time: '15:00',
        activity: `Discovery of ${nextPlace.name}`,
        location: nextPlace.location,
        explanation: `Experience the evocative textures and curated exhibits in the heart of the district.`,
        duration: nextPlace.recommendedDuration || '2 Hours'
      });
    }

    // Evening
    schedule.push({
      time: '18:30',
      activity: 'Golden Hour Vista & Twilight Dining',
      location: `${destination.name} Panoramic Overlook`,
      explanation: `Watch twilight settle over the city with regional wine and ambient local music.`,
      duration: '2.5 Hours'
    });

    days.push({
      dayNumber: i,
      theme,
      schedule
    });
  }

  return days;
}
