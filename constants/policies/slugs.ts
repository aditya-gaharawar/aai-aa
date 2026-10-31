/**
 * Canonical doc-number → slug map.
 * Used by cross-reference linking throughout the Trust Center.
 */
export const docNumberToSlug: Record<number, string> = {
  1: '01-privacy-policy',
  2: '02-terms-of-service',
  3: '03-acceptable-use-policy',
  4: '04-cookie-policy',
  5: '05-copyright-ip-policy',
  6: '06-data-processing-addendum',
  7: '07-data-retention-deletion-policy',
  8: '08-responsible-ai-policy',
  9: '09-ai-usage-policy',
  10: '10-content-policy',
  11: '11-security-policy',
  12: '12-abuse-reporting-policy',
  13: '13-accessibility-statement',
  14: '14-vulnerability-disclosure-policy',
  15: '15-bug-bounty-program-policy',
  16: '16-model-release-policy',
  17: '17-safety-evaluation-policy',
  18: '18-red-teaming-policy',
  19: '19-prompt-injection-security-policy',
  20: '20-autonomous-agent-policy',
  21: '21-synthetic-media-policy',
  22: '22-hallucination-disclosure-policy',
  23: '23-human-oversight-policy',
  24: '24-ai-safety-framework',
  25: '25-model-retirement-policy',
  26: '26-research-ethics-policy',
  27: '27-benchmark-methodology-policy',
  28: '28-evaluation-framework-policy',
  29: '29-transparency-report-framework',
  30: '30-model-card-template',
  31: '31-system-card-template',
  32: '32-safety-report-template',
  33: '33-incident-disclosure-policy',
  34: '34-trust-center-landing-page',
  35: '35-security-compliance-overview',
  36: '36-government-request-policy',
  37: '37-enterprise-security-overview',
  38: '38-multimodal-risk-policy',
  39: '39-environmental-sustainability-policy',
  40: '40-training-data-provenance-supply-chain-policy',
};

/** Reverse map: slug → doc number */
export const slugToDocNumber: Record<string, number> = Object.fromEntries(
  Object.entries(docNumberToSlug).map(([num, slug]) => [slug, Number(num)])
);

/** Get the policy URL path for a given doc number */
export function getPolicyPath(docNumber: number): string {
  const slug = docNumberToSlug[docNumber];
  if (!slug) return '#';
  // Doc 34 is the Trust Center landing page itself
  if (docNumber === 34) return '/trust';
  return `/trust/policies/${slug}`;
}

/** All valid slugs (for getStaticPaths) */
export const allSlugs = Object.values(docNumberToSlug).filter(
  (slug) => slug !== '34-trust-center-landing-page'
);
