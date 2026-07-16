/* ── Mega-menu data ──────────────────────────────────────────────────── */

export const REGIONS = [
  { label: "North India" },
  { label: "North East India" },
  { label: "East India" },
  { label: "Central India" },
  { label: "West India" },
  { label: "South India" },
];

export const DESTINATION_REGIONS = {
  "North India": [
    { name: "Himachal Pradesh", slug: "Himachal Pradesh" },
    { name: "Punjab", slug: "Punjab" },
    { name: "Dharamshala", slug: "dharamshala" },
    { name: "Haryana", slug: "Haryana" },
    { name: "Uttarakhand", slug: "Uttarakhand" },
    { name: "Uttar Pradesh", slug: "Uttar Pradesh" },
    { name: "Rajasthan", slug: "Rajasthan" },
  ],

  "North East India": [
    { name: "Arunachal Pradesh", slug: "Arunachal Pradesh" },
    { name: "Assam", slug: "Assam" },
    { name: "Manipur", slug: "Manipur" },
    { name: "Meghalaya", slug: "Meghalaya" },
    { name: "Mizoram", slug: "Mizoram" },
    { name: "Nagaland", slug: "Nagaland" },
    { name: "Tripura", slug: "Tripura" },
    { name: "Sikkim", slug: "Sikkim" },
  ],

  "East India": [
    { name: "West Bengal", slug: "West Bengal" },
    { name: "Bihar", slug: "Bihar" },
    { name: "Puri", slug: "puri" },
    { name: "Jharkhand", slug: "Jharkhand" },
    { name: "Odisha", slug: "Odisha" },
  ],

  "Central India": [
    { name: "Madhya Pradesh", slug: "Madhya Pradesh" },
    { name: "Chhattisgarh", slug: "Chhattisgarh" },
  ],

  "West India": [
    { name: "Maharashtra", slug: "Maharashtra" },
    { name: "Gujarat", slug: "Gujarat" },
    { name: "Goa", slug: "Goa" },
    { name: "Rajasthan", slug: "Rajasthan" },
  ],

  "South India": [
    { name: "Andhra Pradesh", slug: "Andhra Pradesh" },
    { name: "Karnataka", slug: "Karnataka" },
    { name: "Kerala", slug: "Kerala" },
    { name: "Tamil Nadu", slug: "Tamil Nadu" },
    { name: "Telangana", slug: "Telangana" },
  ],
};

export const ACTIVITIES_COLUMNS = [
  {
    heading: "Adventure",
    items: [
      { slug: "Trekking" },
      { slug: "Hiking" },
      { slug: "Camping" },
      { slug: "Rock Climbing" },
      { slug: "Rappelling" },
      { slug: "Caving" },
      { slug: "Bungee Jumping" },
      { slug: "Ziplining" },
      { slug: "Paragliding" },
      { slug: "ATV Ride" }
    ]
  },

  {
    heading: "Water Activities",
    items: [
      { slug: "Boating" },
      { slug: "River Cruise" },
      { slug: "Lake Cruise" },
      { slug: "Kayaking" },
      { slug: "Canoeing" },
      { slug: "Rafting" },
      { slug: "Jet Ski" },
      { slug: "Scuba Diving" },
      { slug: "Snorkeling" },
      { slug: "Parasailing" },
      { slug: "Surfing" },
      { slug: "Fishing" }
    ]
  },

  {
    heading: "Nature & Wildlife",
    items: [
      { slug: "Nature Walk" },
      { slug: "Wildlife Safari" },
      { slug: "Bird Watching" },
      { slug: "Photography" },
      { slug: "Stargazing" },
      { slug: "Sunrise View" },
      { slug: "Sunset View" },
      { slug: "Eco Tourism" }
    ]
  },

  {
    heading: "Culture & Heritage",
    items: [
      { slug: "Sightseeing" },
      { slug: "Walking Tour" },
      { slug: "Heritage Tour" },
      { slug: "Museum Visit" },
      { slug: "Temple Visit" },
      { slug: "Church Visit" },
      { slug: "Mosque Visit" },
      { slug: "Monastery Visit" },
      { slug: "Festival Experience" },
      { slug: "Cultural Show" }
    ]
  },

  {
    heading: "Family & Leisure",
    items: [
      { slug: "Park Visit" },
      { slug: "Picnic" },
      { slug: "Zoo Visit" },
      { slug: "Aquarium Visit" },
      { slug: "Planetarium Visit" },
      { slug: "Theme Park" },
      { slug: "Water Park" },
      { slug: "Children's Activity" }
    ]
  },

  {
    heading: "Food & Shopping",
    items: [
      { slug: "Food Experience" },
      { slug: "Street Food Tour" },
      { slug: "Tea Tasting" },
      { slug: "Wine Tasting" },
      { slug: "Shopping" },
      { slug: "Handicraft Workshop" },
      { slug: "Village Tour" }
    ]
  },

  {
    heading: "Winter & Snow",
    items: [
      { slug: "Snow Adventure" },
      { slug: "Skiing" },
      { slug: "Snowboarding" },
      { slug: "Ice Skating" }
    ]
  },

  {
    heading: "Transport Experiences",
    items: [
      { slug: "Toy Train Ride" },
      { slug: "Ropeway Ride" },
      { slug: "Jeep Safari" },
      { slug: "Camel Ride" },
      { slug: "Horse Riding" },
      { slug: "Elephant Ride" },
      { slug: "Helicopter Ride" },
      { slug: "Hot Air Balloon" }
    ]
  },

  {
    heading: "Wellness",
    items: [
      { slug: "Yoga Session" },
      { slug: "Meditation" },
      { slug: "Spa" },
      { slug: "Ayurveda" },
      { slug: "Wellness Retreat" }
    ]
  }
];

