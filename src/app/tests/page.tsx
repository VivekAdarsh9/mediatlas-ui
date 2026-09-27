import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { TestSearchList } from "@/components/tests/TestSearchList";
import { fetchAllTests } from "@/lib/tests";

export const metadata: Metadata = {
  title: "Tests | Mediatas Clinical Test Reference",
};

export default async function TestsPage() {
  const tests = await fetchAllTests();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header activeNav="Tests" />

      <main className="mt-24 mb-12 max-w-[1200px] mx-auto px-4 md:px-16">
        <header className="mb-8 max-w-[800px]">
          <h1 className="font-heading text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-surface mb-4">
            Tests
          </h1>
          <p className="text-lg leading-7 text-on-surface-variant">
            Search our clinical test reference. Find information about common
            laboratory tests, what they measure, how they&apos;re performed, and
            how to interpret results.
          </p>
        </header>

        <TestSearchList tests={tests} />
      </main>

      <Footer />
    </div>
  );
}