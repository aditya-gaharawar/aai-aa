import React from 'react';

interface PolicyMetaBarProps {
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  nextReview: string;
  isNew: boolean;
}

/**
 * Compact metadata row displayed under the H1 on each policy page.
 * Shows version, effective date, last-updated, and next review date.
 * Optionally shows a green "New" badge for recently added policies.
 */
export const PolicyMetaBar: React.FC<PolicyMetaBarProps> = ({
  version,
  effectiveDate,
  lastUpdated,
  nextReview,
  isNew,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4 mb-8 border-b border-gray-200 dark:border-[#222] transition-colors duration-200">
      {isNew && (
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-md
            bg-emerald-100 dark:bg-emerald-900/30
            text-emerald-800 dark:text-emerald-300
            border border-emerald-200 dark:border-emerald-800/50
            text-[10px] font-mono uppercase tracking-widest font-bold"
        >
          New
        </span>
      )}

      <MetaItem label="Version" value={version} />
      <Separator />
      <MetaItem label="Effective" value={effectiveDate} />
      <Separator />
      <MetaItem label="Updated" value={lastUpdated} />
      <Separator />
      <MetaItem label="Review" value={nextReview} />
    </div>
  );
};

const MetaItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center gap-1.5">
    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-[#888]">
      {label}:
    </span>
    <span className="text-sm font-medium text-gray-800 dark:text-[#CCC]">
      {value}
    </span>
  </div>
);

const Separator: React.FC = () => (
  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-300 dark:bg-[#333] select-none" aria-hidden="true" />
);

export default PolicyMetaBar;