export const EXPERIENCES_COLUMNS = [
  {
    heading: "Local Life Experiences",
    items: [
      { title: "Village Life Experience" },
      { title: "Farm Stay Experience" },
      { title: "Local Market Exploration" },
      { title: "Traditional Lifestyle Experience" },
      { title: "Community Interaction" },
      { title: "Rural Tourism Experience" }
    ]
  },

  {
    heading: "Food & Culinary Experiences",
    items: [
      { title: "Authentic Local Cuisine" },
      { title: "Traditional Cooking Experience" },
      { title: "Regional Food Trail" },
      { title: "Heritage Dining Experience" },
      { title: "Local Tea Culture Experience" },
      { title: "Tribal Food Experience" }
    ]
  },

  {
    heading: "Spiritual Experiences",
    items: [
      { title: "Spiritual Retreat" },
      { title: "Pilgrimage Journey" },
      { title: "Temple Ritual Experience" },
      { title: "Monastic Living Experience" },
      { title: "Sacred River Experience" },
      { title: "Devotional Experience" }
    ]
  },

  {
    heading: "Cultural Experiences",
    items: [
      { title: "Folk Culture Experience" },
      { title: "Traditional Music Experience" },
      { title: "Traditional Dance Experience" },
      { title: "Royal Heritage Experience" },
      { title: "Artisan Craft Experience" },
      { title: "Festival Celebration Experience" }
    ]
  },

  {
    heading: "Nature Experiences",
    items: [
      { title: "Mountain Escape" },
      { title: "Forest Immersion" },
      { title: "Tea Garden Experience" },
      { title: "Desert Experience" },
      { title: "Island Experience" },
      { title: "Backwater Experience" }
    ]
  },

  {
    heading: "Luxury Experiences",
    items: [
      { title: "Luxury Train Journey" },
      { title: "Palace Stay Experience" },
      { title: "Heritage Hotel Experience" },
      { title: "Luxury Houseboat Experience" },
      { title: "Glamping Experience" },
      { title: "Premium Resort Experience" }
    ]
  },

  {
    heading: "Wildlife Experiences",
    items: [
      { title: "Tiger Territory Experience" },
      { title: "Jungle Immersion" },
      { title: "Birding Experience" },
      { title: "Wetland Exploration Experience" },
      { title: "Conservation Experience" }
    ]
  },

  {
    heading: "Mountain Experiences",
    items: [
      { title: "Himalayan Experience" },
      { title: "Snow Village Experience" },
      { title: "High Altitude Experience" },
      { title: "Valley Experience" },
      { title: "Mountain Sunrise Experience" }
    ]
  },

  {
    heading: "Coastal Experiences",
    items: [
      { title: "Beach Lifestyle Experience" },
      { title: "Coastal Village Experience" },
      { title: "Island Hopping Experience" },
      { title: "Lighthouse Experience" },
      { title: "Seaside Sunset Experience" }
    ]
  },

  {
    heading: "Unique India Experiences",
    items: [
      { title: "Houseboat Living Experience" },
      { title: "Toy Train Journey Experience" },
      { title: "Desert Camp Experience" },
      { title: "Tribal Heritage Experience" },
      { title: "Border Ceremony Experience" },
      { title: "Royal Rajasthan Experience" },
      { title: "Kerala Backwaters Experience" },
      { title: "Heritage Walk Along The Ridge & Mall Road" }
    ]
  }
];