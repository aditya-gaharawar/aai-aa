import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PolicyData, PolicyCategory } from '../lib/policyTypes';
import { categories } from '../constants/policies/categories';
import { getPolicyPath } from '../constants/policies/slugs';
import FixBadge from '../components/trust/FixBadge';
import { SearchIcon, ArrowRightIcon } from '../components/icons';

// ─── TYPES ────────────────────────────────────────────

interface PolicyDirectoryPageProps {
  policies: PolicyData[];
  appendixIndex: Array<{
    policy: string;
    riskLevels: string;
    keyCrossRefs: string;
    isNew: boolean;
  }>;
}

// ─── COMPONENT ────────────────────────────────────────

const PolicyDirectoryPage: React.FC<PolicyDirectoryPageProps> = ({ policies, appendixIndex }) => {
  const router = useRouter();

  // Initialise from URL query params
  const initialSearch = (router.query.q as string) || '';
  const initialCat = (router.query.cat as string) || 'All';

  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState<PolicyCategory | 'All'>(
    initialCat as PolicyCategory | 'All'
  );

  // Sync URL params → state when router is ready
  useEffect(() => {
    if (!router.isReady) return;
    const q = (router.query.q as string) || '';
    const cat = (router.query.cat as string) || 'All';
    setSearch(q);
    setActiveCategory(cat as PolicyCategory | 'All');
  }, [router.isReady, router.query.q, router.query.cat]);

  // Update URL when filters change
  const updateUrl = (q: string, cat: PolicyCategory | 'All') => {
    const params: Record<string, string> = {};
    if (q) params.q = q;
    if (cat !== 'All') params.cat = cat;
    router.replace({ pathname: '/trust/policies', query: params }, undefined, { shallow: true });
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    updateUrl(value, activeCategory);
  };

  const handleCategory = (cat: PolicyCategory | 'All') => {
    setActiveCategory(cat);
    updateUrl(search, cat);
  };

  const filteredPolicies = useMemo(() => {
    let result = policies.filter((p) => p.number !== 34);
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          String(p.number).includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sections.some(
            (s) => s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
          )
      );
    }
    return result;
  }, [policies, search, activeCategory]);

  const groupedPolicies = useMemo(() => {
    const map: Record<string, PolicyData[]> = {};
    for (const cat of categories) {
      const catPolicies = filteredPolicies.filter((p) => p.category === cat.name);
      if (catPolicies.length > 0) {
        map[cat.name] = catPolicies;
      }
    }
    return map;
  }, [filteredPolicies]);

  const categoryNames: Array<PolicyCategory | 'All'> = [
    'All',
    ...categories.map((c) => c.name),
  ];

  const totalVisible = filteredPolicies.length;
  const totalAll = policies.filter((p) => p.number !== 34).length;
  const isFiltered = search.trim() || activeCategory !== 'All';

  return (
    <main
      className="min-h-screen bg-white dark:bg-[#050505] relative
        font-sans text-gray-900 dark:text-[#EDEDED]
        selection:bg-black/10 dark:selection:bg-white/20
        pt-24 pb-32 transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-24 relative z-10">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="mb-12 flex flex-col items-start">
          <Link
            href="/trust"
            className="text-xs font-mono text-gray-500 dark:text-[#888] uppercase tracking-widest mb-6
              hover:text-gray-900 dark:hover:text-[#EDEDED] transition-colors duration-200
              inline-flex items-center gap-1.5"
          >
            <span aria-hidden="true">←</span> Trust Center
          </Link>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tighter text-black dark:text-white mb-4 leading-tight">
            Policy Directory
          </h1>
          <p className="text-gray-600 dark:text-[#888] text-base leading-relaxed max-w-[640px]">
            All {totalAll} WEBSPACEAI policies — searchable by title, content, and category.
          </p>
        </div>

        {/* ── SEARCH & FILTERS ────────────────────────────────── */}
        <div className="mb-10 space-y-4">

          {/* Search input */}
          <div className="relative max-w-xl">
            <label htmlFor="policy-search" className="sr-only">Search policies</label>
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-[#888] pointer-events-none" />
            <input
              id="policy-search"
              type="search"
              placeholder="Search by title, content, or number…"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              autoComplete="off"
              className="w-full pl-11 pr-10 py-3
                bg-white dark:bg-[#0A0A0A]
                border border-gray-200 dark:border-[#2a2a2a] rounded-xl
                text-sm text-gray-900 dark:text-[#EDEDED]
                placeholder-gray-400 dark:placeholder-[#555]
                focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white
                shadow-sm transition-colors duration-200"
            />
            {search && (
              <button
                onClick={() => handleSearch('')}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2
                  text-gray-400 dark:text-[#888] hover:text-gray-700 dark:hover:text-[#EDEDED]
                  transition-colors text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categoryNames.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === 'All'
                ? totalAll
                : (policies.filter((p) => p.number !== 34 && p.category === cat).length);
              return (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white ${
                    isActive
                      ? 'text-black dark:text-white bg-white dark:bg-[#0A0A0A] border-gray-300 dark:border-[#444] shadow-sm'
                      : 'text-gray-500 dark:text-[#888] bg-transparent border-transparent hover:text-black dark:hover:text-white hover:border-gray-200 dark:hover:border-[#333]'
                  }`}
                >
                  {cat === 'All' ? 'All' : cat.split(' ')[0]}
                  <span className={`ml-1.5 font-mono text-[10px] ${isActive ? 'text-gray-500 dark:text-[#888]' : 'text-gray-400 dark:text-[#888]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Result count */}
          {isFiltered && (
            <p className="text-xs text-gray-500 dark:text-[#888]">
              Showing <span className="font-semibold text-gray-700 dark:text-[#AAA]">{totalVisible}</span> of {totalAll} policies
              {search && <> matching <span className="font-semibold">"{search}"</span></>}
            </p>
          )}
        </div>

        {/* ── POLICY LISTING ─────────────────────────────────── */}
        <div className="mb-24">
          {Object.keys(groupedPolicies).length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-5xl font-black text-gray-100 dark:text-[#111] mb-6 select-none" aria-hidden="true">
                ?
              </div>
              <p className="text-base font-medium text-gray-900 dark:text-[#EDEDED] mb-2">
                No policies found
              </p>
              <p className="text-sm text-gray-500 dark:text-[#999] mb-6 max-w-xs">
                Try a different search term or clear the category filter to see all documents.
              </p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); updateUrl('', 'All'); }}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-[#333]
                  bg-white dark:bg-[#0A0A0A] text-sm font-medium
                  text-gray-700 dark:text-[#EDEDED]
                  hover:border-gray-400 dark:hover:border-[#555]
                  transition-colors duration-200"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            Object.entries(groupedPolicies).map(([categoryName, catPolicies]) => (
              <div key={categoryName} className="mb-14 last:mb-0">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xs font-mono text-gray-500 dark:text-[#888] uppercase tracking-widest">
                    {categoryName}
                  </h2>
                  <span className="text-xs font-mono text-gray-400 dark:text-[#888]">
                    {catPolicies.length} doc{catPolicies.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {/* Desktop: Table */}
                <div className="hidden md:block border border-gray-200 dark:border-[#222] rounded-2xl bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-sm">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-[#1a1a1a]">
                        <th scope="col" className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#888] px-6 py-3.5 w-16">Doc</th>
                        <th scope="col" className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#888] px-6 py-3.5">Title</th>
                        <th scope="col" className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#888] px-6 py-3.5 w-24">Version</th>
                        <th scope="col" className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#888] px-6 py-3.5 w-28">Status</th>
                        <th scope="col" className="px-6 py-3.5 w-10"><span className="sr-only">Open</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {catPolicies.map((policy) => (
                        <tr
                          key={policy.number}
                          className="border-b border-gray-100 dark:border-[#1a1a1a] last:border-0
                            hover:bg-gray-50 dark:hover:bg-[#111] transition-colors duration-150 group"
                        >
                          <td className="px-6 py-4 text-sm font-mono text-gray-400 dark:text-[#888]">
                            {String(policy.number).padStart(2, '0')}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              href={getPolicyPath(policy.number)}
                              className="text-sm font-medium text-gray-900 dark:text-[#EDEDED]
                                hover:text-black dark:hover:text-white transition-colors duration-150
                                focus-visible:underline"
                            >
                              {policy.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-gray-500 dark:text-[#999]">
                            v{policy.version}
                          </td>
                          <td className="px-6 py-4">
                            {policy.isNew && <FixBadge text="New in v2.0" />}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={getPolicyPath(policy.number)}
                              aria-label={`Open ${policy.title}`}
                              className="text-gray-300 dark:text-[#888]
                                hover:text-gray-700 dark:hover:text-[#888]
                                group-hover:text-gray-600 dark:group-hover:text-[#666]
                                transition-colors duration-150 inline-flex items-center"
                            >
                              <ArrowRightIcon className="w-4 h-4" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile: Cards */}
                <div className="md:hidden space-y-2.5">
                  {catPolicies.map((policy) => (
                    <Link
                      key={policy.number}
                      href={getPolicyPath(policy.number)}
                      className="flex items-center gap-4 p-4
                        border border-gray-200 dark:border-[#222] rounded-xl
                        bg-white dark:bg-[#0A0A0A]
                        hover:border-gray-400 dark:hover:border-[#444]
                        shadow-sm transition-all duration-200 group"
                    >
                      <span className="text-xs font-mono text-gray-400 dark:text-[#888] shrink-0 w-7">
                        {String(policy.number).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-medium text-gray-900 dark:text-[#EDEDED] truncate
                            group-hover:text-black dark:group-hover:text-white transition-colors">
                            {policy.title}
                          </p>
                          {policy.isNew && <FixBadge text="New" />}
                        </div>
                        <p className="text-xs font-mono text-gray-400 dark:text-[#888]">v{policy.version}</p>
                      </div>
                      <ArrowRightIcon className="w-3.5 h-3.5 text-gray-300 dark:text-[#888]
                        group-hover:text-gray-600 dark:group-hover:text-[#666]
                        transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* ── CROSS-REFERENCE INDEX ──────────────────────────── */}
        {appendixIndex.length > 0 && !search && activeCategory === 'All' && (
          <div className="mb-24">
            <div className="mb-10">
              <h2 className="text-xl font-semibold tracking-tight text-black dark:text-white mb-2">
                Cross-reference index
              </h2>
              <p className="text-sm text-gray-600 dark:text-[#888]">
                Risk-level mappings and cross-references across all policy documents.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-[#222] rounded-2xl bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-sm">
              <div className="table-responsive">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-[#1a1a1a]">
                      <th scope="col" className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#888] px-6 py-3.5">Policy</th>
                      <th scope="col" className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#888] px-6 py-3.5">Risk Levels</th>
                      <th scope="col" className="text-left text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#888] px-6 py-3.5">Key Cross-refs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appendixIndex.map((entry, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-100 dark:border-[#1a1a1a] last:border-0
                          hover:bg-gray-50 dark:hover:bg-[#111] transition-colors duration-150"
                      >
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-900 dark:text-[#EDEDED]">{entry.policy}</span>
                            {entry.isNew && <FixBadge text="New" />}
                          </div>
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-600 dark:text-[#888]">{entry.riskLevels}</td>
                        <td className="px-6 py-3 text-sm text-gray-600 dark:text-[#888] font-mono">{entry.keyCrossRefs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── END MARKER ────────────────────────────────────── */}
        <div className="pt-8 pb-4 text-center text-gray-400 dark:text-[#333]
          text-[11px] font-mono uppercase tracking-widest
          flex items-center justify-center gap-2
          border-t border-gray-100 dark:border-[#111]">
          <span aria-hidden="true">■</span> End of Policy Directory
        </div>

      </div>
    </main>
  );
};

export default PolicyDirectoryPage;
