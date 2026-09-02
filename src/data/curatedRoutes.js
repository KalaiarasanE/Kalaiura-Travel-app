/* ==============================================================================
   AERORA — STYLIZED JOURNEY ROUTE DATA
   Interactive waypoints for the editorial trajectory visualization
   ============================================================================== */

export const ROUTE_WAYPOINTS = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    country: 'India',
    code: 'BLR',
    category: 'The Departure Point',
    tagline: 'Garden City & Technological Crucible',
    coordinatesText: '12.9716° N, 77.5946° E',
    distanceFromPrev: 'Origin',
    flightTimeFromPrev: 'Start',
    elevation: '920 m',
    tempDefault: '24°C · Partly Cloudy',
    previewImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop',
    xPercent: 12,
    yPercent: 68,
    routeNote: 'Dawn departure from the Deccan Plateau; transitioning westward across the Arabian Sea.'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    code: 'DXB',
    category: 'The Desert Oasis',
    tagline: 'Futuristic Architecture on Shifting Sands',
    coordinatesText: '25.2048° N, 55.2708° E',
    distanceFromPrev: '2,704 km',
    flightTimeFromPrev: '3h 50m',
    elevation: '16 m',
    tempDefault: '31°C · Clear Sky',
    previewImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop',
    xPercent: 28,
    yPercent: 48,
    routeNote: 'Refueling amid desert sunbeams and soaring geometric towers.'
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    code: 'FCO',
    category: 'The Eternal City',
    tagline: 'Two Millennia of Stone and Light',
    coordinatesText: '41.9028° N, 12.4964° E',
    distanceFromPrev: '4,320 km',
    flightTimeFromPrev: '6h 15m',
    elevation: '21 m',
    tempDefault: '21°C · Mediterranean Sun',
    previewImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000&auto=format&fit=crop',
    xPercent: 46,
    yPercent: 32,
    routeNote: 'Crossing the Mediterranean Basin into the historic heart of antiquity.'
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    code: 'JTR',
    category: 'The Caldera Arc',
    tagline: 'Aegean Cobalt & Volcanic Cliffs',
    coordinatesText: '36.3932° N, 25.4615° E',
    distanceFromPrev: '1,280 km',
    flightTimeFromPrev: '2h 10m',
    elevation: '300 m',
    tempDefault: '26°C · Aegean Sun',
    previewImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop',
    xPercent: 62,
    yPercent: 42,
    destinationId: 'santorini',
    routeNote: 'Descending onto sheer cliffs where whitewashed chapels meet turquoise waters.'
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    code: 'KIX',
    category: 'The Imperial Sanctuary',
    tagline: 'Cedar Groves & Contemplative Zen',
    coordinatesText: '35.0116° N, 135.7681° E',
    distanceFromPrev: '9,450 km',
    flightTimeFromPrev: '11h 40m',
    elevation: '55 m',
    tempDefault: '18°C · Gentle Mist',
    previewImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
    xPercent: 86,
    yPercent: 26,
    destinationId: 'kyoto',
    routeNote: 'Journey’s zen zenith: vermilion gates and silent moss gardens under mountain rain.'
  }
];
