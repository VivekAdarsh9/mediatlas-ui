"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PregnancyWeek } from "@/types/pregnancy";

interface WeeklyTrackerProps {
  weeks: PregnancyWeek[];
  currentWeek: number;
}

const formatWeek = (week: number) => `W${String(week).padStart(2, "0")}`;

export default function WeeklyTracker({ weeks, currentWeek }: WeeklyTrackerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 1 | -1) => {
    // Scroll by one card width (300px) + gap (24px)
    scrollRef.current?.scrollBy({ left: direction * 324, behavior: "smooth" });
  };

  return (
    <section className="py-12 max-w-[1200px] mx-auto px-4 md:px-16">
      <div className="flex justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="font-heading text-headline-lg font-semibold text-on-surface">
            Weekly Progress Tracker
          </h2>
          <p className="text-on-surface-variant">
            Follow your baby&apos;s development week by week.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            aria-label="Previous weeks"
            onClick={() => scroll(-1)}
            className="p-2 rounded-full border border-outline-variant hover:bg-surface-container-low transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next weeks"
            onClick={() => scroll(1)}
            className="p-2 rounded-full border border-outline-variant hover:bg-surface-container-low transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto py-4 px-2 -mx-2 no-scrollbar snap-x"
      >
        {weeks.map((w) => {
          const isCurrent = w.week === currentWeek;
          const isPast = w.week < currentWeek;

          if (isCurrent) {
            return (
              <div
                key={w.week}
                className="min-w-[300px] snap-start bg-primary-container text-white p-6 rounded-xl shadow-xl scale-105 z-10"
              >
                <div className="flex justify-between items-start mb-8">
                  <span className="font-heading text-4xl font-bold">
                    {formatWeek(w.week)}
                  </span>
                  <span className="bg-white/20 px-4 py-1 rounded-full text-label-sm font-semibold">
                    {w.sizeComparison}
                  </span>
                </div>
                <h3 className="font-heading text-headline-md font-semibold mb-1">
                  {w.title}
                </h3>
                <p className="text-white/80 mb-8">{w.description}</p>
                <button
                  type="button"
                  className="w-full py-2 bg-white text-primary rounded-lg text-label-md font-medium"
                >
                  View Full Report
                </button>
              </div>
            );
          }

          return (
            <div
              key={w.week}
              className="min-w-[300px] snap-start bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-8">
                <span
                  className={`font-heading text-4xl font-bold ${
                    isPast ? "text-primary" : "text-outline"
                  }`}
                >
                  {formatWeek(w.week)}
                </span>
                <span
                  className={`px-4 py-1 rounded-full text-label-sm font-semibold ${
                    isPast
                      ? "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {w.sizeComparison}
                </span>
              </div>
              <h3 className="font-heading text-headline-md font-semibold mb-1">
                {w.title}
              </h3>
              <p className="text-on-surface-variant mb-8">{w.description}</p>
              <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                <div
                  className={`h-full ${isPast ? "bg-primary" : "bg-outline-variant"}`}
                  style={{ width: `${w.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
