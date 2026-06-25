import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionNav from "@/components/diseases/SectionNav";
import DiseaseIcon from "@/components/diseases/DiseaseIcon";
import { fetchDiseaseBySlug, getAllDiseaseSlugs } from "@/lib/diseases";
import {
  ChevronRight,
  BadgeCheck,
  ClipboardList,
  AlertTriangle,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getAllDiseaseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const disease = await fetchDiseaseBySlug(slug);
  if (!disease) return { title: "Not Found" };
  return {
    title: `${disease.title} | Mediatas Clinical Encyclopedia`,
  };
}

export default async function DiseasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const disease = await fetchDiseaseBySlug(slug);

  if (!disease) {
    notFound();
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header activeNav="Diseases" />

      <main className="mt-24 mb-12 max-w-[1200px] mx-auto px-4 md:px-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-on-surface-variant text-xs font-semibold tracking-[0.02em] mb-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/diseases" className="hover:text-primary">
            Diseases
          </Link>
          <ChevronRight size={14} />
          <span className="text-primary font-semibold">{disease.title}</span>
        </nav>

        {/* Page Header */}
        <header className="mb-12 max-w-[800px]">
          <h1 className="font-heading text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-surface mb-4">
            {disease.title}
          </h1>
          <p className="text-lg leading-7 text-on-surface-variant mb-8">
            {disease.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {disease.tags.map((tag) => (
              <span
                key={tag}
                className="bg-surface-container px-4 py-1 rounded-full text-xs font-semibold tracking-[0.02em] text-on-secondary-container"
              >
                {tag}
              </span>
            ))}
            <span className="flex items-center gap-1 text-xs font-semibold tracking-[0.02em] text-outline ml-auto">
              <BadgeCheck size={16} /> Medical Review: {disease.reviewDate}
            </span>
          </div>
        </header>

        {/* Quick Summary */}
        <section className="bg-surface-container-low border-l-4 border-primary p-8 rounded-xl mb-12">
          <h3 className="font-heading text-2xl font-semibold mb-4 flex items-center gap-2">
            <ClipboardList className="text-primary" size={24} /> Quick Summary
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">
                Primary Symptoms
              </span>
              <p>{disease.quickSummary.primarySymptoms}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">
                Common Treatments
              </span>
              <p>{disease.quickSummary.commonTreatments}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">
                Risk Factors
              </span>
              <p>{disease.quickSummary.riskFactors}</p>
            </div>
          </div>
        </section>

        {/* Sticky Section Navigation */}
        <SectionNav sections={disease.sections} />

        {/* Content Sections */}
        <div className="max-w-[800px] mx-auto space-y-12">
          {/* Overview */}
          {disease.overview.length > 0 && (
            <section id="overview">
              <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6">
                Overview
              </h2>
              <div className="space-y-4 text-on-surface-variant leading-relaxed">
                {disease.overview.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                <div className="rounded-xl overflow-hidden mt-8">
                  <div className="w-full h-80 bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high" />
                </div>
              </div>
            </section>
          )}

          {/* Symptoms - Bento Grid */}
          {disease.symptoms.length > 0 && (
            <section id="symptoms">
              <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6">
                Symptoms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {disease.symptoms.map((symptom) => (
                  <div
                    key={symptom.title}
                    className="p-6 rounded-xl border border-outline-variant hover:shadow-lg transition-shadow bg-surface-container-lowest"
                  >
                    <DiseaseIcon
                      name={symptom.icon}
                      className="text-primary mb-4"
                      size={24}
                    />
                    <h4 className="font-heading text-2xl font-semibold mb-1">
                      {symptom.title}
                    </h4>
                    <p className="text-on-surface-variant">
                      {symptom.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Causes & Risk Factors */}
          {disease.causes.riskFactors.length > 0 && (
            <section id="causes">
              <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6">
                Causes &amp; Risk Factors
              </h2>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
                <div className="p-8 border-b border-outline-variant">
                  <h4 className="font-heading text-2xl font-semibold mb-4 text-primary">
                    Biological Causes
                  </h4>
                  <p className="text-on-surface-variant">
                    {disease.causes.biological}
                  </p>
                </div>
                <div className="p-8">
                  <h4 className="font-heading text-2xl font-semibold mb-4 text-primary">
                    Key Risk Factors
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {disease.causes.riskFactors.map((factor) => (
                      <li
                        key={factor.label}
                        className="flex items-start gap-4"
                      >
                        <span className="bg-error-container text-on-error-container p-1 rounded-full shrink-0">
                          <AlertTriangle size={16} />
                        </span>
                        <span>
                          <strong>{factor.label}</strong> {factor.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Management & Treatment */}
          {disease.treatment.length > 0 && (
            <section id="treatment">
              <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6">
                Management &amp; Treatment
              </h2>
              <div className="space-y-6">
                {disease.treatment.map((item) => (
                  <div key={item.step} className="flex gap-6">
                    <div className="hidden md:block w-1 h-32 bg-secondary-container rounded-full mt-2 shrink-0" />
                    <div>
                      <h4 className="font-heading text-2xl font-semibold mb-2">
                        {item.step}. {item.title}
                      </h4>
                      <p className="text-on-surface-variant leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          {disease.faq.length > 0 && (
            <section id="faq">
              <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {disease.faq.map((item) => (
                  <details
                    key={item.question}
                    className="group bg-surface-container-low rounded-xl p-6 cursor-pointer"
                  >
                    <summary className="flex justify-between items-center font-heading text-xl md:text-2xl font-semibold list-none [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <ChevronDown
                        className="group-open:rotate-180 transition-transform shrink-0 ml-4"
                        size={24}
                      />
                    </summary>
                    <div className="mt-4 text-on-surface-variant border-t border-outline-variant pt-4">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related Topics */}
          {disease.relatedTopics.length > 0 && (
            <section id="related">
              <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-6">
                Related Topics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {disease.relatedTopics.map((topic) => (
                  <Link
                    key={topic.title}
                    href={topic.href}
                    className="p-4 rounded-lg border border-outline-variant hover:border-primary transition-colors flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium">{topic.title}</span>
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
      </main>

      <Footer />
    </div>
  );
}
