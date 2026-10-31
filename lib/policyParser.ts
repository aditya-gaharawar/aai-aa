import fs from 'fs';
import path from 'path';
import { PolicyData, PolicySection, PolicyCategory } from './policyTypes';
import { docNumberToSlug } from '../constants/policies/slugs';
import { getCategoryForDoc, newDocNumbers } from '../constants/policies/categories';

const SECTION_HEADINGS = [
  'Purpose',
  'Scope',
  'Definitions',
  'Policy Statements',
  'Responsibilities',
  'Compliance Requirements',
  'Enforcement',
  'Reporting Process',
  'Exceptions Process',
  'Review Process',
  'Contact Information',
];

/**
 * Parse the source markdown into 40 structured PolicyData objects.
 * Called from getStaticProps at build time.
 */
export function parseAllPolicies(): PolicyData[] {
  const filePath = path.join(process.cwd(), 'WEBSPACEAI_Policy_Suite_v2.1_corrected.md');
  const raw = fs.readFileSync(filePath, 'utf-8');

  // Split on "## N. " headers (1–40)
  const policyBlocks: { number: number; title: string; body: string }[] = [];
  const headerRegex = /^## (\d+)\.\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  const matches: { index: number; number: number; title: string }[] = [];

  while ((match = headerRegex.exec(raw)) !== null) {
    const num = parseInt(match[1], 10);
    if (num >= 1 && num <= 40) {
      matches.push({
        index: match.index,
        number: num,
        title: match[2].replace(/\s*\*\(New\)\*\s*/, '').trim(),
      });
    }
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;
    const end = i < matches.length - 1 ? matches[i + 1].index : raw.indexOf('## Appendix:', start);
    const body = end > start ? raw.slice(start, end) : raw.slice(start);
    policyBlocks.push({
      number: matches[i].number,
      title: matches[i].title,
      body,
    });
  }

  return policyBlocks.map((block) => parseOnePolicy(block.number, block.title, block.body));
}

function parseOnePolicy(number: number, title: string, body: string): PolicyData {
  const slug = docNumberToSlug[number] || `${String(number).padStart(2, '0')}-unknown`;

  // Extract metadata from the body header
  const version = extractField(body, 'Version') || (number >= 38 ? '1.0' : '2.0');
  const effectiveDate = extractField(body, 'Effective Date') || 'July 4, 2026';
  const lastUpdated = extractField(body, 'Last Updated') || 'July 4, 2026';
  const nextReview = extractField(body, 'Next Review') || 'January 4, 2027';

  const sections = parseSections(body);
  const crossRefs = extractCrossRefs(body, number);

  return {
    id: slug,
    number,
    title,
    category: getCategoryForDoc(number),
    version,
    effectiveDate,
    lastUpdated,
    nextReview,
    isNew: newDocNumbers.has(number),
    sections,
    crossRefs,
  };
}

function extractField(body: string, field: string): string {
  // Match patterns like "**Version:** 2.0" or "**Effective Date:** July 4, 2026"
  // Also handle pipe-separated formats: "**Effective Date:** July 4, 2026 | **Last Updated:** ..."
  const patterns = [
    new RegExp(`\\*\\*${field}:\\*\\*\\s*(.+?)(?:\\s*\\||\\s*$)`, 'm'),
    new RegExp(`\\*\\*${field}:\\*\\*\\s*(.+)`, 'm'),
  ];
  for (const pattern of patterns) {
    const match = body.match(pattern);
    if (match) {
      return match[1].trim().replace(/\*+$/, '').trim();
    }
  }
  return '';
}

function parseSections(body: string): PolicySection[] {
  const sections: PolicySection[] = [];
  const lines = body.split('\n');

  let currentHeading = '';
  let currentContent: string[] = [];
  let inMetadata = true; // Skip the metadata block at the top

  for (const line of lines) {
    // Check if this is a ### section heading
    const sectionMatch = line.match(/^###\s+(.+)/);
    if (sectionMatch) {
      const heading = sectionMatch[1].trim();
      if (SECTION_HEADINGS.includes(heading)) {
        inMetadata = false;
        // Save previous section if exists
        if (currentHeading) {
          sections.push({
            heading: currentHeading,
            content: currentContent.join('\n').trim(),
          });
        }
        currentHeading = heading;
        currentContent = [];
        continue;
      }
    }

    // Skip metadata lines at the top
    if (inMetadata) continue;

    // Skip horizontal rules between policies
    if (line.trim() === '---') continue;

    if (currentHeading) {
      currentContent.push(line);
    }
  }

  // Don't forget the last section
  if (currentHeading) {
    sections.push({
      heading: currentHeading,
      content: currentContent.join('\n').trim(),
    });
  }

  return sections;
}

/**
 * Extract all (Doc. N) cross-references from the body text, excluding self-references.
 */
function extractCrossRefs(body: string, selfNumber: number): number[] {
  const refs = new Set<number>();
  const refRegex = /\bDoc\.?\s*(\d+)\b/gi;
  let match: RegExpExecArray | null;
  while ((match = refRegex.exec(body)) !== null) {
    const num = parseInt(match[1], 10);
    if (num >= 1 && num <= 40 && num !== selfNumber) {
      refs.add(num);
    }
  }
  return Array.from(refs).sort((a, b) => a - b);
}

/**
 * Parse the Appendix Cross-Reference Index table.
 */
export function parseAppendixIndex(): { policy: string; riskLevels: string; keyCrossRefs: string; isNew: boolean }[] {
  const filePath = path.join(process.cwd(), 'WEBSPACEAI_Policy_Suite_v2.1_corrected.md');
  const raw = fs.readFileSync(filePath, 'utf-8');

  const appendixStart = raw.indexOf('## Appendix: Cross-Reference Index');
  if (appendixStart === -1) return [];

  const appendixBody = raw.slice(appendixStart);
  const lines = appendixBody.split('\n');
  const entries: { policy: string; riskLevels: string; keyCrossRefs: string; isNew: boolean }[] = [];

  for (const line of lines) {
    // Match table rows (skip header and separator)
    if (line.startsWith('|') && !line.includes('---') && !line.includes('Policy') && !line.includes('Risk Levels')) {
      const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
      if (cells.length >= 3) {
        const policyName = cells[0].replace(/\*\*\[FIX — Added\]\*\*\s*/g, '').trim();
        const isNew = cells[0].includes('[FIX — Added]');
        entries.push({
          policy: policyName,
          riskLevels: cells[1],
          keyCrossRefs: cells[2],
          isNew,
        });
      }
    }
  }

  return entries;
}

/**
 * Build a reverse-reference index: for each doc, which other docs reference it.
 */
export function buildReverseIndex(policies: PolicyData[]): Record<number, number[]> {
  const reverseIndex: Record<number, number[]> = {};
  for (let i = 1; i <= 40; i++) {
    reverseIndex[i] = [];
  }
  for (const policy of policies) {
    for (const ref of policy.crossRefs) {
      if (reverseIndex[ref]) {
        reverseIndex[ref].push(policy.number);
      }
    }
  }
  // Sort each list
  for (const key of Object.keys(reverseIndex)) {
    reverseIndex[Number(key)].sort((a, b) => a - b);
  }
  return reverseIndex;
}

/**
 * Get a single policy by slug.
 */
export function getPolicyBySlug(slug: string): PolicyData | undefined {
  const all = parseAllPolicies();
  return all.find((p) => p.id === slug);
}

/**
 * Get a single policy by doc number.
 */
export function getPolicyByNumber(num: number): PolicyData | undefined {
  const all = parseAllPolicies();
  return all.find((p) => p.number === num);
}
