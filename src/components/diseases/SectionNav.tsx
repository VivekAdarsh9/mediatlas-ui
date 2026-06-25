"use client";

import { useState, useEffect } from "react";

interface Section {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: Section[];
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState(
    sections[0]?.id || "overview"
  );

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll("section[id]");
      let current = "";
      sectionElements.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("id") || "";
        }
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-16 z-40 bg-surface py-4 border-b border-outline-variant overflow-x-auto no-scrollbar mb-12">
      <div className="flex gap-6 whitespace-nowrap min-w-max">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={
              activeSection === section.id
                ? "text-sm font-medium text-primary font-bold border-b-2 border-primary pb-2"
                : "text-sm font-medium text-on-surface-variant hover:text-primary transition-colors pb-2"
            }
          >
            {section.label}
          </a>
        ))}
      </div>
    </div>
  );
}
