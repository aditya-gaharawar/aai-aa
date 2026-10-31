import React from 'react';
import Link from 'next/link';
import { getPolicyPath } from '../../constants/policies/slugs';

interface PolicyRef {
  number: number;
  title: string;
  id: string;
}

interface RelatedPoliciesProps {
  currentDoc: number;
  crossRefs: number[];
  referencedBy: number[];
  allPolicies: PolicyRef[];
}

/**
 * Bidirectional cross-reference block shown at the bottom of each policy page.
 * Displays two sections: policies this document references, and policies that
 * reference this document.
 */
export const RelatedPolicies: React.FC<RelatedPoliciesProps> = ({
  currentDoc,
  crossRefs,
  referencedBy,
  allPolicies,
}) => {
  const lookup = (docNumber: number) =>
    allPolicies.find((p) => p.number === docNumber);

  return (
    <div
      className="mt-16 pt-8 border-t border-gray-200 dark:border-[#222]
        transition-colors duration-200"
    >
      <h2 className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-[#888] mb-8">
        Related Policies
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Outbound references */}
        <div
          className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222]
            rounded-xl p-6 transition-colors duration-200"
        >
          <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-[#888] mb-4">
            This policy references
          </h3>

          {crossRefs.length > 0 ? (
            <ul className="space-y-2">
              {crossRefs.map((docNum) => {
                const policy = lookup(docNum);
                return (
                  <li key={docNum}>
                    <Link
                      href={getPolicyPath(docNum)}
                      className="block text-sm text-gray-700 dark:text-[#AAA]
                        hover:text-black dark:hover:text-white
                        transition-colors duration-200 leading-relaxed"
                    >
                      <span className="font-mono text-gray-400 dark:text-[#888] mr-1">
                        Doc.&nbsp;{docNum}
                      </span>
                      {policy ? (
                        <span>— {policy.title}</span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 dark:text-[#888] italic">None</p>
          )}
        </div>

        {/* Inbound references */}
        <div
          className="bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222]
            rounded-xl p-6 transition-colors duration-200"
        >
          <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-[#888] mb-4">
            Referenced by
          </h3>

          {referencedBy.length > 0 ? (
            <ul className="space-y-2">
              {referencedBy.map((docNum) => {
                const policy = lookup(docNum);
                return (
                  <li key={docNum}>
                    <Link
                      href={getPolicyPath(docNum)}
                      className="block text-sm text-gray-700 dark:text-[#AAA]
                        hover:text-black dark:hover:text-white
                        transition-colors duration-200 leading-relaxed"
                    >
                      <span className="font-mono text-gray-400 dark:text-[#888] mr-1">
                        Doc.&nbsp;{docNum}
                      </span>
                      {policy ? (
                        <span>— {policy.title}</span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-400 dark:text-[#888] italic">None</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedPolicies;
