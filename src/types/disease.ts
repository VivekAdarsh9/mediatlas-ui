// --- List API Response ---
export interface DiseaseListItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
}

// --- Detail API Response ---
export interface DiseaseSymptom {
  icon: string;
  title: string;
  description: string;
}

export interface RiskFactor {
  label: string;
  description: string;
}

export interface TreatmentStep {
  step: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface RelatedTopic {
  title: string;
  href: string;
}

export interface QuickSummary {
  primarySymptoms: string;
  commonTreatments: string;
  riskFactors: string;
}

export interface DiseaseSection {
  id: string;
  label: string;
}

export interface DiseaseDetail {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  reviewDate: string;
  sections: DiseaseSection[];
  quickSummary: QuickSummary;
  overview: string[];
  symptoms: DiseaseSymptom[];
  causes: {
    biological: string;
    riskFactors: RiskFactor[];
  };
  treatment: TreatmentStep[];
  faq: FAQ[];
  relatedTopics: RelatedTopic[];
}
