"use client";

import { useState, useEffect, useCallback } from "react";

interface Section {
  id: string;
  label: string;
}

interface TestSectionNavProps {
  sections: Section[];
}

export default function TestSectionNav({ sections }: TestSectionNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute("id") || "");
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    document.querySelectorAll("section[id].scroll-mt-24").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      const target = document.querySelector(`#${sectionId}`);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    []
  );

  return (
    <nav className="flex flex-col gap-1">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={(e) => handleClick(e, section.id)}
          className={
            activeSection === section.id
              ? "text-base text-on-surface py-2 px-4 bg-surface-container-low rounded-lg font-medium border-l-4 border-primary text-primary"
              : "text-base text-on-surface-variant py-2 px-4 hover:bg-surface-container-low rounded-lg transition-all"
          }
        >
          {section.label}
        </a>
      ))}
    </nav>
  );
}