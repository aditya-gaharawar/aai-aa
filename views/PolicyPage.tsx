import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { PolicyData } from '../lib/policyTypes';
import { getPolicyPath } from '../constants/policies/slugs';
import { categories } from '../constants/policies/categories';
import FixBadge from '../components/trust/FixBadge';
import PolicyMetaBar from '../components/trust/PolicyMetaBar';
import PolicySectionComponent from '../components/trust/PolicySection';
import PolicySidebar from '../components/trust/PolicySidebar';
import PolicyTableOfContents from '../components/trust/PolicyTableOfContents';
import RelatedPolicies from '../components/trust/RelatedPolicies';
import { ArrowRightIcon, FileTextIcon } from '../components/icons';

// ─── TYPES ────────────────────────────────────────────

interface PolicyPageProps {
  policy: PolicyData;
  allPolicies: PolicyData[];
  reverseIndex: Record<number, number[]>;
}

// ─── COMPONENT ────────────────────────────────────────

const PolicyPage: React.FC<PolicyPageProps> = ({ policy, allPolicies, reverseIndex }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Build sidebar data (exclude doc 34)
  const sidebarPolicies = allPolicies
    .filter((p) => p.number !== 34)
    .map((p) => ({
      number: p.number,
      title: p.title,
      id: p.id,
      isNew: p.isNew,
      category: p.category,
    }));

  // Get prev/next for sequential navigation
  const sortedPolicies = allPolicies
    .filter((p) => p.number !== 34)
    .sort((a, b) => a.number - b.number);
  const currentIndex = sortedPolicies.findIndex((p) => p.number === policy.number);
  const prevPolicy = currentIndex > 0 ? sortedPolicies[currentIndex - 1] : null;
  const nextPolicy = currentIndex < sortedPolicies.length - 1 ? sortedPolicies[currentIndex + 1] : null;

  // Section IDs for anchor linking
  const sectionId = (heading: string) =>
    heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    if (policy.sections.length === 0) return;

    const ids = policy.sections.map((s) => sectionId(s.heading));
    const observers: IntersectionObserver[] = [];

    const callback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    });

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [policy.sections]);

  // Close mobile nav on outside click
  useEffect(() => {
    if (!isMobileNavOpen) return;
    const handler = (e: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
        setIsMobileNavOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isMobileNavOpen]);

  return (
    <main
      className="min-h-screen bg-white dark:bg-[#050505] relative
        font-sans text-gray-900 dark:text-[#EDEDED]
        selection:bg-black/10 dark:selection:bg-white/20
        pt-24 pb-32 transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-24 relative z-10">

        {/* ── BREADCRUMB & MOBILE CONTROLS ──────────────────── */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3
          border-b border-gray-100 dark:border-white/5 pb-4">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-[#888] uppercase tracking-widest flex-wrap">
              <li>
                <Link href="/trust" className="hover:text-gray-900 dark:hover:text-[#EDEDED] transition-colors duration-150">
                  Trust Center
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300 dark:text-[#333]">/</li>
              <li>
                <Link href="/trust/policies" className="hover:text-gray-900 dark:hover:text-[#EDEDED] transition-colors duration-150">
                  Policies
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300 dark:text-[#333]">/</li>
              <li className="text-gray-400 dark:text-[#888]" aria-current="page">
                Doc {String(policy.number).padStart(2, '0')}
              </li>
            </ol>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Browse policies button */}
            <div className="relative" ref={mobileNavRef}>
              <button
                onClick={() => { setIsMobileNavOpen(!isMobileNavOpen); setIsMobileTocOpen(false); }}
                aria-expanded={isMobileNavOpen}
                aria-controls="mobile-nav-panel"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-widest
                  text-gray-700 dark:text-gray-300
                  bg-white dark:bg-black
                  border border-gray-200 dark:border-[#333] rounded-lg
                  hover:border-gray-400 dark:hover:border-[#555]
                  shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
              >
                <FileTextIcon className="w-3.5 h-3.5" />
                <span>Policies</span>
                <span className="text-[10px]" aria-hidden="true">{isMobileNavOpen ? '▲' : '▼'}</span>
              </button>

              {isMobileNavOpen && (
                <div
                  id="mobile-nav-panel"
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#0A0A0A]
                    border border-gray-200 dark:border-[#222] rounded-2xl
                    shadow-2xl z-50 max-h-[60vh] overflow-y-auto p-4"
                >
                  <div className="mb-3 pb-3 border-b border-gray-100 dark:border-[#1a1a1a]">
                    <Link
                      href="/trust/policies"
                      onClick={() => setIsMobileNavOpen(false)}
                      className="text-xs font-semibold text-gray-900 dark:text-[#EDEDED] hover:text-black dark:hover:text-white transition-colors"
                    >
                      ← All Policies
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {categories.map((cat) => {
                      const catPolicies = sidebarPolicies.filter((p) => p.category === cat.name);
                      if (catPolicies.length === 0) return null;
                      return (
                        <div key={cat.name}>
                          <p className="text-[10px] font-mono uppercase tracking-wider text-gray-400 dark:text-[#888] mb-2">
                            {cat.name}
                          </p>
                          <ul className="space-y-0.5">
                            {catPolicies.map((p) => {
                              const isActive = p.id === policy.id;
                              return (
                                <li key={p.number}>
                                  <Link
                                    href={getPolicyPath(p.number)}
                                    onClick={() => setIsMobileNavOpen(false)}
                                    className={`flex items-center gap-2 text-xs py-1.5 px-2 rounded-lg transition-colors ${
                                      isActive
                                        ? 'text-black dark:text-white font-semibold bg-gray-100 dark:bg-[#1a1a1a]'
                                        : 'text-gray-600 dark:text-[#888] hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#111]'
                                    }`}
                                  >
                                    <span className="font-mono text-[10px] text-gray-400 dark:text-[#888] shrink-0 w-5">
                                      {String(p.number).padStart(2, '0')}
                                    </span>
                                    <span className="truncate">{p.title}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* On this page (mobile TOC) */}
            {policy.sections.length > 0 && (
              <button
                onClick={() => { setIsMobileTocOpen(!isMobileTocOpen); setIsMobileNavOpen(false); }}
                aria-expanded={isMobileTocOpen}
                aria-controls="mobile-toc-panel"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-widest
                  text-gray-700 dark:text-gray-300
                  bg-white dark:bg-black
                  border border-gray-200 dark:border-[#333] rounded-lg
                  hover:border-gray-400 dark:hover:border-[#555]
                  shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
              >
                <span>On this page</span>
                <span className="text-[10px]" aria-hidden="true">{isMobileTocOpen ? '▲' : '▼'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile TOC expanded panel */}
        {isMobileTocOpen && policy.sections.length > 0 && (
          <div
            id="mobile-toc-panel"
            className="lg:hidden mb-6 p-4 border border-gray-200 dark:border-[#222]
              rounded-xl bg-gray-50 dark:bg-[#0A0A0A]"
          >
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-[#888] mb-3">
              On this page
            </p>
            <ul className="space-y-2">
              {policy.sections.map((s) => {
                const id = sectionId(s.heading);
                const isActive = activeSection === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={() => setIsMobileTocOpen(false)}
                      className={`text-sm transition-colors duration-150 block ${
                        isActive
                          ? 'text-black dark:text-white font-semibold'
                          : 'text-gray-600 dark:text-[#888] hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {s.heading}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* ── THREE-COLUMN LAYOUT ───────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

          {/* Left Sidebar (desktop) */}
          <aside className="hidden lg:block w-[240px] xl:w-[260px] shrink-0">
            <div className="sticky top-28">
              <div className="mb-4 pb-4 border-b border-gray-100 dark:border-[#1a1a1a]">
                <Link
                  href="/trust"
                  className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-[#888]
                    hover:text-gray-900 dark:hover:text-[#EDEDED] transition-colors duration-150
                    inline-flex items-center gap-1.5"
                >
                  <span aria-hidden="true">←</span> Trust Center
                </Link>
              </div>
              <PolicySidebar
                policies={sidebarPolicies}
                currentSlug={policy.id}
              />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 max-w-[760px]">

            {/* ── POLICY HEADER ─────────────────────────────── */}
            <header className="mb-10">
              {/* Category label */}
              <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-[#888] mb-4">
                {policy.category}
              </p>

              {/* Title + New badge */}
              <div className="flex items-start gap-4 mb-5">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white leading-tight flex-1">
                  {policy.title}
                </h1>
                {policy.isNew && (
                  <div className="mt-2 shrink-0">
                    <FixBadge text="New in v2.0" />
                  </div>
                )}
              </div>

              {/* Metadata bar */}
              <PolicyMetaBar
                version={policy.version}
                effectiveDate={policy.effectiveDate}
                lastUpdated={policy.lastUpdated}
                nextReview={policy.nextReview}
                isNew={policy.isNew}
              />
            </header>

            {/* ── TABLE OF CONTENTS (desktop inline, shown when no right TOC) ── */}
            {/* We show the inline TOC only on medium screens, hide on large where right sidebar shows */}
            {policy.sections.length > 2 && (
              <div className="mb-10 xl:hidden">
                <div className="border border-gray-200 dark:border-[#222] rounded-xl bg-gray-50 dark:bg-[#0A0A0A] p-5 shadow-sm">
                  <PolicyTableOfContents
                    sections={policy.sections.map((s) => ({ heading: s.heading }))}
                    activeSection={activeSection}
                  />
                </div>
              </div>
            )}

            {/* ── POLICY SECTIONS ───────────────────────────── */}
            <div className="space-y-0">
              {policy.sections.map((section) => (
                <PolicySectionComponent
                  key={section.heading}
                  heading={section.heading}
                  content={section.content}
                  id={sectionId(section.heading)}
                />
              ))}
            </div>

            {/* ── RELATED POLICIES ──────────────────────────── */}
            {(policy.crossRefs.length > 0 ||
              (reverseIndex[policy.number] && reverseIndex[policy.number].length > 0)) && (
              <div className="mt-16">
                <RelatedPolicies
                  currentDoc={policy.number}
                  crossRefs={policy.crossRefs}
                  referencedBy={reverseIndex[policy.number] || []}
                  allPolicies={allPolicies}
                />
              </div>
            )}

            {/* ── PREV / NEXT NAVIGATION ────────────────────── */}
            <nav
              aria-label="Policy navigation"
              className="mt-16 pt-8 border-t border-gray-200 dark:border-[#1a1a1a] grid grid-cols-2 gap-3"
            >
              {prevPolicy ? (
                <Link
                  href={getPolicyPath(prevPolicy.number)}
                  className="group border border-gray-200 dark:border-[#222]
                    rounded-xl bg-white dark:bg-[#0A0A0A] p-4
                    hover:border-gray-400 dark:hover:border-[#444]
                    shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="text-[10px] font-mono text-gray-400 dark:text-[#888] uppercase tracking-widest mb-1.5">
                    ← Previous
                  </div>
                  <div className="text-xs font-medium text-gray-900 dark:text-[#EDEDED]
                    group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2">
                    <span className="font-mono text-gray-400 dark:text-[#888] mr-1">
                      {String(prevPolicy.number).padStart(2, '0')}
                    </span>
                    {prevPolicy.title}
                  </div>
                </Link>
              ) : <div />}

              {nextPolicy ? (
                <Link
                  href={getPolicyPath(nextPolicy.number)}
                  className="group border border-gray-200 dark:border-[#222]
                    rounded-xl bg-white dark:bg-[#0A0A0A] p-4 text-right
                    hover:border-gray-400 dark:hover:border-[#444]
                    shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="text-[10px] font-mono text-gray-400 dark:text-[#888] uppercase tracking-widest mb-1.5">
                    Next →
                  </div>
                  <div className="text-xs font-medium text-gray-900 dark:text-[#EDEDED]
                    group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2">
                    <span className="font-mono text-gray-400 dark:text-[#888] mr-1">
                      {String(nextPolicy.number).padStart(2, '0')}
                    </span>
                    {nextPolicy.title}
                  </div>
                </Link>
              ) : <div />}
            </nav>

            {/* ── END MARKER ────────────────────────────────── */}
            <div className="mt-16 pt-6 pb-4 text-center text-gray-300 dark:text-[#2a2a2a]
              text-[11px] font-mono uppercase tracking-widest
              flex items-center justify-center gap-2
              border-t border-gray-100 dark:border-[#0f0f0f]">
              <span aria-hidden="true">■</span> End of document — Doc {String(policy.number).padStart(2, '0')} · v{policy.version}
            </div>
          </div>

          {/* Right TOC Sidebar (desktop xl only) */}
          {policy.sections.length > 2 && (
            <aside className="hidden xl:block w-[200px] shrink-0">
              <div className="sticky top-28">
                <PolicyTableOfContents
                  sections={policy.sections.map((s) => ({ heading: s.heading }))}
                  activeSection={activeSection}
                />
              </div>
            </aside>
          )}

        </div>
      </div>
    </main>
  );
};

export default PolicyPage;
