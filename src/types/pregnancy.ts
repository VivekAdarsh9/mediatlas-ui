// --- Pregnancy Guide API Response ---
export interface PregnancyHero {
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

export interface PregnancyWeek {
  week: number;
  sizeComparison: string;
  title: string;
  description: string;
  progress: number; // 0–100, percent of pregnancy completed
}

export interface PregnancyKeyTakeaways {
  title: string;
  items: string[];
}

export interface PregnancyWellnessImage {
  src: string;
  alt: string;
}

export interface PregnancyWellness {
  nutrition: {
    title: string;
    description: string;
    linkLabel: string;
    href: string;
    image: PregnancyWellnessImage;
  };
  careSchedule: {
    title: string;
    description: string;
    ctaLabel: string;
  };
  mentalHealth: {
    title: string;
    description: string;
    linkLabel: string;
    href: string;
  };
  activity: {
    title: string;
    description: string;
    tags: string[];
    image: PregnancyWellnessImage;
  };
}

export interface PregnancyGuide {
  hero: PregnancyHero;
  currentWeek: number;
  weeks: PregnancyWeek[];
  keyTakeaways: PregnancyKeyTakeaways;
  wellness: PregnancyWellness;
  referencesUpdated: string;
}
