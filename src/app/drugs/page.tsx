import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DrugSearchList from "@/components/drugs/DrugSearchList";
import { fetchAllDrugs } from "@/lib/drugs";

export const metadata: Metadata = {
  title: "Drugs | Mediatas Clinical Drug Reference",
};

export default async function DrugsPage() {
  const drugs = await fetchAllDrugs();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header activeNav="Drugs" />

      <main className="mt-24 mb-12 max-w-[1200px] mx-auto px-4 md:px-16">
        <header className="mb-8 max-w-[800px]">
          <h1 className="font-heading text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-surface mb-4">
            Drugs
          </h1>
          <p className="text-lg leading-7 text-on-surface-variant">
            Search our clinical drug reference. Find dosage guidelines,
            interactions, side effects, and prescribing information.
          </p>
        </header>

        <DrugSearchList drugs={drugs} />
      </main>

      <Footer />
    </div>
  );
}
