/* ==============================================================================
   AERORA — EDITORIAL DESTINATION REPOSITORY
   Curated destinations with rich cultural, climatic, and narrative depth
   ============================================================================== */


import { INDIA_DESTINATIONS } from './indiaDestinations';

const FORMATTED_INDIA_DESTINATIONS = INDIA_DESTINATIONS.map(d => ({
  id: d.id,
  name: d.name,
  country: 'India',
  region: 'Asia',
  climate: d.climate || 'Tropical',
  travelStyles: d.travelStyles || ['Culture', 'Nature'],
  budget: d.budget || 'Premium',
  bestSeason: d.bestTime?.includes('Oct') ? 'Winter' : 'Spring',
  bestMonths: d.bestTime || 'October to March',
  coordinates: { lat: 20.5937, lon: 78.9629 },
  shortDescription: d.shortDescription,
  heroImage: d.heroImage || d.cardImage,
  cardImage: d.cardImage,
  gridVariant: d.isFeatured ? 'card-featured' : 'standard',
  editorialQuote: d.tagline || d.shortDescription,
  defaultWeather: {
    temp: d.weather?.temp || 26,
    condition: d.weather?.condition || 'Pleasant',
    feelsLike: d.weather?.temp || 26,
    humidity: 55,
    wind: 10,
    visibility: '15 km',
    sunrise: '06:05',
    sunset: '18:25'
  },
  whyGo: [
    { title: d.category, body: d.shortDescription },
    { title: 'Cultural Antiquity', body: `Immerse in the living traditions, architectural marvels, and generational hospitality of ${d.state}.` },
    { title: 'Sensory Immersion', body: `From regional spices to morning mists, ${d.name} offers profound unhurried depth.` }
  ],
  whenToGo: {
    recommendation: d.bestTime,
    seasons: [
      { name: 'Autumn / Winter (Oct–Feb)', note: 'Crystalline skies, dry breezes, and ideal temperatures for exploration.' },
      { name: 'Spring / Summer (Mar–Jun)', note: 'Vibrant local festivals, blossoming hill stations, and lush plantation greenery.' },
      { name: 'Monsoon (Jul–Sep)', note: 'Dramatic rain canopies, swollen waterfalls, and rejuvenated rainforests.' }
    ]
  },
  localNotes: [
    { label: 'Cultural Etiquette', detail: 'Modest attire is appreciated at sacred temples and spiritual sanctuaries.' },
    { label: 'Pacing Advice', detail: 'Allow generous travel time between hill stations to savor winding scenic routes.' },
    { label: 'Local Flavors', detail: 'Savor regional organic spices and generational slow-cooked specialties.' }
  ]
}));

