import { PolicyCategory } from '../../lib/policyTypes';

export interface CategoryDefinition {
  name: PolicyCategory;
  description: string;
  docNumbers: number[];
}

export const categories: CategoryDefinition[] = [
  {
    name: 'Legal',
    description: 'Foundational legal agreements governing the use of WEBSPACEAI Services.',
    docNumbers: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    name: 'AI Safety & Trust and Safety',
    description: 'Policies governing responsible AI development, deployment, and safety practices.',
    docNumbers: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 38, 40],
  },
  {
    name: 'Governance & Evaluation',
    description: 'Frameworks for evaluating, benchmarking, and governing AI systems.',
    docNumbers: [27, 28, 29, 30, 31, 32, 33],
  },
  {
    name: 'Trust Center & Compliance',
    description: 'Security compliance, government transparency, and enterprise trust documentation.',
    docNumbers: [34, 35, 36, 37, 39],
  },
];

/** Map from doc number to its primary category */
export function getCategoryForDoc(docNumber: number): PolicyCategory {
  if (docNumber >= 1 && docNumber <= 7) return 'Legal';
  if (docNumber >= 8 && docNumber <= 26) return 'AI Safety & Trust and Safety';
  if (docNumber >= 27 && docNumber <= 33) return 'Governance & Evaluation';
  if (docNumber >= 34 && docNumber <= 37) return 'Trust Center & Compliance';
  // New v2.0 docs — assigned to their natural category
  if (docNumber === 38) return 'AI Safety & Trust and Safety';
  if (docNumber === 39) return 'Trust Center & Compliance';
  if (docNumber === 40) return 'AI Safety & Trust and Safety';
  return 'Legal';
}

/** Docs that carry the "New" badge */
export const newDocNumbers = new Set([38, 39, 40]);
