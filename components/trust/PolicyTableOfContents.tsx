import React from 'react';

interface PolicyTableOfContentsProps {
  sections: Array<{ heading: string }>;
  activeSection?: string;
}

/** Convert a heading string to a URL-safe anchor id */
function headingToId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * In-page table of contents with active-section highlighting.
 * Receives the current active section ID from PolicyPage via IntersectionObserver.
 */
export const PolicyTableOfContents: React.FC<PolicyTableOfContentsProps> = ({
  sections,
  activeSection,
}) => {
  if (!sections || sections.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-[#888] mb-4">
        On this page
      </p>

      <ul className="space-y-1.5">
        {sections.map((section) => {
          const id = headingToId(section.heading);
          const isActive = activeSection === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block text-[13px] leading-snug py-0.5 transition-all duration-150 ${
                  isActive
                    ? 'toc-link-active text-black dark:text-white font-medium'
                    : 'text-gray-500 dark:text-[#888] hover:text-black dark:hover:text-white'
                }`}
                aria-current={isActive ? 'true' : undefined}
              >
                {section.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PolicyTableOfContents;
