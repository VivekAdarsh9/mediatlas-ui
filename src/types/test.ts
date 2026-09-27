// --- List API Response ---
export interface TestListItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
}

// --- Detail API Response ---
export interface TestMeasure {
  name: string;
  description: string;
}

export interface TestProcedureStep {
  step: string;
  title: string;
  description: string;
}

export interface TestReferenceRange {
  parameter: string;
  typicalRange: string;
  units: string;
}

export interface TestInterpretation {
  low: string;
  high: string;
  notes?: string;
}

export interface TestRelatedTopic {
  title: string;
  href: string;
}

export interface TestSection {
  id: string;
  label: string;
}

export interface TestQuickSummary {
  primaryPurpose: string;
  whatItMeasures: string;
  preparation: string;
}

export interface TestDetail {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  reviewDate: string;
  resultTime?: string;
  specimen?: string;
  imageUrl?: string;
  sections: TestSection[];
  quickSummary: TestQuickSummary;
  overview: string[];
  measures: TestMeasure[];
  procedure: TestProcedureStep[];
  referenceRanges: TestReferenceRange[];
  interpretation: TestInterpretation;
  relatedTopics: TestRelatedTopic[];
}