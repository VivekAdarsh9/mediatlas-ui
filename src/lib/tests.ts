import type { TestListItem, TestDetail } from '@/types/test';

// Mock data imports
import testsList from '@/data/mock/tests-list.json';
import cbcDetail from '@/data/mock/test-detail-complete-blood-count.json';

const detailsMap: Record<string, TestDetail> = {
  'complete-blood-count': cbcDetail as TestDetail,
};

// In a real app, these would be fetch calls to your API
export const fetchAllTests = async (): Promise<TestListItem[]> => {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/tests`);
  return testsList as TestListItem[];
};

export const fetchTestBySlug = async (slug: string): Promise<TestDetail | null> => {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/tests/${slug}`);
  const test = testsList.find(test => test.slug === slug);
  if (!test) return null;

  return detailsMap[slug] ?? {
    ...test,
    reviewDate: 'Jan 2024',
    sections: [{ id: 'overview', label: 'Overview' }],
    quickSummary: {
      primaryPurpose: 'No detailed information available.',
      whatItMeasures: '',
      preparation: ''
    },
    overview: ['No detailed information available.'],
    measures: [],
    procedure: [],
    referenceRanges: [],
    interpretation: {
      low: '',
      high: '',
      notes: ''
    },
    relatedTopics: []
  } as TestDetail;
};

export const getAllTestSlugs = async (): Promise<string[]> => {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/tests/slugs`);
  return (testsList as TestListItem[]).map(test => test.slug);
};