import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TestSectionNav from "@/components/tests/TestSectionNav";
import { fetchTestBySlug, getAllTestSlugs } from "@/lib/tests";
import {
  ChevronRight,
  ArrowRight,
  ClipboardList,
  Timer,
  Microscope,
} from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getAllTestSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const test = await fetchTestBySlug(slug);
  if (!test) return { title: "Not Found" };
  return {
    title: `${test.name} | Mediatas Clinical Test Reference`,
  };
}

export default async function TestDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const test = await fetchTestBySlug(slug);

  if (!test) {
    notFound();
  }

  const hasInterpretation = Boolean(
    test.interpretation.low || test.interpretation.high
  );

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header activeNav="Tests" />

      <main className="mt-24 mb-12 max-w-[1200px] mx-auto px-4 md:px-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-on-surface-variant text-xs font-semibold tracking-[0.02em] mb-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/tests" className="hover:text-primary">
            Tests
          </Link>
          <ChevronRight size={14} />
          <span className="text-primary font-semibold">{test.name}</span>
        </nav>

        {/* Page Header */}
        <header className="mb-12 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="bg-surface-container-high text-primary px-4 py-1 rounded-full text-xs font-semibold tracking-[0.02em]">
                {test.category}
              </span>
              <span className="text-outline text-xs font-semibold tracking-[0.02em]">
                • Updated {test.reviewDate}
              </span>
            </div>
            <h1 className="font-heading text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-surface mb-4">
              {test.name}
            </h1>
            <p className="text-lg leading-7 text-on-surface-variant max-w-2xl">
              {test.description}
            </p>
            {(test.resultTime || test.specimen) && (
              <div className="flex flex-wrap gap-4 pt-4">
                {test.resultTime && (
                  <span className="flex items-center gap-1 text-sm font-medium text-on-surface-variant">
                    <Timer size={18} /> Results: {test.resultTime}
                  </span>
                )}
                {test.specimen && (
                  <span className="flex items-center gap-1 text-sm font-medium text-on-surface-variant">
                    <Microscope size={18} /> Specimen: {test.specimen}
                  </span>
                )}
              </div>
            )}
          </div>
          {test.imageUrl && (
            <div className="w-full md:w-80 h-64 rounded-xl overflow-hidden shadow-sm border border-outline-variant relative group shrink-0">
              <Image
                src={test.imageUrl}
                alt={test.name}
                fill
                priority
                sizes="(min-width: 768px) 320px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── Side Navigation (Desktop) ──────────────────────── */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <h3 className="text-xs font-semibold text-outline uppercase tracking-wider mb-2">
                On this page
              </h3>
              <TestSectionNav sections={test.sections} />

              <div className="mt-8 p-4 bg-surface-container rounded-xl">
                <p className="text-xs font-semibold text-secondary mb-1">
                  Last Updated
                </p>
                <p className="text-base font-semibold">{test.reviewDate}</p>
              </div>
            </div>
          </aside>

          {/* ── Main Content ──────────────────────────────────── */}
          <div className="lg:col-span-9">
            {/* Quick Summary */}
            <section className="mb-12 bg-surface-container-low border-l-4 border-primary p-8 rounded-xl">
              <h2 className="font-heading text-2xl font-semibold mb-4 flex items-center gap-2">
                <ClipboardList className="text-primary" size={24} /> Quick
                Summary
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-outline uppercase tracking-wider">
                    Primary Purpose
                  </span>
                  <p>{test.quickSummary.primaryPurpose}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-outline uppercase tracking-wider">
                    What It Measures
                  </span>
                  <p>{test.quickSummary.whatItMeasures}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-outline uppercase tracking-wider">
                    Preparation
                  </span>
                  <p>{test.quickSummary.preparation}</p>
                </div>
              </div>
            </section>

            {/* Overview */}
            {test.overview.length > 0 && (
              <section className="mb-12 scroll-mt-24" id="overview">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6 border-b border-outline-variant pb-2">
                  Overview
                </h2>
                <div className="space-y-4 text-on-surface-variant leading-relaxed">
                  {test.overview.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </section>
            )}

            {/* What It Measures */}
            {test.measures.length > 0 && (
              <section className="mb-12 scroll-mt-24" id="measures">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6 border-b border-outline-variant pb-2">
                  What It Measures
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {test.measures.map((measure) => (
                    <div
                      key={measure.name}
                      className="p-6 rounded-xl border border-outline-variant hover:shadow-lg transition-shadow bg-surface-container-lowest"
                    >
                      <h4 className="font-heading text-2xl font-semibold mb-1">
                        {measure.name}
                      </h4>
                      <p className="text-on-surface-variant">
                        {measure.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* How It's Performed */}
            {test.procedure.length > 0 && (
              <section className="mb-12 scroll-mt-24" id="performed">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6 border-b border-outline-variant pb-2">
                  How It&apos;s Performed
                </h2>
                <ol className="bg-surface-container-low p-6 rounded-xl space-y-6">
                  {test.procedure.map((step) => (
                    <li key={step.step} className="flex gap-4 items-start">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">
                        {step.step}
                      </span>
                      <div>
                        <p className="font-heading text-xl font-semibold text-on-surface mb-1">
                          {step.title}
                        </p>
                        <p className="text-on-surface-variant">
                          {step.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Reference Ranges */}
            {test.referenceRanges.length > 0 && (
              <section className="mb-12 scroll-mt-24" id="ranges">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6 border-b border-outline-variant pb-2">
                  Reference Ranges
                </h2>
                <p className="text-on-surface-variant italic mb-4">
                  Note: Normal ranges vary by laboratory. Consult your report
                  for the specific reference used.
                </p>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-surface-container-low">
                      <tr className="text-sm font-medium">
                        <th className="p-4 border-b border-outline-variant">
                          Parameter
                        </th>
                        <th className="p-4 border-b border-outline-variant">
                          Typical Range (Adult)
                        </th>
                        <th className="p-4 border-b border-outline-variant">
                          Units
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {test.referenceRanges.map((row, i) => (
                        <tr key={row.parameter}>
                          <td
                            className={`p-4 font-semibold ${i < test.referenceRanges.length - 1 ? "border-b border-outline-variant" : ""}`}
                          >
                            {row.parameter}
                          </td>
                          <td
                            className={`p-4 ${i < test.referenceRanges.length - 1 ? "border-b border-outline-variant" : ""}`}
                          >
                            {row.typicalRange}
                          </td>
                          <td
                            className={`p-4 ${i < test.referenceRanges.length - 1 ? "border-b border-outline-variant" : ""}`}
                          >
                            {row.units}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Interpretation & Next Steps */}
            {hasInterpretation && (
              <section className="mb-12 scroll-mt-24" id="next-steps">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6 border-b border-outline-variant pb-2">
                  Interpreting Results &amp; Next Steps
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-primary-container text-on-primary-container rounded-xl flex flex-col justify-between">
                    <div>
                      <p className="font-heading text-2xl font-semibold mb-2">
                        Discuss with Doctor
                      </p>
                      <p className="opacity-90">
                        {test.interpretation.notes ||
                          "An abnormal result doesn't always mean a disease. Your physician will interpret your results based on your overall health, symptoms and other tests."}
                      </p>
                    </div>
                    <Link
                      href="/login"
                      className="mt-8 bg-surface-container-lowest text-primary py-2 rounded-lg text-center text-sm font-medium hover:shadow-lg transition-all"
                    >
                      Schedule Consultation
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {test.interpretation.low && (
                      <div className="p-4 border-l-4 border-primary bg-surface-container-low rounded-r-xl">
                        <h4 className="text-sm font-semibold text-on-surface">
                          If values are Low:
                        </h4>
                        <p className="text-on-surface-variant">
                          {test.interpretation.low}
                        </p>
                      </div>
                    )}
                    {test.interpretation.high && (
                      <div className="p-4 border-l-4 border-error bg-error-container/20 rounded-r-xl">
                        <h4 className="text-sm font-semibold text-on-surface">
                          If values are High:
                        </h4>
                        <p className="text-on-surface-variant">
                          {test.interpretation.high}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Medical Disclaimer */}
            <div className="p-6 bg-surface-container-low rounded-xl text-center border-t border-outline-variant">
              <p className="text-base text-on-surface-variant">
                Disclaimer: This information is for educational purposes only
                and does not constitute medical advice. Consult with a qualified
                healthcare professional before making any medical decisions
                based on these results.
              </p>
            </div>

            {/* Related Topics */}
            {test.relatedTopics.length > 0 && (
              <section className="mt-12">
                <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6">
                  Related Topics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {test.relatedTopics.map((topic) => (
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
