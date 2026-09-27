import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AssistantChat from "@/components/ai-assistant/AssistantChat";
import AssistantIcon from "@/components/ai-assistant/AssistantIcon";
import { fetchAssistantConfig } from "@/lib/ai-assistant";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Assistant | Mediatas Clinical Assistant",
};

export default async function AiAssistantPage() {
  const { greeting, suggestions, capabilities, safetyNotice } =
    await fetchAssistantConfig();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header activeNav="AI Assistant" />

      <main className="mt-24 mb-12 max-w-[1200px] mx-auto px-4 md:px-16">
        <header className="mb-8 max-w-[800px]">
          <h1 className="font-heading text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-on-surface mb-4">
            AI Assistant
          </h1>
          <p className="text-lg leading-7 text-on-surface-variant">
            Ask clinical questions in plain language. Answers draw on the
            Mediatas encyclopedia and link back to the pages they come from.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── Chat ──────────────────────────────────────────── */}
          <div className="lg:col-span-8">
            <AssistantChat greeting={greeting} suggestions={suggestions} />
          </div>

          {/* ── Side Panel ────────────────────────────────────── */}
          <aside className="lg:col-span-4 space-y-6">
            <section className="bg-surface-container-low border-l-4 border-primary p-6 rounded-xl">
              <h2 className="font-heading text-2xl font-semibold mb-4">
                What I Can Help With
              </h2>
              <ul className="space-y-4">
                {capabilities.map((capability) => (
                  <li key={capability.title} className="flex items-start gap-4">
                    <AssistantIcon
                      name={capability.icon}
                      className="text-primary shrink-0 mt-1"
                      size={20}
                    />
                    <div>
                      <p className="font-semibold">{capability.title}</p>
                      <p className="text-sm text-on-surface-variant">
                        {capability.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex items-start gap-4 p-6 border border-error text-error rounded-xl">
              <ShieldAlert size={24} className="shrink-0 mt-1" />
              <div>
                <h2 className="font-heading text-lg font-semibold mb-1">
                  Not Medical Advice
                </h2>
                <p className="text-sm leading-relaxed">{safetyNotice}</p>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
