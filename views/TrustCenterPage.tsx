import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { PolicyData, PolicyCategory } from '../lib/policyTypes';
import { categories } from '../constants/policies/categories';
import { getPolicyPath } from '../constants/policies/slugs';
import {
  SearchIcon,
  TrustLegalIcon,
  TrustAISafetyIcon,
  TrustGovernanceIcon,
  TrustComplianceIcon,
  ArrowRightIcon,
  AlertTriangleIcon,
  EnvelopeIcon,
  FileTextIcon,
  GlobeIcon,
  CheckCircleIcon,
  EyeIcon,
} from '../components/icons';

// ─── Category Configuration ────────────────────────────

const categoryConfig: Record<PolicyCategory, {
  icon: React.FC<{ className?: string }>;
  plainLabel: string;
  plainDescription: string;
  accentClass: string;
}> = {
  'Legal': {
    icon: TrustLegalIcon,
    plainLabel: 'Legal',
    plainDescription: 'Terms, agreements, and rights that govern your use of WEBSPACEAI products and services.',
    accentClass: 'text-slate-600 dark:text-slate-400',
  },
  'AI Safety & Trust and Safety': {
    icon: TrustAISafetyIcon,
    plainLabel: 'AI Safety & Trust',
    plainDescription: 'How we build, evaluate, and monitor AI to remain safe, reliable, and aligned with human values.',
    accentClass: 'text-zinc-600 dark:text-zinc-400',
  },
  'Governance & Evaluation': {
    icon: TrustGovernanceIcon,
    plainLabel: 'Governance & Evaluation',
    plainDescription: 'Frameworks for independent benchmarking, evaluation, and structured oversight of our AI systems.',
    accentClass: 'text-stone-600 dark:text-stone-400',
  },
  'Trust Center & Compliance': {
    icon: TrustComplianceIcon,
    plainLabel: 'Compliance & Enterprise Trust',
    plainDescription: 'Security posture, government request policies, and enterprise-grade compliance documentation.',
    accentClass: 'text-neutral-600 dark:text-neutral-400',
  },
};

// ─── Trust Principles ─────────────────────────────────

const trustPrinciples = [
  {
    icon: EyeIcon,
    title: 'Radical Transparency',
    text: 'We publish our policies, reasoning, and limitations openly. Our 40-document policy suite includes cross-references, responsibilities, and reporting routes.',
  },
  {
    icon: CheckCircleIcon,
    title: 'Safety First',
    text: 'Our published framework defines four risk levels with increasing evaluation, approval, and review requirements.',
  },
  {
    icon: GlobeIcon,
    title: 'Human Accountability',
    text: 'AI decisions that affect people include meaningful human oversight. We define clear escalation paths and maintain audit trails.',
  },
  {
    icon: FileTextIcon,
    title: 'Documented Governance',
    text: 'Our governance is written down, versioned, and regularly reviewed. The policy suite sets out responsibilities and review procedures.',
  },
];

// ─── Contact / Reporting Strip ────────────────────────

const contactItems = [
  {
    icon: AlertTriangleIcon,
    title: 'Security Vulnerability',
    desc: 'Report a potential security issue under responsible disclosure.',
    href: '/trust/policies/14-vulnerability-disclosure-policy',
    linkText: 'Read disclosure policy',
    isExternal: false,
  },
  {
    icon: EnvelopeIcon,
    title: 'Privacy Requests',
    desc: 'Submit data subject access, deletion, or correction requests.',
    href: '/trust/policies/01-privacy-policy',
    linkText: 'Privacy policy',
    isExternal: false,
  },
  {
    icon: AlertTriangleIcon,
    title: 'Abuse & Safety Reports',
    desc: 'Report misuse, harmful content, or policy violations.',
    href: '/trust/policies/12-abuse-reporting-policy',
    linkText: 'Abuse reporting policy',
    isExternal: false,
  },
  {
    icon: GlobeIcon,
    title: 'Enterprise Inquiries',
    desc: 'Questions about enterprise trust, compliance, or security posture.',
    href: '/trust/policies/37-enterprise-security-overview',
    linkText: 'Enterprise overview',
    isExternal: false,
  },
];

// ─── Component ────────────────────────────────────────

interface TrustCenterPageProps {
  policies: PolicyData[];
}

