import type { DrugListItem, DrugDetail } from "@/types/drug";

// Mock data imports — replace with real API calls later
import drugsList from "@/data/mock/drugs-list.json";
import lisinoprilDetail from "@/data/mock/drug-detail-lisinopril.json";

const detailsMap: Record<string, DrugDetail> = {
  lisinopril: lisinoprilDetail as DrugDetail,
};

// ─── API Service Layer ─────────────────────────────────────────────
// Replace mock implementations below with real fetch() calls when ready.
// The function signatures stay the same — no page changes needed.
// ────────────────────────────────────────────────────────────────────

/**
 * GET /api/drugs
 * Returns all drugs for listing/search.
 */
export async function fetchAllDrugs(): Promise<DrugListItem[]> {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/drugs`);
  return drugsList as DrugListItem[];
}

/**
 * GET /api/drugs/:slug
 * Returns full drug details by slug.
 */
export async function fetchDrugBySlug(
  slug: string
): Promise<DrugDetail | null> {
  // TODO: Replace with → const res = await fetch(`${API_BASE}/drugs/${slug}`);
  return detailsMap[slug] ?? null;
}

/**
 * Returns all known slugs (used by generateStaticParams for SSG).
 */
export async function getAllDrugSlugs(): Promise<string[]> {
  const drugs = await fetchAllDrugs();
  return drugs.map((d) => d.slug);
}
