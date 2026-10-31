import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { getPolicyPath } from '../../constants/policies/slugs';
import { FixBadge } from './FixBadge';

interface PolicySectionProps {
  heading: string;
  content: string;
  id?: string;
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
 * Process raw policy content string into React elements.
 * Handles: cross-references, fix badges, bold text, lists, paragraphs.
 */
function processContent(content: string): ReactNode[] {
  const paragraphs = content.split(/\n\n+/);
  const elements: ReactNode[] = [];

  paragraphs.forEach((paragraph, pIdx) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return;

    const lines = trimmed.split('\n');

    // Render policy matrices as semantic tables rather than raw pipe-delimited text.
    if (lines.length > 1 && lines[0].trim().startsWith('|') && /^\s*\|?\s*:?-{3,}/.test(lines[1])) {
      const cells = (line: string) => line.trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
      const headings = cells(lines[0]);
      elements.push(<div key={`table-${pIdx}`} className="policy-matrix" tabIndex={0} role="region" aria-label="Policy requirements table"><table><thead><tr>{headings.map((cell,i)=><th scope="col" key={i}>{processInline(cell)}</th>)}</tr></thead><tbody>{lines.slice(2).filter(line=>line.trim().startsWith('|')).map((line,i)=><tr key={i}>{cells(line).map((cell,j)=><td key={j}>{processInline(cell)}</td>)}</tr>)}</tbody></table></div>);
      return;
    }

    // Check if this block is a list (all lines start with "- " or are blank)
    const isListBlock = lines.every(
      (line) => line.trim().startsWith('- ') || line.trim() === ''
    );

    if (isListBlock) {
      const listItems = lines
        .filter((line) => line.trim().startsWith('- '))
        .map((line, i) => (
          <li
            key={`${pIdx}-li-${i}`}
            className="flex items-start gap-3 text-sm text-gray-700 dark:text-[#AAA] leading-relaxed"
          >
            <span className="mt-[0.45rem] w-1.5 h-1.5 rounded-full bg-gray-300 dark:text-[#888] dark:bg-[#444] shrink-0" />
            <span>{processInline(line.trim().slice(2))}</span>
          </li>
        ));

      elements.push(
        <ul key={`p-${pIdx}`} className="space-y-2 my-4 policy-prose">
          {listItems}
        </ul>
      );
    } else {
      elements.push(
        <p
          key={`p-${pIdx}`}
          className="text-sm text-gray-700 dark:text-[#AAA] leading-relaxed mb-4 last:mb-0 policy-prose"
        >
          {processInline(trimmed)}
        </p>
      );
    }
  });

  return elements;
}

/**
 * Process inline formatting within a text string.
 * Returns mixed array of strings and React nodes.
 */
function processInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let keyCounter = 0;

  while (remaining.length > 0) {
    const patterns: Array<{
      regex: RegExp;
      handler: (match: RegExpExecArray) => ReactNode;
    }> = [
      {
        regex: /[a-zA-Z0-9._%+-]+@webspaceai\.in\b/,
        handler: (match) => <a key={`email-${keyCounter++}`} href={`mailto:${match[0]}`}>{match[0]}</a>,
      },
      {
        // **[FIX — ...]** → FixBadge
        regex: /\*\*\[FIX\s*[—–-]\s*(.+?)\]\*\*/i,
        handler: (match) => (
          <FixBadge key={`fix-${keyCounter++}`} text={match[0].replace(/\*\*/g, '')} />
        ),
      },
      {
        // (Doc. N) → Link
        regex: /\(Doc\.?\s*(\d+)\)/,
        handler: (match) => {
          const docNum = parseInt(match[1], 10);
          return (
            <Link
              key={`docref-${keyCounter++}`}
              href={getPolicyPath(docNum)}
              className="policy-cross-ref text-gray-700 dark:text-[#AAA]"
            >
              Doc.&nbsp;{docNum}
            </Link>
          );
        },
      },
      {
        // **bold text**
        regex: /\*\*(.+?)\*\*/,
        handler: (match) => (
          <strong
            key={`bold-${keyCounter++}`}
            className="font-semibold text-gray-900 dark:text-[#EDEDED]"
          >
            {match[1]}
          </strong>
        ),
      },
    ];

    let earliestIndex = Infinity;
    let earliestMatch: RegExpExecArray | null = null;
    let earliestHandler: ((match: RegExpExecArray) => ReactNode) | null = null;

    for (const { regex, handler } of patterns) {
      const match = regex.exec(remaining);
      if (match && match.index < earliestIndex) {
        earliestIndex = match.index;
        earliestMatch = match;
        earliestHandler = handler;
      }
    }

    if (earliestMatch && earliestHandler) {
      if (earliestIndex > 0) {
        nodes.push(remaining.slice(0, earliestIndex));
      }
      nodes.push(earliestHandler(earliestMatch));
      remaining = remaining.slice(earliestIndex + earliestMatch[0].length);
    } else {
      nodes.push(remaining);
      break;
    }
  }

  return nodes;
}

/**
 * Renders a single policy section with heading and processed content.
 * Supports anchor linking, cross-references, fix badges, and markdown-like formatting.
 */
export const PolicySectionBlock: React.FC<PolicySectionProps> = ({
  heading,
  content,
  id,
}) => {
  const anchorId = id || headingToId(heading);
  const [copyStatus,setCopyStatus] = useState('');

  return (
    <section
      id={anchorId}
      className="scroll-mt-28 mb-10 pb-10 border-b border-gray-100 dark:border-[#111] last:border-0"
    >
      {/* Section heading with copy-link anchor */}
      <h2 className="text-lg font-semibold text-black dark:text-white mb-5 flex items-baseline gap-2 group/heading">
        <a
          href={`#${anchorId}`}
          className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-150 decoration-gray-300 dark:decoration-[#333]"
        >
          {heading}
        </a>
        <button type="button" className="policy-copy-anchor" aria-label={`Copy link to ${heading}`} onClick={async()=>{try{await navigator.clipboard.writeText(window.location.origin+window.location.pathname+`#${anchorId}`);setCopyStatus('Section link copied.');}catch{setCopyStatus('Copy this section’s address from the browser.');}}}>#</button>
      </h2>

      <span className="sr-only" role="status">{copyStatus}</span>
      <div>{processContent(content)}</div>
    </section>
  );
};

export default PolicySectionBlock;
