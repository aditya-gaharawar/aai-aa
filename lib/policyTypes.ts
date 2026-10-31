export interface PolicySection {
  heading: string;
  content: string;
}

export interface PolicyData {
  id: string;        // slug
  number: number;    // 1–40
  title: string;
  category: PolicyCategory;
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  nextReview: string;
  isNew: boolean;
  sections: PolicySection[];
  crossRefs: number[];  // doc numbers this policy references
}

export type PolicyCategory =
  | 'Legal'
  | 'AI Safety & Trust and Safety'
  | 'Governance & Evaluation'
  | 'Trust Center & Compliance';

export interface CategoryGroup {
  name: PolicyCategory;
  description: string;
  docRange: [number, number];
}

export interface CrossRefIndexEntry {
  policy: string;
  riskLevels: string;
  keyCrossRefs: string;
  isNew?: boolean;
}
