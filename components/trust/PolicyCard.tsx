import React from 'react';
import Link from 'next/link';
import { PolicyCategory } from '../../lib/policyTypes';
import { getPolicyPath } from '../../constants/policies/slugs';
import {
  TrustLegalIcon,
  TrustAISafetyIcon,
  TrustGovernanceIcon,
  TrustComplianceIcon,
  ArrowRightIcon,
} from '../icons';

// ─── Category → icon mapping ──────────────────────────

const categoryIcon: Record<PolicyCategory, React.FC<{ className?: string }>> = {
  'Legal': TrustLegalIcon,
  'AI Safety & Trust and Safety': TrustAISafetyIcon,
  'Governance & Evaluation': TrustGovernanceIcon,
  'Trust Center & Compliance': TrustComplianceIcon,
};

const categoryAccent: Record<PolicyCategory, string> = {
  'Legal': 'text-slate-500 dark:text-slate-400',
  'AI Safety & Trust and Safety': 'text-zinc-500 dark:text-zinc-400',
  'Governance & Evaluation': 'text-stone-500 dark:text-stone-400',
  'Trust Center & Compliance': 'text-neutral-500 dark:text-neutral-400',
};

// ─── Props ────────────────────────────────────────────

interface PolicyCardProps {
  number: number;
  title: string;
  slug: string;
  category: PolicyCategory;
  version: string;
  isNew: boolean;
  description?: string;
}

/**
 * Card component for the Trust Center directory listing.
 * Shows category icon, policy number watermark, title, description, version.
 * Links to the full policy page.
 */
export const PolicyCard: React.FC<PolicyCardProps> = ({
  number,
  title,
  slug,
  category,
  version,
  isNew,
  description,
}) => {
  const Icon = categoryIcon[category] ?? TrustLegalIcon;
  const accent = categoryAccent[category] ?? 'text-gray-500';

  return (
    <Link
      href={`/trust/policies/${slug}`}
      className="group block border border-gray-200 dark:border-[#222]
        rounded-xl bg-white dark:bg-[#0A0A0A]
        hover:border-gray-400 dark:hover:border-[#444]
        shadow-sm hover:shadow-md
        transition-all duration-300 p-5 relative overflow-hidden
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2"
    >
      {/* Doc number watermark */}
      <span
        className="absolute top-3 right-3.5 text-[36px] font-black leading-none
          text-gray-100 dark:text-[#111] select-none pointer-events-none
          transition-colors duration-200
          group-hover:text-gray-200 dark:group-hover:text-[#1a1a1a]"
        aria-hidden="true"
      >
        {String(number).padStart(2, '0')}
      </span>

      <div className="relative z-10">
        {/* Category icon + new badge row */}
        <div className="flex items-center gap-2.5 mb-3">
          <Icon className={`w-4 h-4 shrink-0 ${accent}`} />
          <span className={`text-[10px] font-mono uppercase tracking-wider ${accent}`}>
            {category.split(' ')[0]}
          </span>
          {isNew && (
            <span className="ml-auto inline-flex items-center px-1.5 py-px rounded
              bg-black dark:bg-white text-white dark:text-black
              text-[9px] font-mono uppercase tracking-widest font-bold">
              New
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-[#EDEDED] mb-2 leading-snug
          group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-xs text-gray-500 dark:text-[#888] leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Footer: version + arrow */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-[#1a1a1a]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-[#888]">
            v{version}
          </span>
          <ArrowRightIcon
            className="ml-auto w-3.5 h-3.5 text-gray-300 dark:text-[#888]
              group-hover:text-gray-600 dark:group-hover:text-[#888]
              group-hover:translate-x-0.5
              transition-all duration-200"
          />
        </div>
      </div>
    </Link>
  );
};

export default PolicyCard;
