export type Mood = "happy" | "stressed" | "confident";
export type Environment = "hot" | "cold" | "mild";
export type Occasion = "work" | "party" | "casual";
export type TimeOfDay = "morning" | "afternoon" | "night";

export interface FragranceNote {
  name: string;
  category: string;
  intensity: number; // 0-100
}

export interface OlfactoryProfile {
  topNotes: FragranceNote[];
  heartNotes: FragranceNote[];
  baseNotes: FragranceNote[];
  intensity: number;
  personality: string;
  description: string;
  scentName: string;
  color: string;
}

const noteDatabase: Record<string, FragranceNote[]> = {
  citrus: [
    { name: "Bergamot", category: "citrus", intensity: 70 },
    { name: "Yuzu", category: "citrus", intensity: 60 },
    { name: "Blood Orange", category: "citrus", intensity: 75 },
  ],
  floral: [
    { name: "Jasmine", category: "floral", intensity: 65 },
    { name: "Rose Absolute", category: "floral", intensity: 80 },
    { name: "Neroli", category: "floral", intensity: 55 },
  ],
  woody: [
    { name: "Sandalwood", category: "woody", intensity: 85 },
    { name: "Cedarwood", category: "woody", intensity: 70 },
    { name: "Oud", category: "woody", intensity: 95 },
  ],
  spicy: [
    { name: "Saffron", category: "spicy", intensity: 80 },
    { name: "Pink Pepper", category: "spicy", intensity: 60 },
    { name: "Cardamom", category: "spicy", intensity: 65 },
  ],
  fresh: [
    { name: "Sea Salt", category: "fresh", intensity: 50 },
    { name: "Green Tea", category: "fresh", intensity: 45 },
    { name: "Mint", category: "fresh", intensity: 55 },
  ],
  amber: [
    { name: "Amber", category: "amber", intensity: 90 },
    { name: "Vanilla Bourbon", category: "amber", intensity: 75 },
    { name: "Tonka Bean", category: "amber", intensity: 70 },
  ],
};

const personalities: Record<string, { name: string; description: string; color: string }> = {
  "happy-hot-party": {
    name: "Luminous Rebel",
    description: "A daring, electrifying presence that commands every room. Your scent radiates warmth and charisma.",
    color: "#D4A030",
  },
  "happy-cold-work": {
    name: "Silk Architect",
    description: "Refined precision meets quiet joy. Your fragrance builds confidence through understated elegance.",
    color: "#C4A882",
  },
  "happy-mild-casual": {
    name: "Golden Hour",
    description: "Effortless warmth and natural charm. You carry the softness of sunlight on skin.",
    color: "#E8C878",
  },
  "stressed-hot-work": {
    name: "Calm Authority",
    description: "A grounding force amidst chaos. Cool composure wrapped in quiet sophistication.",
    color: "#8B9A7E",
  },
  "stressed-cold-casual": {
    name: "Velvet Shelter",
    description: "A cocoon of comfort and serenity. Rich, enveloping warmth that soothes the soul.",
    color: "#9B8B7A",
  },
  "stressed-mild-party": {
    name: "Release",
    description: "Liberation through fragrance. A captivating escape that transforms tension into allure.",
    color: "#B8A090",
  },
  "confident-hot-casual": {
    name: "Solar Crown",
    description: "Unapologetic radiance. A bold, sun-kissed signature that leaves an unforgettable trail.",
    color: "#DAA520",
  },
  "confident-cold-party": {
    name: "Midnight Sovereign",
    description: "Magnetic intensity under midnight skies. Power, mystery, and absolute presence.",
    color: "#A08050",
  },
  "confident-mild-work": {
    name: "The Curator",
    description: "Measured excellence in every note. An intellectual fragrance for those who lead with vision.",
    color: "#C0B090",
  },
};

function getKey(mood: Mood, env: Environment, occasion: Occasion): string {
  return `${mood}-${env}-${occasion}`;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateProfile(mood: Mood, env: Environment, occasion: Occasion): OlfactoryProfile {
  const key = getKey(mood, env, occasion);
  const personality = personalities[key] || {
    name: "Ethereal Signature",
    description: "A unique, ever-evolving essence crafted from your distinct identity.",
    color: "#C4A882",
  };

  const topCategories = mood === "happy" ? ["citrus", "fresh"] : mood === "stressed" ? ["fresh", "floral"] : ["spicy", "citrus"];
  const heartCategories = occasion === "party" ? ["floral", "spicy"] : occasion === "work" ? ["floral", "woody"] : ["floral", "fresh"];
  const baseCategories = env === "cold" ? ["amber", "woody"] : env === "hot" ? ["woody", "fresh"] : ["amber", "woody"];

  const topNotes = topCategories.map(c => pickRandom(noteDatabase[c]));
  const heartNotes = heartCategories.map(c => pickRandom(noteDatabase[c]));
  const baseNotes = baseCategories.map(c => pickRandom(noteDatabase[c]));

  const intensity = mood === "confident" ? 85 : mood === "happy" ? 65 : 50;

  return {
    topNotes,
    heartNotes,
    baseNotes,
    intensity,
    personality: personality.name,
    description: personality.description,
    scentName: personality.name,
    color: personality.color,
  };
}

export function getAdaptiveScent(profile: OlfactoryProfile, time: TimeOfDay): { notes: string[]; intensity: number; description: string } {
  if (time === "morning") {
    return {
      notes: profile.topNotes.map(n => n.name),
      intensity: Math.round(profile.intensity * 0.7),
      description: "Light and invigorating. The top notes lead with freshness to awaken your senses.",
    };
  }
  if (time === "afternoon") {
    return {
      notes: [...profile.topNotes.slice(0, 1), ...profile.heartNotes].map(n => n.name),
      intensity: profile.intensity,
      description: "Full expression. Heart notes bloom as the fragrance reaches its peak complexity.",
    };
  }
  return {
    notes: [...profile.heartNotes.slice(0, 1), ...profile.baseNotes].map(n => n.name),
    intensity: Math.round(profile.intensity * 1.15),
    description: "Deep and lingering. Base notes take center stage for an intimate, lasting presence.",
  };
}

export function generateInsights(mood: Mood, env: Environment, occasion: Occasion, profile: OlfactoryProfile): string[] {
  return [
    `Based on your ${mood} mood, we selected ${profile.topNotes[0].name} as your leading note for its ${mood === "happy" ? "uplifting" : mood === "stressed" ? "calming" : "empowering"} properties.`,
    `The ${env} environment influenced our choice of ${profile.baseNotes[0].name}, which ${env === "hot" ? "provides cooling depth" : env === "cold" ? "adds enveloping warmth" : "offers balanced versatility"}.`,
    `For your ${occasion} context, ${profile.heartNotes[0].name} was chosen to ${occasion === "work" ? "project quiet confidence" : occasion === "party" ? "enhance your magnetic presence" : "complement your natural ease"}.`,
    `Your intensity level of ${profile.intensity}% ensures the fragrance ${profile.intensity > 70 ? "makes a statement without overwhelming" : "creates an intimate, personal aura"}.`,
  ];
}

export const evolutionData = [
  { day: "Mon", top: 80, heart: 40, base: 20 },
  { day: "Tue", top: 70, heart: 55, base: 30 },
  { day: "Wed", top: 65, heart: 60, base: 40 },
  { day: "Thu", top: 60, heart: 70, base: 50 },
  { day: "Fri", top: 75, heart: 65, base: 35 },
  { day: "Sat", top: 85, heart: 50, base: 25 },
  { day: "Sun", top: 55, heart: 75, base: 60 },
];
