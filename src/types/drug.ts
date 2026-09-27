// --- List API Response ---
export interface DrugListItem {
  id: string;
  slug: string;
  name: string;
  genericName: string;
  description: string;
  drugClass: string;
  tags: string[];
  category: string;
}

// --- Detail API Response ---
export interface DrugDosage {
  condition: string;
  startingDose: string;
  maxDose: string;
}

export interface DrugSideEffect {
  icon: string;
  title: string;
  description: string;
}

export interface DrugInteraction {
  substance: string;
  description: string;
}

export interface DrugWarning {
  severity: "critical" | "serious";
  title: string;
  description: string;
}

export interface DrugUse {
  condition: string;
  description: string;
}

export interface DrugSection {
  id: string;
  label: string;
}

export interface DrugDetail {
  id: string;
  slug: string;
  name: string;
  genericName: string;
  form: string;
  description: string;
  tags: string[];
  reviewDate: string;
  sections: DrugSection[];
  uses: DrugUse[];
  quickSummary: string;
  dosage: DrugDosage[];
  sideEffects: DrugSideEffect[];
  interactions: DrugInteraction[];
  warnings: DrugWarning[];
  relatedTopics: { title: string; href: string }[];
}
