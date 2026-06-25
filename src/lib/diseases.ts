import type { DiseaseListItem, DiseaseDetail } from "@/types/disease";

// Mock data imports — replace with real API calls later
import diseasesList from "@/data/mock/diseases-list.json";
import type2DiabetesDetail from "@/data/mock/disease-detail-type-2-diabetes.json";

const detailsMap: Record<string, DiseaseDetail> = {
  "type-2-diabetes": type2DiabetesDetail as DiseaseDetail,
};

// ─── API Service Layer ─────────────────────────────────────────────
// Replace mock implementations below with real fetch() calls when ready.
// The function signatures stay the same — no page changes needed.
// ────────────────────────────────────────────────────────────────────

/**
 * GET /api/diseases
 * Returns all diseases for listing/search.
 */
export async function fetchAllDiseases(): Promise<DiseaseListItem[]> {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/diseases`);
  return diseasesList as DiseaseListItem[];
}

/**
 * GET /api/diseases/:slug
 * Returns full disease details by slug.
 */
export async function fetchDiseaseBySlug(
  slug: string
): Promise<DiseaseDetail | null> {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/diseases/${slug}`);
  return detailsMap[slug] ?? null;
}

/**
 * Returns all known slugs (used by generateStaticParams for SSG).
 */
export async function getAllDiseaseSlugs(): Promise<string[]> {
  const diseases = await fetchAllDiseases();
  return diseases.map((d) => d.slug);
}