const TrustCenterPage: React.FC<TrustCenterPageProps> = ({ policies }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<PolicyData[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Policies by category (exclude doc 34 which is the landing page itself)
  const activePolicies = useMemo(
    () => policies.filter((p) => p.number !== 34),
    [policies]
  );

  const policiesByCategory = useMemo(() => {
    const map: Record<string, PolicyData[]> = {};
    for (const cat of categories) {
      map[cat.name] = activePolicies.filter((p) => cat.docNumbers.includes(p.number));
    }
    return map;
  }, [activePolicies]);

  // Featured policies — highest-utility documents
  const featuredPolicyNumbers = [1, 8, 3, 11, 24, 29];
  const featuredPolicies = useMemo(
    () => featuredPolicyNumbers
      .map((n) => activePolicies.find((p) => p.number === n))
      .filter(Boolean) as PolicyData[],
    [activePolicies]
  );

  // Search logic
  const runSearch = useCallback((q: string) => {
    const query = q.trim().toLowerCase();
    if (!query) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    const results = activePolicies.filter((p) => {
      const inTitle = p.title.toLowerCase().includes(query);
      const inCategory = p.category.toLowerCase().includes(query);
      const inSection = p.sections.some((s) =>
        s.heading.toLowerCase().includes(query) ||
        s.content.toLowerCase().includes(query)
      );
      return inTitle || inCategory || inSection;
    });
    setSearchResults(results.slice(0, 8));
    setShowResults(true);
  }, [activePolicies]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => runSearch(search), 200);
    return () => clearTimeout(timer);
  }, [search, runSearch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <main
      className="min-h-screen bg-white dark:bg-[#050505] relative
        font-sans text-gray-900 dark:text-[#EDEDED]
        selection:bg-black/10 dark:selection:bg-white/20
        pt-24 pb-32 transition-colors duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-24 relative z-10">

        {/* ── HERO ─────────────────────────────────────────── */}
        <div className="mb-20 text-center flex flex-col items-center">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-[#888] mb-5">
            Trust Center
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-black dark:text-white mb-6 leading-tight max-w-[760px]">
            Transparency,{' '}
            <span className="text-gray-500 dark:text-[#999]">accountability,</span>{' '}
            and responsible AI
          </h1>
          <p className="text-gray-600 dark:text-[#888] text-base md:text-lg leading-relaxed max-w-[640px]">
            WEBSPACEAI's complete governance and policy suite — 40 documents covering legal agreements,
            AI safety, evaluation frameworks, and enterprise compliance.
          </p>
        </div>

        {/* ── SEARCH ───────────────────────────────────────── */}
        <div className="mb-20 max-w-2xl mx-auto">
          <div className="relative">
            <label htmlFor="trust-search" className="sr-only">Search policies</label>
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-[#888] pointer-events-none" />
            <input
              ref={searchRef}
              id="trust-search"
              type="search"
              placeholder="Search all 40 policies…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => search.trim() && setShowResults(true)}
              autoComplete="off"
              className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-[#0A0A0A]
                border border-gray-200 dark:border-[#2a2a2a] rounded-2xl
                text-sm text-gray-900 dark:text-[#EDEDED]
                placeholder-gray-400 dark:placeholder-[#555]
                focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white
                shadow-sm transition-colors duration-200"
            />
            {search && (
              <button
                onClick={() => { setSearch(''); setShowResults(false); searchRef.current?.focus(); }}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#888]
                  hover:text-gray-700 dark:hover:text-[#EDEDED] transition-colors duration-150 text-lg leading-none"
              >
                ×
              </button>
            )}

            {/* Search dropdown */}
            {showResults && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-2
                  bg-white dark:bg-[#0a0a0a]
                  border border-gray-200 dark:border-[#2a2a2a]
                  rounded-2xl shadow-xl z-50 overflow-hidden"
                role="listbox"
                aria-label="Search results"
              >
                {searchResults.length > 0 ? (
                  <>
                    <div className="px-4 pt-3 pb-2 border-b border-gray-100 dark:border-[#1a1a1a]">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#888]">
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <ul>
                      {searchResults.map((p) => (
                        <li key={p.number}>
                          <Link
                            href={getPolicyPath(p.number)}
                            onClick={() => { setSearch(''); setShowResults(false); }}
                            className="flex items-start gap-3 px-4 py-3
                              hover:bg-gray-50 dark:hover:bg-[#111]
                              transition-colors duration-150 group"
                            role="option"
                          >
                            <span className="text-[11px] font-mono text-gray-400 dark:text-[#888] mt-0.5 shrink-0 w-6">
                              {String(p.number).padStart(2, '0')}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-[#EDEDED]
                                group-hover:text-black dark:group-hover:text-white truncate transition-colors">
                                {p.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-[#999] mt-0.5">{p.category}</p>
                            </div>
                            <ArrowRightIcon className="w-3.5 h-3.5 text-gray-400 dark:text-[#888] shrink-0 mt-1
                              opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="px-4 py-3 border-t border-gray-100 dark:border-[#1a1a1a]">
                      <Link
                        href={`/trust/policies?q=${encodeURIComponent(search)}`}
                        onClick={() => setShowResults(false)}
                        className="text-xs font-medium text-gray-600 dark:text-[#888]
                          hover:text-black dark:hover:text-white transition-colors"
                      >
                        View all results in policy directory →
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-[#999] mb-1">No policies found for "{search}"</p>
                    <p className="text-xs text-gray-400 dark:text-[#888]">
                      Try a different term or{' '}
                      <Link
                        href="/trust/policies"
                        onClick={() => setShowResults(false)}
                        className="underline underline-offset-2 hover:text-gray-700 dark:hover:text-[#EDEDED]"
                      >
                        browse all policies
                      </Link>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── CATEGORY GRID ─────────────────────────────────── */}
        <div className="mb-24">
          <div className="mb-10">
            <h2 className="text-xl font-semibold tracking-tight text-black dark:text-white mb-2">
              Policy categories
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#888]">
              Navigate directly to any governance area.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const config = categoryConfig[cat.name as PolicyCategory];
              const Icon = config?.icon ?? TrustLegalIcon;
              const count = (policiesByCategory[cat.name] || []).length;

              return (
                <Link
                  key={cat.name}
                  href={`/trust/policies?cat=${encodeURIComponent(cat.name)}`}
                  className="group flex flex-col gap-4 p-6
                    border border-gray-200 dark:border-[#222]
                    rounded-2xl bg-white dark:bg-[#0A0A0A]
                    hover:border-gray-400 dark:hover:border-[#444]
                    shadow-sm hover:shadow-md
                    transition-all duration-300 focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  {/* Icon */}
                  <div className={`w-9 h-9 ${config?.accentClass ?? 'text-gray-500'} transition-colors duration-200`}>
                    <Icon className="w-full h-full" />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-black dark:text-white mb-1.5 leading-snug
                      group-hover:text-black dark:group-hover:text-white transition-colors">
                      {config?.plainLabel ?? cat.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-[#888] leading-relaxed line-clamp-3">
                      {config?.plainDescription ?? cat.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-[#1a1a1a]">
                    <span className="text-[11px] font-mono text-gray-400 dark:text-[#888]">
                      {count} document{count !== 1 ? 's' : ''}
                    </span>
                    <ArrowRightIcon className="w-3.5 h-3.5 text-gray-400 dark:text-[#888]
                      group-hover:text-gray-700 dark:group-hover:text-[#AAA]
                      transition-all duration-200 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── FEATURED POLICIES ─────────────────────────────── */}
        <div className="mb-24">
          <div className="mb-10">
            <h2 className="text-xl font-semibold tracking-tight text-black dark:text-white mb-2">
              Most requested
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#888]">
              The policies most often reviewed by users, developers, and enterprise customers.
            </p>
          </div>

          <div className="border border-gray-200 dark:border-[#222] rounded-2xl bg-white dark:bg-[#0A0A0A] overflow-hidden shadow-sm">
            {featuredPolicies.map((policy, idx) => {
              const Icon = categoryConfig[policy.category]?.icon ?? FileTextIcon;
              const isLast = idx === featuredPolicies.length - 1;
              return (
                <Link
                  key={policy.number}
                  href={getPolicyPath(policy.number)}
                  className={`flex items-center gap-4 px-6 py-4
                    hover:bg-gray-50 dark:hover:bg-[#111]
                    transition-colors duration-150 group
                    ${!isLast ? 'border-b border-gray-100 dark:border-[#1a1a1a]' : ''}`}
                >
                  {/* Doc number */}
                  <span className="text-[11px] font-mono text-gray-400 dark:text-[#888] w-7 shrink-0">
                    {String(policy.number).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div className={`w-4 h-4 shrink-0 ${categoryConfig[policy.category]?.accentClass ?? 'text-gray-500'}`}>
                    <Icon className="w-full h-full" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-[#EDEDED]
                      group-hover:text-black dark:group-hover:text-white truncate transition-colors">
                      {policy.title}
                    </p>
                  </div>

                  {/* Category pill */}
                  <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider
                    text-gray-400 dark:text-[#888] shrink-0">
                    {policy.category.split(' ')[0]}
                  </span>

                  {/* Arrow */}
                  <ArrowRightIcon className="w-3.5 h-3.5 text-gray-300 dark:text-[#888]
                    group-hover:text-gray-600 dark:group-hover:text-[#888]
                    transition-all duration-200 group-hover:translate-x-0.5 shrink-0" />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 text-right">
            <Link
              href="/trust/policies"
              className="text-xs font-medium text-gray-500 dark:text-[#999]
                hover:text-black dark:hover:text-white
                transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              Browse all {activePolicies.length} policies
              <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* ── TRUST PRINCIPLES ──────────────────────────────── */}
        <div className="mb-24">
          <div className="mb-10">
            <h2 className="text-xl font-semibold tracking-tight text-black dark:text-white mb-2">
              How we approach trust
            </h2>
            <p className="text-sm text-gray-600 dark:text-[#888]">
              Four principles that guide our governance and safety practices.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {trustPrinciples.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="flex gap-5 p-6
                    border border-gray-200 dark:border-[#222]
                    rounded-2xl bg-gray-50 dark:bg-[#0A0A0A]
                    transition-colors duration-200"
                >
                  <div className="shrink-0 mt-0.5 text-gray-500 dark:text-[#999]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-[#EDEDED] mb-2">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-[#888] leading-relaxed">
                      {p.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CONTACT / REPORTING STRIP ─────────────────────── */}
        <div className="mb-16">
          <div className="border border-gray-200 dark:border-[#222] rounded-2xl overflow-hidden bg-white dark:bg-[#0A0A0A] shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-[#1a1a1a]">
              <h2 className="text-sm font-semibold text-black dark:text-white">
                Contact & reporting
              </h2>
              <p className="text-xs text-gray-500 dark:text-[#999] mt-1">
                Use the appropriate policy to report security issues, privacy requests, or abuse.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                const isLastRow = idx >= contactItems.length - 2;
                const isLastCol = idx % 2 === 1;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`flex flex-col gap-3 p-5
                      hover:bg-gray-50 dark:hover:bg-[#111]
                      transition-colors duration-150 group
                      ${idx < contactItems.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-[#1a1a1a]' : ''}
                      ${idx === 1 ? 'sm:border-r-0 lg:border-r' : ''}
                      ${idx === 1 && !isLastRow ? 'sm:border-b lg:border-b-0' : ''}
                    `}
                  >
                    <div className="w-8 h-8 flex items-center justify-center
                      bg-gray-100 dark:bg-[#1a1a1a] rounded-lg
                      text-gray-600 dark:text-[#888]
                      group-hover:bg-gray-200 dark:group-hover:bg-[#222]
                      transition-colors duration-150 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-[#EDEDED] mb-1
                        group-hover:text-black dark:group-hover:text-white transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-[#999] leading-relaxed mb-2">
                        {item.desc}
                      </p>
                      <span className="text-xs font-medium text-gray-700 dark:text-[#AAA]
                        group-hover:text-black dark:group-hover:text-white
                        inline-flex items-center gap-1 transition-colors">
                        {item.linkText}
                        <ArrowRightIcon className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── COMPLETENESS NOTE ─────────────────────────────── */}
        <div className="mb-16 p-6 border border-gray-200 dark:border-[#222] rounded-2xl bg-gray-50 dark:bg-[#0A0A0A]">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-400 dark:text-[#888] mb-3">
            Policy suite — v2.1
          </p>
          <p className="text-sm text-gray-600 dark:text-[#888] leading-relaxed max-w-3xl">
            Version 2.1 includes 40 documents spanning legal, AI safety, governance, and compliance.
            Three new policies cover multimodal risk, environmental sustainability, and training-data provenance.
            All documents are cross-referenced and independently auditable.
          </p>
          <Link
            href="/trust/policies"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium
              text-gray-900 dark:text-[#EDEDED] hover:text-black dark:hover:text-white
              underline underline-offset-4 decoration-gray-300 dark:decoration-[#444]
              hover:decoration-gray-500 dark:hover:decoration-[#888]
              transition-colors duration-200"
          >
            View full policy directory
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── END MARKER ───────────────────────────────────── */}
        <div className="pt-8 pb-4 text-center text-gray-400 dark:text-[#333] text-[11px] font-mono uppercase tracking-widest flex items-center justify-center gap-2 border-t border-gray-100 dark:border-[#111]">
          <span aria-hidden="true">■</span>
          WEBSPACEAI Trust Center — Policy Suite v2.1
        </div>

      </div>
    </main>
  );
};

export default TrustCenterPage;
