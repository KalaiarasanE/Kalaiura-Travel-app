/* ==============================================================================
   AERORA — FAMOUS PLACES & MONUMENTS REPOSITORY
   Curated landmarks, architectural wonders, and sanctuaries
   ============================================================================== */

export const PLACES = [
  // --- INDIA LANDMARKS ---
  {
    id: 'alleppey-houseboats',
    destinationId: 'kerala',
    destinationName: 'Kerala',
    name: 'Alleppey Backwater Canals',
    category: 'Water Sanctuary',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
    description: 'Drifting on a teakwood kettuvallam through emerald lotus lagoons, flanked by towering coconut palms and quiet fishing villages.',
    recommendedDuration: 'Overnight / 2 Days',
    bestTime: 'Sunset & Early Dawn',
    location: 'Alappuzha, Kerala',
    highlights: ['Vembanad Lake', 'Vennattukad Village', 'Kumarakom Bird Sanctuary']
  },
  {
    id: 'amber-fort',
    destinationId: 'rajasthan',
    destinationName: 'Rajasthan',
    name: 'Amber Palace & Fort',
    category: 'Royal Rajput Citadel',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop',
    description: 'Golden yellow sandstone ramparts reflected in Maota Lake, adorned with mirror-mosaic Sheesh Mahal courtyards.',
    recommendedDuration: '3 Hours',
    bestTime: 'Early Morning (08:00)',
    location: 'Amer, Jaipur, Rajasthan',
    highlights: ['Sheesh Mahal Mirror Hall', 'Ganesh Pol Gate', 'Maota Lake Reflection']
  },
  {
    id: 'dal-lake-shikaras',
    destinationId: 'kashmir',
    destinationName: 'Kashmir',
    name: 'Dal Lake & Floating Gardens',
    category: 'Alpine Lake Sanctuary',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1200&auto=format&fit=crop',
    description: 'Hand-carved wooden Shikaras gliding past floating lotus blooms and century-old cedar houseboats beneath snowy Himalayan crests.',
    recommendedDuration: '2.5 Hours',
    bestTime: 'Sunrise (06:00)',
    location: 'Srinagar, Jammu & Kashmir',
    highlights: ['Floating Flower Market', 'Char Chinar Island', 'Nigeen Lake Channel']
  },
  {
    id: 'hampi-stone-chariot',
    destinationId: 'karnataka',
    destinationName: 'Karnataka',
    name: 'Vittala Stone Chariot',
    category: 'Imperial Dravidian Architecture',
    image: 'https://images.unsplash.com/photo-1600100397608-f010f443b74d?q=80&w=1200&auto=format&fit=crop',
    description: 'A monolithic 15th-century shrine sculpted from solid granite boulders representing the mythical carriage of Garuda.',
    recommendedDuration: '2 Hours',
    bestTime: 'Golden Hour (16:30 – 18:00)',
    location: 'Hampi, Karnataka',
    highlights: ['Stone Chariot', 'Musical Pillars Hall', 'Tungabhadra River Bank']
  },
  {
    id: 'double-decker-bridge',
    destinationId: 'meghalaya',
    destinationName: 'Meghalaya',
    name: 'Double Decker Living Root Bridge',
    category: 'Bio-Engineering Wonder',
    image: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=1200&auto=format&fit=crop',
    description: 'Generations of Khasi tribesmen guiding rubber tree roots across deep rainforest gorges to create living two-tier pedestrian bridges.',
    recommendedDuration: 'Full Day Trek',
    bestTime: 'October to April',
    location: 'Nongriat, Cherrapunji, Meghalaya',
    highlights: ['Two-Tier Root Arcs', 'Turquoise River Pools', 'Nongriat Rainforest']
  },

  // --- KYOTO ---
  {
    id: 'fushimi-inari',
    destinationId: 'kyoto',
    destinationName: 'Kyoto',
    name: 'Fushimi Inari Taisha',
    category: 'Sacred Shinto Shrine',
    image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=1200&auto=format&fit=crop',
    description: 'A labyrinth of over ten thousand vermilion torii gates winding through sacred cedar groves up the wooded mountain of Inari.',
    recommendedDuration: '2.5 – 3.5 Hours',
    bestTime: 'Dawn (06:30) or Post-Dusk with lanterns',
    location: 'Fushimi Ward, Kyoto',
    highlights: ['Senbon Torii', 'Fox Messenger Sculptures', 'Yotsutsuji Vista Point']
  },
  {
    id: 'kiyomizu-dera',
    destinationId: 'kyoto',
    destinationName: 'Kyoto',
    name: 'Kiyomizu-dera',
    category: 'Historic Wooden Temple',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    description: 'Perched on Mount Otowa, this 1,200-year-old wooden main hall was built entirely without a single nail, commanding panoramic valley vistas.',
    recommendedDuration: '2 Hours',
    bestTime: 'Early Morning or Sunset',
    location: 'Higashiyama Ward, Kyoto',
    highlights: ['Wooden Stage', 'Otowa Waterfall', 'Jishu Shrine']
  },
  {
    id: 'arashiyama-bamboo',
    destinationId: 'kyoto',
    destinationName: 'Kyoto',
    name: 'Arashiyama Bamboo Grove',
    category: 'Natural Sanctuary',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop',
    description: 'Towering emerald stalks sway in gentle mountain breezes, generating one of the Ministry of the Environment’s 100 Soundscapes of Japan.',
    recommendedDuration: '1.5 Hours',
    bestTime: '07:00 – 08:30 AM before tour crowds',
    location: 'Ukyo Ward, Kyoto',
    highlights: ['Bamboo Pathway', 'Tenryu-ji Zen Garden', 'Okochi Sanso Villa']
  },
  {
    id: 'gion-shirakawa',
    destinationId: 'kyoto',
    destinationName: 'Kyoto',
    name: 'Gion Shirakawa Canal',
    category: 'Preserved Historic District',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
    description: 'Stone-flagged paths alongside weeping willows and wooden ochaya tea houses, illuminated by soft amber paper lanterns.',
    recommendedDuration: '2 Hours',
    bestTime: 'Blue Hour (18:00 – 20:00)',
    location: 'Gion, Kyoto',
    highlights: ['Willow-lined Canal', 'Machiya Wooden Facades', 'Traditional Tea Houses']
  },

  // --- SANTORINI ---
  {
    id: 'oia-caldera-rim',
    destinationId: 'santorini',
    destinationName: 'Santorini',
    name: 'Oia Blue Dome Chapels',
    category: 'Cycladic Architecture',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop',
    description: 'The archetype of Greek Aegean elegance: stark white lime-washed walls, cerulean domes, and dramatic plunge into the caldera.',
    recommendedDuration: '2 Hours',
    bestTime: 'Golden Hour (1 hour prior to sunset)',
    location: 'Oia Village, Northern Santorini',
    highlights: ['Agios Spyridon Domes', 'Byzantine Castle Ruins', 'Amoudi Bay Descent']
  },
  {
    id: 'akrotiri-prehistoric',
    destinationId: 'santorini',
    destinationName: 'Santorini',
    name: 'Prehistoric Akrotiri Ruins',
    category: 'Bronze Age Archaeological Site',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
    description: 'The "Minoan Pompeii," remarkably preserved beneath volcanic pumice since 1600 BC, featuring multi-story stone residences and frescoes.',
    recommendedDuration: '2.5 Hours',
    bestTime: 'Morning (09:00 – 11:30)',
    location: 'Akrotiri Peninsula',
    highlights: ['Multi-story Buildings', 'Advanced Drainage System', 'Volcanic Ash Preservations']
  },
  {
    id: 'imerovigli-skaros',
    destinationId: 'santorini',
    destinationName: 'Santorini',
    name: 'Skaros Rock Fortress',
    category: 'Volcanic Vista & Trail',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1200&auto=format&fit=crop',
    description: 'A conical volcanic promontory jutting boldly into the sea, holding the evocative remnants of a medieval Venetian capital.',
    recommendedDuration: '2 Hours',
    bestTime: 'Late Afternoon',
    location: 'Imerovigli, Santorini',
    highlights: ['The Balcony of the Aegean', 'Panagia Theoskepasti Chapel', '360° Caldera View']
  },

  // --- REYKJAVIK & FJORDS ---
  {
    id: 'hallgrimskirkja',
    destinationId: 'reykjavik',
    destinationName: 'Reykjavik & The Fjords',
    name: 'Hallgrímskirkja Cathedral',
    category: 'Expressionist Architecture',
    image: 'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=1200&auto=format&fit=crop',
    description: 'Guðjón Samúelsson’s masterpiece inspired by Iceland’s natural basalt lava columns, soaring 74 meters above the harbor.',
    recommendedDuration: '1 Hour',
    bestTime: 'Midday for bell tower observation',
    location: 'Central Reykjavik',
    highlights: ['Basalt-inspired Facade', '5275-pipe Concert Organ', 'Panoramic Harbor Deck']
  },
  {
    id: 'thingvellir-silfra',
    destinationId: 'reykjavik',
    destinationName: 'Reykjavik & The Fjords',
    name: 'Thingvellir & Silfra Fissure',
    category: 'Tectonic National Park',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop',
    description: 'The rift valley separating North American and Eurasian tectonic plates, home to the ancient Alþingi parliament and crystal glacial water.',
    recommendedDuration: '3 – 4 Hours',
    bestTime: 'Morning Light (10:00 – 13:00)',
    location: 'Golden Circle Region',
    highlights: ['Tectonic Continental Divide', 'Öxarárfoss Waterfall', 'Silfra Snorkel Canyon']
  },
  {
    id: 'gullfoss-falls',
    destinationId: 'reykjavik',
    destinationName: 'Reykjavik & The Fjords',
    name: 'Gullfoss Golden Waterfall',
    category: 'Glacial Cataract',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
    description: 'A roaring two-tiered cascade plunging 32 meters into a sheer canyon carved by the Hvítá glacial river.',
    recommendedDuration: '1.5 Hours',
    bestTime: 'Early Afternoon (when rainbows emerge in spray)',
    location: 'Haukadalur, Iceland',
    highlights: ['Double Tier Drop', 'Hvítá Canyon Viewpoint', 'Sigríður Memorial Walk']
  },

  // --- CAPE TOWN ---
  {
    id: 'table-mountain-summit',
    destinationId: 'cape-town',
    destinationName: 'Cape Town',
    name: 'Table Mountain Plateau',
    category: 'Natural Monument',
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop',
    description: 'A flat-topped geological icon elevated 1,086 meters above sea level, hosting rare endemic flora and sweeping Atlantic horizons.',
    recommendedDuration: '3 Hours',
    bestTime: '08:00 AM or 17:30 PM (clear weather)',
    location: 'Table Mountain National Park',
    highlights: ['Rotating Cableway', 'Maclear’s Beacon Trail', 'Cape Floral Fynbos']
  },
  {
    id: 'boulders-beach',
    destinationId: 'cape-town',
    destinationName: 'Cape Town',
    name: 'Boulders Beach Sanctuary',
    category: 'Coastal Wildlife Haven',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    description: 'Sheltered granite cove where a free-roaming colony of endangered African Penguins nest along porcelain-white sands.',
    recommendedDuration: '2 Hours',
    bestTime: 'Low Tide Morning',
    location: 'Simon’s Town, False Bay',
    highlights: ['African Penguin Boardwalk', 'Giant Granite Boulders', 'Calm Turquoise Cove']
  },
  {
    id: 'chapmans-peak-drive',
    destinationId: 'cape-town',
    destinationName: 'Cape Town',
    name: 'Chapman’s Peak Marine Drive',
    category: 'Cinematic Coastal Pass',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200&auto=format&fit=crop',
    description: 'One of the world’s most exhilarating coastal highways, carving through vertical rock face sheer above Hout Bay.',
    recommendedDuration: '2 Hours',
    bestTime: 'Sunset',
    location: 'Hout Bay to Noordhoek',
    highlights: ['114 Coastal Curves', 'Sheer Cliff Architecture', 'Whale Watching Lookouts']
  },

  // --- UDAIPUR ---
  {
    id: 'city-palace-udaipur',
    destinationId: 'udaipur',
    destinationName: 'Udaipur',
    name: 'Udaipur City Palace Complex',
    category: 'Royal Heritage Palace',
    image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1200&auto=format&fit=crop',
    description: 'Four centuries in the making: towering granite and marble pavilions overlooking Lake Pichola with inlaid mirror peacocks and courtyards.',
    recommendedDuration: '3 Hours',
    bestTime: 'Morning (09:00 – 12:00)',
    location: 'Old City, Udaipur',
    highlights: ['Mor Chowk Peacock Courtyard', 'Sheesh Mahal Glass Chamber', 'Rooftop Terrace Vistas']
  },
  {
    id: 'jag-mandir-island',
    destinationId: 'udaipur',
    destinationName: 'Udaipur',
    name: 'Jag Mandir Island Palace',
    category: 'Island Sanctuary',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
    description: 'The "Lake Garden Palace" constructed on an island in Lake Pichola, flanked by colossal stone guardian elephants.',
    recommendedDuration: '2 Hours',
    bestTime: 'Sunset Boat Arrival',
    location: 'Lake Pichola',
    highlights: ['Carved Marble Elephants', 'Gul Mahal Octagonal Pavilion', 'Sunset Reflection Bar']
  },
  {
    id: 'saheliyon-ki-bari',
    destinationId: 'udaipur',
    destinationName: 'Udaipur',
    name: 'Saheliyon-ki-Bari',
    category: 'Historic Royal Gardens',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
    description: 'A 300-year-old royal retreat designed for queens and their maidens, celebrated for marble lotus pools and rain fountains.',
    recommendedDuration: '1.5 Hours',
    bestTime: 'Late Afternoon',
    location: 'Saheli Marg, Udaipur',
    highlights: ['Gravity-Fed Fountains', 'Lotus Pools', 'Intricate Marble Kiosks']
  },

  // --- LISBON ---
  {
    id: 'belem-tower',
    destinationId: 'lisbon',
    destinationName: 'Lisbon',
    name: 'Torre de Belém',
    category: 'Manueline Maritime Fortress',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?q=80&w=1200&auto=format&fit=crop',
    description: 'A 16th-century ceremonial fortress on the Tagus River, decorated with stone ropes, armillary spheres, and Moorish watchtowers.',
    recommendedDuration: '1.5 Hours',
    bestTime: 'Late Afternoon',
    location: 'Belém Waterfront, Lisbon',
    highlights: ['Manueline Stonework', 'Governor’s Room', 'Tagus Estuary Lookout']
  },
  {
    id: 'jeronimos-monastery',
    destinationId: 'lisbon',
    destinationName: 'Lisbon',
    name: 'Jerónimos Monastery',
    category: 'Late Gothic Monastery',
    image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=1200&auto=format&fit=crop',
    description: 'A UNESCO treasure of lace-like limestone cloisters commemorating Vasco da Gama’s maritime voyage to the Orient.',
    recommendedDuration: '2.5 Hours',
    bestTime: 'Morning (10:00 – 12:00)',
    location: 'Praça do Império, Belém',
    highlights: ['Two-tiered Cloister', 'Vasco da Gama Tomb', 'Sculpted Marine Motifs']
  },
  {
    id: 'miradouro-santa-luzia',
    destinationId: 'lisbon',
    destinationName: 'Lisbon',
    name: 'Miradouro de Santa Luzia',
    category: 'Panoramic Azulejo Balcony',
    image: 'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?q=80&w=1200&auto=format&fit=crop',
    description: 'A bougainvillea-shaded pergola lined with blue azulejo tiles overlooking terracotta roofs of Alfama down to the blue river.',
    recommendedDuration: '1 Hour',
    bestTime: 'Morning Sunrise or Sunset',
    location: 'Alfama, Lisbon',
    highlights: ['Azulejo Historic Murals', 'Bougainvillea Pergola', 'View of Church of São Vicente de Fora']
  },

  // --- BALI ---
  {
    id: 'uluwatu-cliff-temple',
    destinationId: 'bali',
    destinationName: 'Bali',
    name: 'Pura Luhur Uluwatu',
    category: 'Clifftop Sea Temple',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
    description: 'Perched 70 meters directly above the Indian Ocean, guarding Bali from evil sea spirits alongside a sacred monkey forest.',
    recommendedDuration: '2.5 Hours',
    bestTime: '17:00 PM for the sunset Kecak Fire Dance',
    location: 'Bukit Peninsula, South Bali',
    highlights: ['Sheer Cliffdrop Views', 'Kecak Fire Chant amphitheater', 'Sacred Forest Pathway']
  },
  {
    id: 'jatiluwih-rice-terraces',
    destinationId: 'bali',
    destinationName: 'Bali',
    name: 'Jatiluwih Green Terraces',
    category: 'UNESCO Cultural Landscape',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1200&auto=format&fit=crop',
    description: 'Over 600 hectares of sweeping emerald rice paddies following the contours of Mount Batukaru, managed by the 9th-century Subak water cooperative.',
    recommendedDuration: '3 Hours',
    bestTime: 'Early Morning (08:00 – 10:30)',
    location: 'Tabanan Regency, Central Bali',
    highlights: ['Ancient Subak Canals', 'Endless Green Vistas', 'Quiet Bamboo Trekking Trails']
  },
  {
    id: 'tirta-empul',
    destinationId: 'bali',
    destinationName: 'Bali',
    name: 'Tirta Empul Holy Springs',
    category: 'Sacred Water Temple',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1200&auto=format&fit=crop',
    description: 'Founded in 962 AD, Balinese Hindus journey here for the Melukat purification ritual in crystalline mountain spring water spouts.',
    recommendedDuration: '2 Hours',
    bestTime: 'Morning (09:00)',
    location: 'Tampak Siring, Gianyar',
    highlights: ['Purification Bath Pools', 'Gushing Spring Sanctum', 'Jawa Candi Bentar Gates']
  },

  // --- SWISS ALPS ---
  {
    id: 'matterhorn-glacier-paradise',
    destinationId: 'swiss-alps',
    destinationName: 'Swiss Alps',
    name: 'Matterhorn Glacier Paradise',
    category: 'High-Alpine Summit Station',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop',
    description: 'Europe’s highest mountain cable station at 3,883 meters, featuring 38 mountain peaks over 4,000 meters and permanent ice palaces.',
    recommendedDuration: '4 Hours',
    bestTime: 'Morning before noon clouds build',
    location: 'Zermatt, Valais',
    highlights: ['Glacier Ice Palace', '360° Viewing Platform', 'Peak of Breithorn View']
  },
  {
    id: 'jungfraujoch-top-of-europe',
    destinationId: 'swiss-alps',
    destinationName: 'Swiss Alps',
    name: 'Jungfraujoch & Aletsch Glacier',
    category: 'Glacial Pass & Observatory',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
    description: 'The Sphinx Observatory perched above the Great Aletsch Glacier—the longest glacier in the European Alps stretching 23 kilometers.',
    recommendedDuration: '4 – 5 Hours',
    bestTime: 'Early Train Departure from Grindelwald',
    location: 'Bernese Oberland',
    highlights: ['Sphinx Observatory Terrace', 'Aletsch Ice Tongue', 'Alpine Sensation Tunnel']
  },
  {
    id: 'oeschinen-lake',
    destinationId: 'swiss-alps',
    destinationName: 'Swiss Alps',
    name: 'Oeschinensee Alpine Lake',
    category: 'Turquoise Mountain Lake',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    description: 'A mirror-like turquoise glacial lake fed by sheer waterfalls cascading directly from the snowfields of the Blüemlisalp massif.',
    recommendedDuration: '3 Hours',
    bestTime: 'Late Spring to Early Autumn',
    location: 'Kandersteg, Bernese Oberland',
    highlights: ['Reflective Turquoise Waters', 'Panorama Cliff Trail', 'Rowboat Solitude']
  }
];