const BASE_DESTINATIONS = [
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    climate: 'Temperate',
    travelStyles: ['Culture', 'Architecture', 'Relaxation', 'Food'],
    budget: 'Premium',
    bestSeason: 'Spring',
    bestMonths: 'March to May & October to November',
    coordinates: { lat: 35.0116, lon: 135.7681 },
    shortDescription: 'Ancient imperial capital of moss-carpeted zen gardens, cedar-scented shrines, and preserved geisha districts.',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
    gridVariant: 'card-featured', // spans 2 cols in asymmetric grid
    editorialQuote: 'A sanctuary where centuries-old timber whispers in the rain and silence is an art form.',
    defaultWeather: {
      temp: 18,
      condition: 'Gentle Mist',
      feelsLike: 18,
      humidity: 62,
      wind: 8,
      visibility: '10 km',
      sunrise: '05:42',
      sunset: '18:15',
    },
    whyGo: [
      {
        title: 'Architectural Antiquity',
        body: 'Over a thousand Buddhist temples and hundreds of Shinto shrines form an uninterrupted lineage of sacred carpentry and contemplative landscaping.'
      },
      {
        title: 'The Ritual of Kaiseki',
        body: 'Dining here is not sustenance—it is a visual seasonal haiku orchestrated by master chefs honoring wild mountain herbs, dashi broth, and heirloom tofu.'
      },
      {
        title: 'Pockets of Profound Stillness',
        body: 'Step into Ryoan-ji at opening dawn or wander the bamboo canopy of Sagano before the world awakens to discover a rhythm undisturbed by the modern world.'
      }
    ],
    whenToGo: {
      recommendation: 'Late March to mid-April for cherry blossom ephemeral bloom; November for fiery maple autumn foliage.',
      seasons: [
        { name: 'Spring (Mar–May)', note: 'Sakura blossoms drift along the Philosopher’s Path; cool crisp mornings and vibrant tea festivals.' },
        { name: 'Summer (Jun–Aug)', note: 'Lush greenery and Gion Matsuri festival; warm and humid with lantern-lit riverside dining (kawadoko).' },
        { name: 'Autumn (Sep–Nov)', note: 'Fiery Japanese maples illuminate temple gardens; dry, crystalline skies and peak seasonal cuisine.' },
        { name: 'Winter (Dec–Feb)', note: 'Serene solitude with dustings of snow on golden pavilions and quiet onsen soaks in northern hills.' }
      ]
    },
    localNotes: [
      { label: 'Temple Etiquette', detail: 'Remove footwear before stepping onto tatami mats; maintain hushed tones inside inner sanctums.' },
      { label: 'Geiko Respect', detail: 'Do not chase or touch Geiko and Maiko in Gion; observe their poise with discreet distance.' },
      { label: 'Morning Timing', detail: 'Fushimi Inari and Arashiyama are best explored before 07:30 to experience their mystic quietude.' }
    ]
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    climate: 'Mediterranean',
    travelStyles: ['Relaxation', 'Architecture', 'Nature', 'Food'],
    budget: 'Ultra-Luxury',
    bestSeason: 'Summer',
    bestMonths: 'May to October',
    coordinates: { lat: 36.3932, lon: 25.4615 },
    shortDescription: 'Sun-drenched caldera cliffs crowned with whitewashed cycladic chapels and sapphire Aegean waters.',
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2000&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
    gridVariant: 'card-tall',
    editorialQuote: 'A volcanic amphitheater sculpted by ancient eruptions, suspended between Aegean cobalt and boundless sky.',
    defaultWeather: {
      temp: 26,
      condition: 'Aegean Sun',
      feelsLike: 27,
      humidity: 50,
      wind: 19,
      visibility: '16 km',
      sunrise: '06:12',
      sunset: '19:54',
    },
    whyGo: [
      {
        title: 'The Caldera Panorama',
        body: 'Perched 300 meters above sea level on sheer volcanic rock, the views of the submerged volcano caldera are without equal anywhere on Earth.'
      },
      {
        title: 'Assyrtiko Wine Terroir',
        body: 'Taste ancient basket-woven vines that draw minerality directly from volcanic ash, producing crisp, citrus-tinged dry whites of world acclaim.'
      },
      {
        title: 'Cycladic Architectural Purity',
        body: 'Soft organic curves, subterranean cave dwellings, and blue-domed belfries that glow like pearls against the deep turquoise sea.'
      }
    ],
    whenToGo: {
      recommendation: 'May to June or September to October offer warm seas, brilliant sunsets, and significantly fewer crowds than mid-summer.',
      seasons: [
        { name: 'Spring (Apr–May)', note: 'Wildflowers carpet the caldera rim; warm, gentle days ideal for hiking from Fira to Oia.' },
        { name: 'Summer (Jun–Aug)', note: 'Peak vibrancy, crystalline swimming water, glamorous beach clubs, and legendary sunset celebrations.' },
        { name: 'Autumn (Sep–Oct)', note: 'The sea retains summer warmth; balmy evenings and harvest season in the volcanic vineyards.' },
        { name: 'Winter (Nov–Mar)', note: 'Dramatic stormy light, deeply reflective atmosphere, and intimate local village life.' }
      ]
    },
    localNotes: [
      { label: 'Cliff Walking', detail: 'Wear sturdy footwear; cobblestone steps can become slippery under midday sunshine.' },
      { label: 'Water Conservation', detail: 'Santorini has no natural springs; fresh water is shipped and desalinated, so use mindfully.' },
      { label: 'Private Dwellings', detail: 'Never climb onto roofs or private balconies for photography; respect resident boundaries.' }
    ]
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik & The Fjords',
    country: 'Iceland',
    region: 'Europe',
    climate: 'Arctic/Alpine',
    travelStyles: ['Nature', 'Adventure', 'Relaxation'],
    budget: 'Premium',
    bestSeason: 'Winter',
    bestMonths: 'October to March (Aurora) & June to August (Midnight Sun)',
    coordinates: { lat: 64.1466, lon: -21.9426 },
    shortDescription: 'The frontier of primordial elements: geothermal lagoons, volcanic basalt fields, and dancing aurora borealis.',
    heroImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=2000&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=1200&auto=format&fit=crop',
    gridVariant: 'card-wide',
    editorialQuote: 'Where tectonic plates pull apart and the earth breathes in columns of sulfur and steam.',
    defaultWeather: {
      temp: 4,
      condition: 'Crisp Glacial Air',
      feelsLike: 0,
      humidity: 78,
      wind: 24,
      visibility: '15 km',
      sunrise: '07:30',
      sunset: '18:40',
    },
    whyGo: [
      {
        title: 'The Northern Lights Ballet',
        body: 'During dark winter nights, solar winds ignite the polar ionosphere in iridescent curtains of green, violet, and electric rose.'
      },
      {
        title: 'Geothermal Bathing Culture',
        body: 'Centuries of hot spring bathing have made thermal pools the beating social heart of Icelandic culture.'
      },
      {
        title: 'Glacial Ice Caves',
        body: 'Step inside Vatnajökull into glowing sapphire chambers sculpted each season by meltwater and ancient pressurized ice.'
      }
    ],
    whenToGo: {
      recommendation: 'September to March for the Aurora Borealis; June and July for 24-hour Midnight Sun adventures.',
      seasons: [
        { name: 'Spring (Apr–May)', note: 'Snow begins to melt, migratory puffins arrive on cliff faces, and daylight lengthens rapidly.' },
        { name: 'Summer (Jun–Aug)', note: 'Endless daylight, access to the untamed central Highlands, and lush green mossy canyons.' },
        { name: 'Autumn (Sep–Oct)', note: 'First glimpses of Aurora against autumn colors; crisp, moody weather and fewer tourists.' },
        { name: 'Winter (Nov–Mar)', note: 'Peak Northern Lights viewing, snowmobile glacial expeditions, and cozy candlelit Nordic dining.' }
      ]
    },
    localNotes: [
      { label: 'Thermal Pool Hygiene', detail: 'Shower thoroughly without a bathing suit before entering any public geothermal pool.' },
      { label: 'Off-Road Driving', detail: 'Strictly prohibited; the sub-arctic moss can take over a century to regenerate from tire treads.' },
      { label: 'Layering', detail: 'Weather changes in minutes. Always wear merino wool base layers and a windproof outer shell.' }
    ]
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    climate: 'Mediterranean',
    travelStyles: ['Adventure', 'Nature', 'Food', 'Culture'],
    budget: 'Moderate',
    bestSeason: 'Summer',
    bestMonths: 'November to April',
    coordinates: { lat: -33.9249, lon: 18.4241 },
    shortDescription: 'Where dramatic ocean currents collide beneath the sandstone ramparts of Table Mountain.',
    heroImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2000&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    gridVariant: 'card-featured',
    editorialQuote: 'An untamed coastal metropolis defined by towering cliffs, legendary vintages, and wild Atlantic waves.',
    defaultWeather: {
      temp: 23,
      condition: 'Atlantic Breeze',
      feelsLike: 23,
      humidity: 58,
      wind: 18,
      visibility: '14 km',
      sunrise: '06:22',
      sunset: '19:10',
    },
    whyGo: [
      {
        title: 'Table Mountain Wilderness',
        body: 'One of the New7Wonders of Nature, housing the Cape Floral Kingdom—one of the richest floral biodiversity zones on Earth.'
      },
      {
        title: 'Cape Winelands Gastronomy',
        body: 'Stellenbosch and Franschhoek offer centuries-old Cape Dutch estates paired with avant-garde culinary creativity.'
      },
      {
        title: 'Two Ocean Encounters',
        body: 'From Boulders Beach penguin colonies to Chapman’s Peak marine drives, the coastal beauty is utterly staggering.'
      }
    ],
    whenToGo: {
      recommendation: 'December to March delivers dry, sunny Mediterranean beach weather; September to November offers whale watching.',
      seasons: [
        { name: 'Spring (Sep–Nov)', note: 'Fynbos blooms in full splendor, Southern Right whales breach along the coast, mild temperatures.' },
        { name: 'Summer (Dec–Feb)', note: 'Long sunlit days, world-class beach life in Clifton and Camps Bay, vibrant rooftop dining.' },
        { name: 'Autumn (Mar–May)', note: 'Golden vineyards in Franschhoek, gentle winds, and ideal conditions for hiking Table Mountain.' },
        { name: 'Winter (Jun–Aug)', note: 'Green mountains, occasional winter swells for surfers, and roaring hearths at historic wine farms.' }
      ]
    },
    localNotes: [
      { label: 'Mountain Weather', detail: 'The "Tablecloth" cloud can roll in within twenty minutes; carry warm layers even on sunny hikes.' },
      { label: 'Local Tipping', detail: 'A tip of 10–15% is customary at restaurants and for parking attendants.' },
      { label: 'Sunset Ritual', detail: 'Joining locals atop Lion’s Head or Signal Hill for sundowners is an essential Cape Town tradition.' }
    ]
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    country: 'India',
    region: 'Asia',
    climate: 'Arid',
    travelStyles: ['Culture', 'Architecture', 'Relaxation', 'Food'],
    budget: 'Premium',
    bestSeason: 'Winter',
    bestMonths: 'October to March',
    coordinates: { lat: 24.5854, lon: 73.7125 },
    shortDescription: 'The City of Lakes: marble palaces floating like mirages over glistening waters beneath the Aravalli Hills.',
    heroImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=2000&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
    gridVariant: 'card-tall',
    editorialQuote: 'A royal poem carved in white marble and mirror mosaics, reflected upon shimmering Lake Pichola.',
    defaultWeather: {
      temp: 28,
      condition: 'Golden Haze',
      feelsLike: 29,
      humidity: 42,
      wind: 11,
      visibility: '8 km',
      sunrise: '06:20',
      sunset: '18:45',
    },
    whyGo: [
      {
        title: 'Floating Marble Palaces',
        body: 'The Taj Lake Palace and Jag Mandir rise effortlessly from Lake Pichola, glowing like illuminated lanterns at dusk.'
      },
      {
        title: 'Living Mewar Heritage',
        body: 'The colossal City Palace complex preserves centuries of Rajput royal history, miniature paintings, and stained-glass courtyards.'
      },
      {
        title: 'Artisan Haveli Traditions',
        body: 'Navigate winding old-quarter lanes filled with master miniature painters, silver filigree workers, and rooftop spice-scented cafes.'
      }
    ],
    whenToGo: {
      recommendation: 'October to March offers dry, pleasantly warm days and cool desert evenings perfect for boat excursions.',
      seasons: [
        { name: 'Monsoon (Jul–Sep)', note: 'Lakes fill to their brim, surrounding Aravalli hills turn emerald green, and romance is peak.' },
        { name: 'Winter (Oct–Mar)', note: 'Crisp evenings, warm afternoon sun, royal cultural festivals, and optimal palace sightseeing.' },
        { name: 'Summer (Apr–Jun)', note: 'Intense Rajasthani heat with temperatures exceeding 40°C; best experienced in shaded palaces.' }
      ]
    },
    localNotes: [
      { label: 'Boat Timing', detail: 'Take the sunset boat cruise from Rameshwar Ghat to watch the palace facades catch the last ember rays.' },
      { label: 'Palace Dress', detail: 'Dress modestly when entering temple precincts such as Jagdish Temple; slip-on shoes are practical.' },
      { label: 'Rooftop Dining', detail: 'Reserve a lake-facing terrace in Lal Ghat for panoramic nocturnal views of illuminated palace walls.' }
    ]
  },
  {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    region: 'Europe',
    climate: 'Mediterranean',
    travelStyles: ['Architecture', 'Food', 'Culture'],
    budget: 'Moderate',
    bestSeason: 'Spring',
    bestMonths: 'April to June & September to October',
    coordinates: { lat: 38.7223, lon: -9.1393 },
    shortDescription: 'City of Seven Hills draped in ceramic azulejos, melancholic Fado music, and Atlantic golden light.',
    heroImage: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=2000&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=1200&auto=format&fit=crop',
    gridVariant: 'card-wide',
    editorialQuote: 'A sun-drenched terrace overlooking the Tagus estuary where nostalgia and reinvention share a table.',
    defaultWeather: {
      temp: 22,
      condition: 'Atlantic Bright',
      feelsLike: 22,
      humidity: 60,
      wind: 15,
      visibility: '12 km',
      sunrise: '06:55',
      sunset: '20:10',
    },
    whyGo: [
      {
        title: 'The Luminosity of the Tagus',
        body: 'Renowned among painters and cinematographers, Lisbon’s unique chalkstone pavements reflect a blindingly clear Atlantic light.'
      },
      {
        title: 'Soul-Stirring Fado Nights',
        body: 'Taverns in Alfama and Mouraria resonate with acoustic Portuguese guitars and mournful ballads of longing (saudade).'
      },
      {
        title: 'Pastry and Wine Artistry',
        body: 'From warm flaky Pastéis de Belém dusted with cinnamon to natural Vinho Verde served with grilled coastal sardines.'
      }
    ],
    whenToGo: {
      recommendation: 'May and June feature warm weather and the spirited Festas de Lisboa festival street parties.',
      seasons: [
        { name: 'Spring (Mar–May)', note: 'Jacaranda trees bloom in lavender clouds across squares; pleasant walking weather.' },
        { name: 'Summer (Jun–Aug)', note: 'Lively outdoor dining, beach escapes to Cascais and Sintra, warm Atlantic evenings.' },
        { name: 'Autumn (Sep–Nov)', note: 'Roasted chestnut vendors on street corners; golden lighting and comfortable mild temperatures.' },
        { name: 'Winter (Dec–Feb)', note: 'One of mainland Europe’s mildest winters; peaceful cobbled alleys and cozy wine bars.' }
      ]
    },
    localNotes: [
      { label: 'Calçada Shoes', detail: 'The iconic black-and-white limestone paving is beautiful but slick; wear textured flat soles.' },
      { label: 'Tram 28 Alternative', detail: 'Tram 28 gets packed; Tram 12 or simply walking Alfama’s alleys often yields richer discoveries.' },
      { label: 'Miradouros', detail: 'Every hill features a miradouro (viewpoint) with a small kiosk serving espresso and local wine.' }
    ]
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    climate: 'Tropical',
    travelStyles: ['Relaxation', 'Nature', 'Culture', 'Adventure'],
    budget: 'Moderate',
    bestSeason: 'Summer',
    bestMonths: 'April to October',
    coordinates: { lat: -8.4095, lon: 115.1889 },
    shortDescription: 'The Island of the Gods: sculpted emerald rice terraces, cliffside temples, and holistic jungle sanctuaries.',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop',
    gridVariant: 'card-tall',
    editorialQuote: 'Where daily offerings of frangipani and incense celebrate harmony between humanity and nature.',
    defaultWeather: {
      temp: 29,
      condition: 'Tropical Warmth',
      feelsLike: 33,
      humidity: 78,
      wind: 10,
      visibility: '10 km',
      sunrise: '06:05',
      sunset: '18:22',
    },
    whyGo: [
      {
        title: 'Spiritual Subak Landscapes',
        body: 'Centuries-old UNESCO-protected cooperative water temple networks feed cascading green rice terraces in Jatiluwih.'
      },
      {
        title: 'Uluwatu Clifftop Dramatics',
        body: 'Perched 70 meters above churning Indian Ocean swells, watch the hypnotic Kecak fire trance dance at sunset.'
      },
      {
        title: 'Holistic Mind-Body Sanctuaries',
        body: 'Ubud’s rainforest valleys cradle world-renowned traditional healing, Ayurvedic wellness, and farm-to-table cuisine.'
      }
    ],
    whenToGo: {
      recommendation: 'May to September offers the dry season with low humidity, gentle coastal breezes, and clear diving visibility.',
      seasons: [
        { name: 'Dry Season (Apr–Oct)', note: 'Sunny, breezy days ideal for surfing on the Bukit Peninsula, trekking Mount Batur, and temple festivals.' },
        { name: 'Wet Season (Nov–Mar)', note: 'Intense afternoon tropical downpours followed by quiet evenings; lush emerald scenery and fewer crowds.' }
      ]
    },
    localNotes: [
      { label: 'Temple Sarong', detail: 'Entering any pura requires wearing a sarong and sash (selendang), available at temple entrances.' },
      { label: 'Canang Sari', detail: 'Small woven palm-leaf offering baskets rest on sidewalks; step around them with care and respect.' },
      { label: 'Silent Day (Nyepi)', detail: 'If visiting in March during Nyepi, the entire island halts: no lights, no flights, no street movement for 24 hours.' }
    ]
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Europe',
    climate: 'Arctic/Alpine',
    travelStyles: ['Adventure', 'Nature', 'Relaxation', 'Architecture'],
    budget: 'Ultra-Luxury',
    bestSeason: 'Winter',
    bestMonths: 'December to March (Skiing) & June to September (Alpine Hiking)',
    coordinates: { lat: 46.5601, lon: 7.9897 },
    shortDescription: 'Granite spires piercing eternal glaciers, alpine meadows, and timeless wooden chalet hamlets.',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2000&auto=format&fit=crop',
    cardImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
    gridVariant: 'card-featured',
    editorialQuote: 'Crystalline air and the silent majesty of peaks carved by prehistoric ice sheets.',
    defaultWeather: {
      temp: 8,
      condition: 'Alpine Clarity',
      feelsLike: 6,
      humidity: 52,
      wind: 14,
      visibility: '25 km',
      sunrise: '06:18',
      sunset: '19:40',
    },
    whyGo: [
      {
        title: 'The Legendary Matterhorn',
        body: 'The near-symmetrical pyramid summit stands as the ultimate icon of the mountaineering imagination.'
      },
      {
        title: 'Mastery of Panoramic Rail',
        body: 'The Glacier Express and Bernina Express wind through spiral tunnels, viaducts, and sheer glacial precipices with cinematic grace.'
      },
      {
        title: 'High-Altitude Serenity',
        body: 'Car-free villages like Zermatt and Wengen preserve tranquil alpine acoustic environments paired with five-star spa indulgence.'
      }
    ],
    whenToGo: {
      recommendation: 'January to March for powder snow; July to September for high-altitude wildflower passes and mirror-lake hiking.',
      seasons: [
        { name: 'Spring (Apr–May)', note: 'Valley wildflowers bloom while peaks remain snowcapped; serene shoulder season.' },
        { name: 'Summer (Jun–Aug)', note: 'Alpine huts open, trail networks clear of snow, cable cars access 3,000m+ ridges.' },
        { name: 'Autumn (Sep–Nov)', note: 'Golden larch forests ignite the Engadin valley, crisp mountain air, and uncrowded trains.' },
        { name: 'Winter (Dec–Mar)', note: 'World-class downhill skiing, cozy fondue chalets, and snow-draped storybook villages.' }
      ]
    },
    localNotes: [
      { label: 'Swiss Travel Pass', detail: 'Provides seamless access to trains, lake steamers, and most scenic regional routes.' },
      { label: 'Trail Markers', detail: 'Yellow signs indicate easy walking trails; red-and-white signs denote alpine mountain routes requiring hiking boots.' },
      { label: 'Quiet Hours', detail: 'Village quiet hours (Ruhezeit) starting at 22:00 are strictly observed across Swiss cantons.' }
    ]
  }
];

export const DESTINATIONS = [...FORMATTED_INDIA_DESTINATIONS, ...BASE_DESTINATIONS];

export const REGIONS = ['All', 'Asia', 'Europe', 'Africa', 'Americas'];
export const CLIMATES = ['All', 'Temperate', 'Mediterranean', 'Arctic/Alpine', 'Tropical', 'Arid'];
export const TRAVEL_STYLES = ['All', 'Culture', 'Architecture', 'Nature', 'Adventure', 'Food', 'Relaxation'];
export const BUDGET_LEVELS = ['All', 'Moderate', 'Premium', 'Ultra-Luxury'];
export const SEASONS = ['All', 'Spring', 'Summer', 'Autumn', 'Winter'];
