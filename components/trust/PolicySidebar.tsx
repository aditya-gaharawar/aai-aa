import React, { useState } from 'react';
import Link from 'next/link';
import { PolicyCategory } from '../../lib/policyTypes';
import { getPolicyPath } from '../../constants/policies/slugs';
import { categories } from '../../constants/policies/categories';
import { ChevronDownIcon } from '../icons';

interface SidebarPolicy {
  number: number;
  title: string;
  id: string;
  isNew: boolean;
  category: PolicyCategory;
}

interface PolicySidebarProps {
  policies: SidebarPolicy[];
  currentSlug?: string;
}

/**
 * Category-grouped sidebar navigation for the Trust Center policy reader.
 * Sticky on desktop, hidden on mobile. Shows collapsible category groups.
 * Current policy is highlighted with a left border accent.
 */
export const PolicySidebar: React.FC<PolicySidebarProps> = ({ policies, currentSlug }) => {
  // Group policies by category using canonical ordering
  const grouped = categories
    .map((cat) => ({
      name: cat.name,
      policies: policies.filter((p) => p.category === cat.name),
    }))
    .filter((g) => g.policies.length > 0);

  return (
    <nav
      aria-label="Policy navigation"
      className="policy-sidebar max-h-[calc(100vh-9rem)] overflow-y-auto pr-1"
    >
      <div className="space-y-5">
        {grouped.map((group) => (
          <CategoryGroup
            key={group.name}
            name={group.name}
            policies={group.policies}
            currentSlug={currentSlug}
          />
        ))}
      </div>
    </nav>
  );
};

const CategoryGroup: React.FC<{
  name: PolicyCategory;
  policies: SidebarPolicy[];
  currentSlug?: string;
}> = ({ name, policies, currentSlug }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full text-left group mb-1.5
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white rounded"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest
          text-gray-400 dark:text-[#888]
          group-hover:text-gray-600 dark:group-hover:text-[#888]
          transition-colors duration-150">
          {name.split(' ')[0]}
        </span>
        <ChevronDownIcon
          className={`w-3 h-3 text-gray-400 dark:text-[#888] transition-transform duration-200 ${
            isOpen ? 'rotate-0' : '-rotate-90'
          }`}
        />
      </button>

      {isOpen && (
        <ul className="space-y-0.5">
          {policies.map((policy) => {
            const isCurrent = currentSlug === policy.id;
            return (
              <li key={policy.number}>
                <Link
                  href={getPolicyPath(policy.number)}
                  className={`flex items-start gap-2 text-[12.5px] py-1.5 rounded-lg
                    transition-colors duration-150 leading-snug
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white ${
                    isCurrent
                      ? 'text-black dark:text-white font-semibold border-l-2 border-black dark:border-white pl-2.5 pr-2'
                      : 'text-gray-500 dark:text-[#888] hover:text-black dark:hover:text-white pl-3.5 pr-2'
                  }`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  <span className="font-mono text-[11px] text-gray-400 dark:text-[#888] shrink-0 mt-px">
                    {String(policy.number).padStart(2, '0')}
                  </span>
                  <span className="flex-1 min-w-0">
                    {policy.title}
                    {policy.isNew && (
                      <span className="ml-1.5 inline-flex items-center px-1.5 py-0 rounded
                        bg-black dark:bg-white text-white dark:text-black
                        text-[9px] font-mono uppercase tracking-widest font-bold align-middle">
                        New
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default PolicySidebar;
