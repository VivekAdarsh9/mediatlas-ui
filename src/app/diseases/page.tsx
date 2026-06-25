import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DiseaseSearchList from "@/components/diseases/DiseaseSearchList";
import { fetchAllDiseases } from "@/lib/diseases";

export const metadata: Metadata = {
  title: "Diseases | Mediatas Clinical Encyclopedia",
};

export default async function DiseasesPage() {
  const diseases = await fetchAllDiseases();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header activeNav="Diseases" />

      <main className="mt-24 mb-12 max-w-[1200px] mx-auto px-4 md:px-16">
        <header className="mb-8 max-w-[800px]">
          <h1 className="font-heading text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-surface mb-4">
            Diseases
          </h1>
          <p className="text-lg leading-7 text-on-surface-variant">
            Browse our clinical encyclopedia. Select a condition to view
            detailed medical information including symptoms, causes, and
            treatment options.
          </p>
        </header>

        <DiseaseSearchList diseases={diseases} />
      </main>

      <Footer />
    </div>
  );
}
