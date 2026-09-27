import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Info,
  CheckCircle2,
  UtensilsCrossed,
  BriefcaseMedical,
  Flower2,
  Dumbbell,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WeeklyTracker from "@/components/pregnancy/WeeklyTracker";
import NewsletterForm from "@/components/pregnancy/NewsletterForm";
import { fetchPregnancyGuide } from "@/lib/pregnancy";

export const metadata: Metadata = {
  title: "Pregnancy Guide | Mediatas - Clinical Clarity",
};

export default async function PregnancyPage() {
  const { hero, currentWeek, weeks, keyTakeaways, wellness, referencesUpdated } =
    await fetchPregnancyGuide();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header activeNav="Pregnancy" />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[400px] py-12 flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={hero.image}
              alt={hero.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent" />
          </div>
          <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-16 w-full">
            <div className="max-w-xl">
              <span className="inline-block px-4 py-1 bg-secondary-container text-on-secondary-container rounded-full text-label-sm font-semibold mb-4 uppercase tracking-wider">
                {hero.badge}
              </span>
              <h1 className="font-heading text-[32px] leading-10 md:text-display-lg font-bold text-on-surface mb-4">
                {hero.title}
              </h1>
              <p className="text-body-lg text-on-surface-variant mb-8">
                {hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="px-8 py-4 bg-primary text-on-primary rounded-xl text-label-md font-medium shadow-sm hover:shadow-md transition-all"
                >
                  Start Your Profile
                </Link>
                <a
                  href="#weekly-tracker"
                  className="px-8 py-4 border border-outline-variant text-on-surface rounded-xl text-label-md font-medium hover:bg-surface-container-low transition-all"
                >
                  Browse Weekly Guide
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Progress Tracker */}
        <div id="weekly-tracker" className="scroll-mt-16">
          <WeeklyTracker weeks={weeks} currentWeek={currentWeek} />
        </div>

        {/* Quick Summary Box */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-16 mb-12">
          <div className="bg-[#EFF6FF] border-l-4 border-primary p-8 rounded-r-xl">
            <div className="flex items-start gap-4">
              <Info size={30} className="text-primary shrink-0" />
              <div>
                <h4 className="font-heading text-headline-md font-semibold text-primary mb-2">
                  {keyTakeaways.title}
                </h4>
                <ul className="grid md:grid-cols-2 gap-4 text-on-surface-variant">
                  {keyTakeaways.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Health, Nutrition, Care */}
        <section className="py-12 bg-surface-container-low">
          <div className="max-w-[1200px] mx-auto px-4 md:px-16">
            <div className="mb-8 text-center">
              <h2 className="font-heading text-headline-lg font-semibold">
                Prenatal Wellness Guide
              </h2>
              <p className="text-on-surface-variant">
                Holistic support for body and mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[240px]">
              {/* Nutrition Card */}
              <div className="md:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant p-8 flex flex-col md:flex-row gap-8 items-center overflow-hidden group">
                <div className="flex-1">
                  <UtensilsCrossed size={36} className="text-tertiary-container mb-4" />
                  <h3 className="font-heading text-headline-md font-semibold mb-2">
                    {wellness.nutrition.title}
                  </h3>
                  <p className="text-on-surface-variant mb-6">
                    {wellness.nutrition.description}
                  </p>
                  <Link
                    href={wellness.nutrition.href}
                    className="text-primary text-label-md font-medium flex items-center gap-1 hover:underline"
                  >
                    {wellness.nutrition.linkLabel} <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="w-full md:w-64 h-48 md:h-full relative overflow-hidden rounded-lg">
                  <Image
                    src={wellness.nutrition.image.src}
                    alt={wellness.nutrition.image.alt}
                    fill
                    sizes="(min-width: 768px) 256px, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Prenatal Care Card */}
              <div className="md:col-span-4 bg-primary text-on-primary rounded-xl p-8 flex flex-col justify-between gap-6">
                <div>
                  <BriefcaseMedical size={36} className="mb-4" />
                  <h3 className="font-heading text-headline-md font-semibold mb-2">
                    {wellness.careSchedule.title}
                  </h3>
                  <p className="text-white/80">{wellness.careSchedule.description}</p>
                </div>
                <button
                  type="button"
                  className="bg-white text-primary w-full py-2 rounded-lg text-label-md font-medium"
                >
                  {wellness.careSchedule.ctaLabel}
                </button>
              </div>

              {/* Mental Health Card */}
              <div className="md:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant p-8 flex flex-col justify-between gap-6">
                <div>
                  <Flower2 size={36} className="text-secondary-foreground mb-4" />
                  <h3 className="font-heading text-headline-md font-semibold mb-2">
                    {wellness.mentalHealth.title}
                  </h3>
                  <p className="text-on-surface-variant">
                    {wellness.mentalHealth.description}
                  </p>
                </div>
                <Link
                  href={wellness.mentalHealth.href}
                  className="text-primary text-label-md font-medium hover:underline"
                >
                  {wellness.mentalHealth.linkLabel}
                </Link>
              </div>

              {/* Exercise Card */}
              <div className="md:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant p-8 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10">
                  <Image
                    src={wellness.activity.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 66vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 max-w-md">
                  <Dumbbell size={36} className="text-secondary-foreground mb-4" />
                  <h3 className="font-heading text-headline-md font-semibold mb-2">
                    {wellness.activity.title}
                  </h3>
                  <p className="text-on-surface-variant mb-6">
                    {wellness.activity.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {wellness.activity.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-surface-container px-4 py-1 rounded-full text-label-sm font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / Community Section */}
        <section className="py-12 max-w-[800px] mx-auto px-4 text-center">
          <h2 className="font-heading text-headline-lg font-semibold mb-4">
            Stay Informed Every Week
          </h2>
          <p className="text-on-surface-variant mb-8">
            Get clinical insights tailored to your exact week of pregnancy
            delivered to your inbox.
          </p>
          <NewsletterForm />
          <p className="text-label-sm text-outline mt-4">
            Clinical references updated: {referencesUpdated}
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
