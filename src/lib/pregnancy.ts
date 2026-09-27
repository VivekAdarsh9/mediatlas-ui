import type { PregnancyGuide } from '@/types/pregnancy';

// Mock data imports
import pregnancyGuide from '@/data/mock/pregnancy-guide.json';

// In a real app, this would be a fetch call to your API
export const fetchPregnancyGuide = async (): Promise<PregnancyGuide> => {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/pregnancy/guide`);
  return pregnancyGuide as PregnancyGuide;
};
