import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DrugIcon from "@/components/drugs/DrugIcon";
import { fetchDrugBySlug, getAllDrugSlugs } from "@/lib/drugs";
import {
  ChevronRight,
  BadgeCheck,
  AlertTriangle,
  Info,
  ArrowRight,
  ShieldCheck,
  CircleDot,
} from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getAllDrugSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const drug = await fetchDrugBySlug(slug);
  if (!drug) return { title: "Not Found" };
  return {
    title: `${drug.name} | Mediatas Clinical Drug Reference`,
  };
}

export default async function DrugDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const drug = await fetchDrugBySlug(slug);

  if (!drug) {
    notFound();
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header activeNav="Drugs" />

      <main className="mt-24 mb-12 max-w-[1200px] mx-auto px-4 md:px-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-on-surface-variant text-xs font-semibold tracking-[0.02em] mb-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/drugs" className="hover:text-primary">
            Drugs
          </Link>
          <ChevronRight size={14} />
          <span className="text-primary font-semibold">{drug.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── Side Navigation (Desktop) ──────────────────────── */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <h3 className="text-xs font-semibold text-outline uppercase tracking-wider mb-2">
                On this page
              </h3>
              <nav className="flex flex-col gap-1">
                {drug.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-base text-on-surface-variant py-2 px-4 hover:bg-surface-container-low rounded-lg transition-all"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 p-4 bg-surface-container rounded-xl">
                <p className="text-xs font-semibold text-secondary mb-1">
                  Last Updated
                </p>
                <p className="text-base font-semibold">{drug.reviewDate}</p>
              </div>
            </div>
          </aside>

          {/* ── Main Content ──────────────────────────────────── */}
          <div className="lg:col-span-9">
            {/* Drug Header */}
            <div className="mb-12">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {drug.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface-container-high text-on-surface-variant px-4 py-1 rounded-full text-xs font-semibold tracking-[0.02em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="font-heading text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-surface mb-1">
                {drug.name}
              </h1>
              <p className="font-heading text-2xl font-semibold text-on-surface-variant italic">
                {drug.form}
              </p>
            </div>

            {/* Quick Summary */}
            <section
              className="mb-12 p-8 bg-[#EFF6FF] border-l-4 border-primary rounded-r-xl"
              id="overview"
            >
              <h2 className="font-heading text-2xl font-semibold mb-4 flex items-center gap-2 text-primary">
                <Info size={24} />
                Quick Summary
              </h2>
              <p className="text-lg leading-relaxed text-on-surface mb-4">
                {drug.quickSummary}
              </p>
              {drug.uses.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {drug.uses.slice(0, 4).map((use) => (
                    <div key={use.condition} className="flex items-start gap-2">
                      <CircleDot
                        size={16}
                        className="text-primary mt-1 shrink-0"
                      />
                      <span className="text-base">{use.condition}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Medical Uses */}
            {drug.uses.length > 0 && (
              <section className="mb-12 scroll-mt-24" id="uses">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6 border-b border-outline-variant pb-2">
                  Medical Uses
                </h2>
                <div className="space-y-4">
                  {drug.uses.map((use) => (
                    <div key={use.condition} className="flex items-start gap-4">
                      <div className="mt-2 shrink-0 w-2 h-2 rounded-full bg-primary" />
                      <div>
                        <strong>{use.condition}:</strong>{" "}
                        <span className="text-on-surface-variant">
                          {use.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Dosage & Administration */}
            {drug.dosage.length > 0 && (
              <section className="mb-12 scroll-mt-24" id="dosage">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6 border-b border-outline-variant pb-2">
                  Dosage & Administration
                </h2>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-surface-container-low">
                      <tr className="text-sm font-medium">
                        <th className="p-4 border-b border-outline-variant">
                          Condition
                        </th>
                        <th className="p-4 border-b border-outline-variant">
                          Starting Dose
                        </th>
                        <th className="p-4 border-b border-outline-variant">
                          Maximum Dose
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {drug.dosage.map((row, i) => (
                        <tr key={row.condition}>
                          <td
                            className={`p-4 font-semibold ${i < drug.dosage.length - 1 ? "border-b border-outline-variant" : ""}`}
                          >
                            {row.condition}
                          </td>
                          <td
                            className={`p-4 ${i < drug.dosage.length - 1 ? "border-b border-outline-variant" : ""}`}
                          >
                            {row.startingDose}
                          </td>
                          <td
                            className={`p-4 ${i < drug.dosage.length - 1 ? "border-b border-outline-variant" : ""}`}
                          >
                            {row.maxDose}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-on-surface-variant mt-4 flex items-center gap-1">
                  <Info size={16} />
                  Always follow the specific dosing instructions provided by
                  your healthcare provider.
                </p>
              </section>
            )}

            {/* Side Effects */}
            {drug.sideEffects.length > 0 && (
              <section className="mb-12 scroll-mt-24" id="side-effects">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6 border-b border-outline-variant pb-2">
                  Common Side Effects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {drug.sideEffects.map((effect) => (
                    <div
                      key={effect.title}
                      className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl flex items-start gap-4"
                    >
                      <DrugIcon
                        name={effect.icon}
                        className="text-secondary shrink-0"
                        size={32}
                      />
                      <div>
                        <p className="text-lg font-semibold mb-1">
                          {effect.title}
                        </p>
                        <p className="text-on-surface-variant">
                          {effect.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interactions */}
            {drug.interactions.length > 0 && (
              <section className="mb-12 scroll-mt-24" id="interactions">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6 border-b border-outline-variant pb-2">
                  Interactions
                </h2>
                <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
                  {drug.interactions.map((interaction) => (
                    <div
                      key={interaction.substance}
                      className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant"
                    >
                      <h4 className="text-lg font-bold text-tertiary mb-1">
                        {interaction.substance}
                      </h4>
                      <p className="text-on-surface-variant">
                        {interaction.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Warnings / Precautions */}
            {drug.warnings.length > 0 && (
              <section className="mb-12 scroll-mt-24" id="warnings">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6 border-b border-outline-variant pb-2 text-error">
                  Critical Warnings
                </h2>
                <div className="space-y-4">
                  {drug.warnings.map((warning) =>
                    warning.severity === "critical" ? (
                      <div
                        key={warning.title}
                        className="flex items-start gap-4 p-6 bg-error-container text-on-error-container rounded-xl"
                      >
                        <AlertTriangle
                          size={32}
                          className="shrink-0 mt-1"
                          fill="currentColor"
                        />
                        <div>
                          <h3 className="font-heading text-2xl font-semibold mb-1">
                            {warning.title}
                          </h3>
                          <p className="text-lg leading-relaxed">
                            <strong>Black Box Warning:</strong>{" "}
                            {warning.description.replace(
                              /^Black Box Warning:\s*/,
                              ""
                            )}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={warning.title}
                        className="flex items-start gap-4 p-6 border border-error text-error rounded-xl"
                      >
                        <AlertTriangle
                          size={32}
                          className="shrink-0 mt-1"
                        />
                        <div>
                          <h3 className="font-heading text-2xl font-semibold mb-1">
                            {warning.title}
                          </h3>
                          <p className="text-lg leading-relaxed">
                            {warning.description}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* Medical Disclaimer */}
            <div className="p-6 bg-surface-container-low rounded-xl text-center border-t border-outline-variant">
              <p className="text-base text-on-surface-variant">
                Disclaimer: This information is for educational purposes only
                and does not constitute medical advice. Consult with a qualified
                healthcare professional before making any changes to your
                medication regimen.
              </p>
            </div>

            {/* Related Topics */}
            {drug.relatedTopics.length > 0 && (
              <section className="mt-12">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6">
                  Related Topics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {drug.relatedTopics.map((topic) => (
                    <Link
                      key={topic.title}
                      href={topic.href}
                      className="p-4 rounded-lg border border-outline-variant hover:border-primary transition-colors flex items-center justify-between group"
                    >
                      <span className="text-sm font-medium">
                        {topic.title}
                      </span>
                      <ArrowRight
                        className="text-outline group-hover:text-primary"
                        size={20}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
