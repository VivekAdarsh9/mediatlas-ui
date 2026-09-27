import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Stethoscope,
  Pill,
  FlaskConical,
  Baby,
  Brain,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mediatas — Clinical Clarity in Healthcare",
};

const features = [
  {
    icon: Stethoscope,
    title: "Diseases",
    description:
      "Comprehensive clinical encyclopedia covering symptoms, causes, risk factors, and evidence-based treatment pathways.",
    href: "/diseases",
  },
  {
    icon: Pill,
    title: "Drugs",
    description:
      "Detailed pharmacological reference with dosage guidelines, interactions, contraindications, and prescribing notes.",
    href: "/drugs",
  },
  {
    icon: FlaskConical,
    title: "Lab Tests",
    description:
      "Reference ranges, sample requirements, clinical significance, and interpretation guides for diagnostic tests.",
    href: "/tests",
  },
  {
    icon: Baby,
    title: "Pregnancy",
    description:
      "Week-by-week guidance covering maternal health, fetal development, screening schedules, and clinical milestones.",
    href: "/pregnancy",
  },
  {
    icon: Brain,
    title: "AI Assistant",
    description:
      "Intelligent clinical support powered by medical-grade AI — ask questions, get differential insights, and more.",
    href: "/ai-assistant",
  },
  {
    icon: Globe,
    title: "Global Standards",
    description:
      "Content aligned with WHO, ACOG, and major clinical guideline bodies — reviewed and updated regularly.",
    href: "#",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Header />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden canvas-bg pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
          <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-primary-fixed-dim rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] left-[10%] w-64 h-64 bg-secondary-fixed rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-16 text-center">
          <div className="inline-flex items-center gap-2 bg-surface-container border border-outline-variant rounded-full px-4 py-1.5 mb-8">
            <BadgeCheck size={16} className="text-primary" />
            <span className="text-xs font-semibold tracking-[0.02em] text-on-surface-variant">
              Medically Reviewed Content
            </span>
          </div>

          <h1 className="font-heading text-[40px] leading-[48px] md:text-[56px] md:leading-[64px] tracking-[-0.02em] font-bold text-on-surface max-w-[800px] mx-auto mb-6">
            Clinical Clarity at Every Decision Point
          </h1>

          <p className="text-lg md:text-xl leading-7 md:leading-8 text-on-surface-variant max-w-[640px] mx-auto mb-10">
            Evidence-based medical reference built for clinicians, students, and
            healthcare professionals — search, learn, and decide with confidence.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/diseases"
              className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full text-sm font-medium hover:bg-surface-tint transition-all active:opacity-80"
            >
              Explore Diseases <ArrowRight size={18} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-surface-container border border-outline-variant text-on-surface px-8 py-3 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-all"
            >
              Login to Mediatas
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features Grid ────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <header className="text-center mb-14 max-w-[640px] mx-auto">
            <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-4">
              Everything You Need, One Platform
            </h2>
            <p className="text-lg leading-7 text-on-surface-variant">
              From disease encyclopedias to AI-powered clinical support —
              Mediatas covers the full spectrum of medical reference needs.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="group glass-card rounded-xl p-8 hover:border-primary transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-surface-container mb-6">
                  <Icon className="text-primary" size={24} />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {description}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-outline group-hover:text-primary transition-colors">
                  Learn more <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Section ────────────────────────────────────────── */}
      <section className="py-16 bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto px-4 md:px-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-4">
                Trusted by Healthcare Professionals
              </h2>
              <p className="text-lg leading-7 text-on-surface-variant max-w-[560px]">
                Every article is authored or reviewed by qualified medical
                professionals and aligned with the latest clinical guidelines.
              </p>
            </div>

            <div className="flex-1 space-y-6">
              <div className="bg-surface-container-lowest border-l-4 border-primary p-6 rounded-r-xl">
                <div className="flex gap-4">
                  <ShieldCheck className="text-primary shrink-0" size={28} />
                  <div>
                    <p className="font-heading text-lg font-semibold text-on-surface mb-1">
                      HIPAA-Compliant Architecture
                    </p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      End-to-end encryption and strict access controls protect
                      all clinical data within the platform.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest border-l-4 border-primary p-6 rounded-r-xl">
                <div className="flex gap-4">
                  <BadgeCheck className="text-primary shrink-0" size={28} />
                  <div>
                    <p className="font-heading text-lg font-semibold text-on-surface mb-1">
                      Peer-Reviewed Content
                    </p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      All clinical content undergoes multi-reviewer validation
                      before publication, with regular scheduled updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-[640px] mx-auto px-4 md:px-16">
          <h2 className="font-heading text-[32px] leading-[40px] tracking-[-0.01em] font-semibold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg leading-7 text-on-surface-variant mb-10">
            Join thousands of healthcare professionals who trust Mediatas for
            clinical information at the point of care.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-10 py-3 rounded-full text-sm font-medium hover:bg-surface-tint transition-all active:opacity-80"
          >
            Login to Mediatas <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
