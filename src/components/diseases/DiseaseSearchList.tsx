"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import type { DiseaseListItem } from "@/types/disease";

interface DiseaseSearchListProps {
  diseases: DiseaseListItem[];
}

export default function DiseaseSearchList({
  diseases,
}: DiseaseSearchListProps) {
  const [query, setQuery] = useState("");

  const filtered = diseases.filter(
    (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.description.toLowerCase().includes(query.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      d.category.toLowerCase().includes(query.toLowerCase())
  );

  const categories = [...new Set(diseases.map((d) => d.category))];

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-8">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-outline"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search diseases by name, category, or keyword..."
          className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base placeholder:text-outline-variant"
        />
      </div>

      {/* Category Pills */}
      {!query && (
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setQuery(cat)}
              className="bg-surface-container px-4 py-1 rounded-full text-xs font-semibold tracking-[0.02em] text-on-secondary-container hover:bg-surface-container-high transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-on-surface-variant mb-4">
        {filtered.length} disease{filtered.length !== 1 ? "s" : ""} found
        {query && (
          <button
            onClick={() => setQuery("")}
            className="ml-2 text-primary hover:underline"
          >
            Clear search
          </button>
        )}
      </p>

      {/* Disease List */}
      <div className="space-y-3">
        {filtered.map((disease) => (
          <Link
            key={disease.id}
            href={`/diseases/${disease.slug}`}
            className="block p-6 rounded-xl border border-outline-variant bg-surface-container-lowest hover:shadow-lg hover:border-primary transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-xl font-semibold text-on-surface group-hover:text-primary transition-colors mb-1">
                  {disease.title}
                </h3>
                <p className="text-on-surface-variant text-sm line-clamp-2 mb-3">
                  {disease.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {disease.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container px-3 py-0.5 rounded-full text-xs font-semibold text-on-secondary-container"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowRight
                size={20}
                className="text-outline group-hover:text-primary transition-colors shrink-0 mt-1"
              />
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant">
            <p className="text-lg mb-2">No diseases found</p>
            <p className="text-sm">
              Try a different search term or{" "}
              <button
                onClick={() => setQuery("")}
                className="text-primary hover:underline"
              >
                browse all
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
