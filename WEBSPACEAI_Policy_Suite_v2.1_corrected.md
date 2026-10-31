# WEBSPACEAI Legal, Trust & Safety, Governance, and Compliance Documentation Suite (v2.0 - Revised)

This revision incorporates fixes for all high, medium, and minor lapses identified in the July 4, 2026 gap review, including CBRN red lines, output liability, agentic enforcement, training opt-out/unlearning, cross-policy consistency, emerging risk coverage (multimodal, supply chain, environmental), accessibility monitoring, incident materiality thresholds, and dual governing-law fallback for global enterprise customers.

**Versioning Policy:** All documents now use semantic versioning (MAJOR.MINOR.PATCH). MAJOR changes require Governance Review Board approval; MINOR changes require owning-team-lead approval; PATCH (typo/formatting) changes require no approval but are logged. A master Cross-Reference Index is maintained by Policy Counsel to ensure defined terms and risk-level mappings stay synchronized across documents.

---

## 1. Privacy Policy

**Version:** 2.0
**Effective Date:** July 4, 2026
**Last Updated:** July 4, 2026
**Next Review:** January 4, 2027

### Purpose
This Privacy Policy explains how WEBSPACEAI ("WEBSPACEAI," "we," "us," or "our") collects, uses, discloses, and protects personal data when individuals use AnswerAI, WSAI CODE, Trainer One, WEBSPACEAI Cloud, and other WEBSPACEAI products (collectively, the "Services").

### Scope
Applies to all visitors, registered users, enterprise customers, and API developers interacting with WEBSPACEAI Services worldwide, regardless of jurisdiction.

### Definitions
- **Personal Data** — information relating to an identified or identifiable natural person.
- **Processing** — any operation performed on Personal Data.
- **Controller / Processor** — as defined under GDPR Article 4; see also the Data Processing Addendum (Doc. 6).
- **Training Data Opt-Out** — a user election excluding their content from model training or fine-tuning datasets.
- **Verifiable Unlearning** — a documented technical process demonstrating that opted-out or deleted data has been excluded from, or removed from the influence of, trained model weights and derivative fine-tuning datasets, to the extent technically feasible.

### Policy Statements
WEBSPACEAI collects account information, usage data (prompts, outputs, session metadata), device/log data, and voluntarily submitted content. Data is used to provide, secure, and improve Services, comply with legal obligations, and communicate with users. WEBSPACEAI does not sell personal data.

**[FIX — Default Training Posture]** Consumer-tier accounts default to **no model training** on user content. Users may opt in to contribute content to training via explicit account settings. Enterprise and API customers default to no training regardless of tier, consistent with the Data Processing Addendum.

**[FIX — Verifiable Unlearning Commitment]** Where a user opts out of training or requests deletion, WEBSPACEAI commits to: (a) excluding the content from all future training runs within 30 days; (b) documenting exclusion in the training data pipeline's audit log; (c) where content has already influenced a released model and exact weight-level removal is not technically feasible, applying best-available mitigation (fine-tuning exclusion, output filtering, or model retraining at the next scheduled cycle) and disclosing this limitation to the user upon request. This directly addresses GDPR Article 17 (right to erasure) and storage limitation principles.

International transfers rely on Standard Contractual Clauses or equivalent mechanisms.

### Responsibilities
Chief Privacy Officer owns this policy. Product implements privacy-by-design and default no-training settings. Engineering maintains the unlearning pipeline and audit logs. DPO oversees regulatory compliance.

### Compliance Requirements
Aligns with GDPR, CCPA/CPRA, India's DPDP Act, and the EU AI Act's data governance provisions for training data (Article 10). Annual privacy impact assessments required for new data-processing features. Unlearning pipeline is audited semi-annually by Security.

### Enforcement
Non-compliance results in disciplinary action up to termination; vendor violations result in access revocation.

### Reporting Process
Data rights requests: privacy@webspaceai.in. Acknowledged within 5 business days; resolved within 30 days.

### Exceptions Process
Exceptions require written approval from CPO and Legal, documented with risk justification and a remediation timeline not exceeding 60 days.

### Review Process
Reviewed every 6 months (increased from annual) given evolving training-data regulation, or upon material regulatory change.

### Contact Information
privacy@webspaceai.in | dpo@webspaceai.in | https://webspaceai.in/trust

---

## 2. Terms of Service

**Version:** 2.0
**Effective Date:** July 4, 2026
**Last Updated:** July 4, 2026
**Next Review:** January 4, 2027

### Purpose
Governs access to and use of AnswerAI, WSAI CODE, Trainer One, WEBSPACEAI Cloud, and future products.

### Scope
Applies to all users accessing Services via web, mobile, or API, across free, paid, and enterprise tiers, globally.

### Definitions
- **Account, Content, API** — as previously defined.
- **Output IP Indemnity** — WEBSPACEAI's contractual commitment to defend enterprise customers against certain third-party IP claims arising from Service outputs (see below).

### Policy Statements
- **User Eligibility:** 13+ or applicable digital age of consent.
- **Account Responsibilities:** Users safeguard credentials and are responsible for account activity.
- **Subscription Terms:** Auto-renewal; fees non-refundable except as required by law.
- **Intellectual Property:** WEBSPACEAI retains rights to models, software, and trademarks; users retain rights to input content and, subject to these Terms, own eligible outputs.

**[FIX — Output Liability]** WEBSPACEAI provides a **limited Output IP Indemnity** for enterprise and API customers on paid plans: WEBSPACEAI will defend and indemnify against third-party claims alleging that an unmodified model output infringes copyright, provided the customer (a) used the Service in compliance with the Acceptable Use Policy, (b) did not intentionally prompt for infringing reproduction, and (c) promptly notifies WEBSPACEAI of the claim. This indemnity is capped at fees paid in the preceding 12 months and does not apply to free-tier consumer use. Consumer users are advised outputs may inadvertently resemble third-party content and should independently verify before commercial use; see Copyright & IP Policy Section on Output Provenance.

- **API Usage:** Subject to rate limits and the Acceptable Use Policy.
- **Enterprise Usage:** Governed by order forms and the DPA.
- **Termination:** Suspension or termination for policy violations, with notice where feasible.
- **Limitation of Liability:** Capped at fees paid in preceding 12 months, excluding gross negligence or willful misconduct.
- **Indemnification:** Users indemnify WEBSPACEAI against claims from misuse.

**[FIX — Governing Law / Dual-Track]** These Terms are governed by the laws of India, with disputes resolved via binding arbitration in Pune, Maharashtra, for consumer and non-enterprise users. **For enterprise customers domiciled in the EU, UK, or United States, WEBSPACEAI offers an optional governing-law and venue rider** (Delaware law with AAA arbitration in New York for US entities; Irish law with ICC arbitration in Dublin for EU/UK entities) negotiated at contract signing, to reduce friction in cross-border enterprise adoption.

### Responsibilities
Legal owns these Terms; Product/Engineering ensure compliance; Support enforces account actions; Enterprise Legal manages governing-law riders.

### Compliance Requirements
Enterprise agreements incorporate the DPA, Enterprise Security Overview, and applicable governing-law rider.

### Enforcement
Warnings, suspension, termination, or legal action for violations.

### Reporting Process
legal@webspaceai.in

### Exceptions Process
Custom contractual terms require Legal and executive sign-off within 15 business days of request.

### Review Process
Reviewed every 6 months.

### Contact Information
legal@webspaceai.in | https://webspaceai.in

---

## 3. Acceptable Use Policy

**Version:** 2.0
**Effective Date:** July 4, 2026
**Last Updated:** July 4, 2026
**Next Review:** January 4, 2027

### Purpose
Defines prohibited and restricted uses of WEBSPACEAI Services.

### Scope
Applies to all users across all products and API access.

### Definitions
- **Prohibited Use / High-Risk Use** — as previously defined; cross-referenced in AI Safety Framework Risk Levels (Doc. 24).
- **CBRN-Adjacent Query** — any request seeking synthesis routes, weaponization guidance, acquisition pathways, or uplift for chemical, biological, radiological, or nuclear weapons, including dual-use research framed as benign.

### Policy Statements
Users may not use the Services to generate content that facilitates violence, terrorism, or weapons development; exploit or endanger minors; conduct fraud, phishing, or impersonation; violate IP or privacy rights; generate non-consensual intimate imagery or defamatory synthetic media; circumvent safety mitigations; or operate autonomous agents evading human oversight.

**[FIX — Explicit CBRN Red Lines]** The following are explicitly and categorically prohibited with no exceptions, including for research or educational framing: (a) synthesis or acquisition instructions for biological, chemical, radiological, or nuclear weapons or their precursors; (b) uplift to pathogen enhancement, gain-of-function guidance outside licensed institutional contexts, or novel toxin design; (c) technical uplift to cyberweapons targeting critical infrastructure. Dual-use queries (e.g., legitimate virology, pharmacology, nuclear engineering education) are routed through an **expert review gate**: outputs in these domains are checked against a maintained restricted-topic classifier, and borderline cases are escalated to the AI Safety Research Lead's domain-expert panel before a response is generated or the pattern is permanently blocked.

**[FIX — Foreseeable Use Exclusion, per EU AI Act guidance]** Each product's documentation must expressly and consistently exclude out-of-scope high-risk uses (e.g., medical diagnosis, credit scoring, employment decisions, law enforcement) unless a specific enterprise agreement and compliance review authorizes such use, to avoid default high-risk classification under emerging AI regulation.

High-risk uses (medical, legal, financial, critical-infrastructure) require human review and enterprise agreements per the AI Usage Policy.

### Responsibilities
Trust & Safety owns enforcement; Product implements guardrails and classifiers; Legal reviews edge cases; AI Safety Research Lead chairs the CBRN expert review panel.

### Compliance Requirements
Automated and human review monitor flagged content. CBRN classifier accuracy is audited quarterly.

### Enforcement
Content removal, rate limiting, suspension, termination, or law enforcement referral. CBRN violations trigger immediate account termination and, where required by law, mandatory reporting.

### Reporting Process
abuse@webspaceai.in | trust@webspaceai.in

### Exceptions Process
No exceptions permitted for CBRN red lines. Other narrowly scoped exceptions require Trust & Safety approval within 10 business days, documented in the Exceptions Register.

### Review Process
Reviewed quarterly (increased from semi-annual) given evolving threat landscape.

### Contact Information
trust@webspaceai.in | abuse@webspaceai.in | safety@webspaceai.in

---

## 4. Cookie Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** July 4, 2027

### Purpose
Explains cookie and tracking technology use across webspaceai.in and answerai.in.

### Scope
All visitors and users of WEBSPACEAI web properties.

### Definitions
Cookies; Similar Technologies (local storage, pixels, SDKs).

### Policy Statements
Strictly necessary, performance, and functional cookie categories are used; non-essential cookies require consent via banner. Users manage preferences via browser settings or in-product manager. Third-party analytics operate under data processing agreements.

### Responsibilities
Privacy team owns categorization; Engineering implements consent tooling.

### Compliance Requirements
Complies with GDPR ePrivacy rules and applicable Indian data protection rules.

### Enforcement
Non-compliant scripts removed upon audit discovery.

### Reporting Process
privacy@webspaceai.in

### Exceptions Process
New tracking technologies require Privacy review before deployment.

### Review Process
**[FIX — Cadence Correction]** Every 6 months, aligned with the Privacy Policy's revised review cycle (previously listed as Annual, which no longer matched Doc. 1's 6-month cadence).

### Contact Information
privacy@webspaceai.in

---

## 5. Copyright & Intellectual Property Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Governs IP rights, ownership, and copyright claims related to WEBSPACEAI Services.

### Scope
WEBSPACEAI trademarks, software, models, documentation, and user-generated content.

### Definitions
IP Rights; DMCA Notice.

### Policy Statements
WEBSPACEAI owns rights to models, software, and brand assets. Users retain ownership of input content and, subject to the Terms of Service, own eligible outputs.

**[FIX — Outbound Output Provenance]** In addition to inbound takedown handling, WEBSPACEAI commits to: (a) embedding C2PA-compatible provenance metadata in generated image, audio, and video outputs identifying them as AI-generated; (b) maintaining a best-effort training-data filtering process to reduce verbatim reproduction of copyrighted text and code beyond permitted fair-use/license thresholds; (c) providing enterprise customers an output-similarity check tool (beta) to flag high-similarity matches to known copyrighted works before commercial use; (d) referencing the Output IP Indemnity terms in the Terms of Service (Doc. 2) for paid enterprise/API customers.

WEBSPACEAI responds to valid infringement notices by removing infringing content and may terminate repeat infringer accounts.

### Responsibilities
Legal owns IP enforcement; Trust & Safety processes takedowns; Research Engineering maintains training-data filtering and similarity-check tooling.

### Compliance Requirements
Notices must meet DMCA Section 512 or equivalent statutory requirements.

### Enforcement
Confirmed infringement results in removal and potential termination.

### Reporting Process
legal@webspaceai.in ("Copyright Notice")

### Exceptions Process
Counter-notices reviewed within 10 business days.

### Review Process
Annual, or upon major model release affecting output-similarity risk.

### Contact Information
legal@webspaceai.in

---

## 6. Data Processing Addendum (DPA)

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Supplements the Terms of Service; governs processing of personal data on behalf of enterprise Controllers.

### Scope
Enterprise and API customers where WEBSPACEAI acts as Processor or Sub-processor.

### Definitions
Controller; Processor; Sub-processor (GDPR Article 4).

### Policy Statements
Processing occurs only per documented instructions; technical/organizational measures include encryption, access controls, and logging. Sub-processors are engaged under equivalent-protection agreements. Breach notification to customers occurs within 72 hours of discovery. Data is deleted or returned upon termination unless legally required to retain.

**[FIX — Training Data Exclusion Guarantee]** Enterprise and API customer data is contractually guaranteed excluded from model training and fine-tuning datasets by default, consistent with the Privacy Policy's default no-training posture, unless a separate written training-data license is executed.

### Responsibilities
Legal and Privacy jointly own DPA terms; Security maintains safeguards; Enterprise team manages customer-specific addenda.

### Compliance Requirements
Aligns with GDPR Article 28, UK GDPR; current sub-processor list published at the Trust Center, updated within 5 business days of any change with 30-day customer objection window for material additions.

### Enforcement
Breach of DPA terms triggers incident response per the Incident Disclosure Policy.

### Reporting Process
dpo@webspaceai.in

### Exceptions Process
Customer-specific amendments require Legal approval.

### Review Process
Annual or upon regulatory change.

### Contact Information
dpo@webspaceai.in | legal@webspaceai.in

---

## 7. Data Retention & Deletion Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Defines retention periods and deletion procedures for data processed across Services.

### Scope
Account data, conversation logs, model training data, infrastructure logs.

### Definitions
Retention Period; Verifiable Unlearning (see Privacy Policy, Doc. 1).

### Policy Statements
Account data retained for account life plus 30 days. Conversation/usage logs retained up to 24 months unless opted out or deletion requested earlier — **opt-out and deletion requests now trigger the Verifiable Unlearning process defined in the Privacy Policy**, not just storage-layer deletion. Security/audit logs retained 12 months. Enterprise customers may configure custom retention windows. Deleted data purged from production within 30 days, backups within 90 days.

### Responsibilities
Privacy and Security jointly own retention schedules; Engineering implements automated deletion and unlearning pipelines.

### Compliance Requirements
Complies with GDPR storage limitation principles and legal holds; unlearning pipeline audited semi-annually.

### Enforcement
Systems failing deletion SLAs flagged for remediation and audit.

### Reporting Process
privacy@webspaceai.in

### Exceptions Process
Legal holds may override standard timelines with Legal approval.

### Review Process
Every 6 months.

### Contact Information
privacy@webspaceai.in

---

## 8. Responsible AI Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Establishes WEBSPACEAI's commitments to responsible AI development, in service of "Solving Tomorrow with Intelligence."

### Scope
All WEBSPACEAI Research activities, model development, and product deployment.

### Definitions
Responsible AI.

### Policy Statements
Commitments: rigorous safety evaluation before release; human oversight of autonomous systems; transparency through model/system cards; fairness testing; privacy-preserving design; post-deployment monitoring. **[FIX]** This policy is now the top-level anchor explicitly cross-referencing the AI Safety Framework's four risk levels (Doc. 24) — every downstream governance policy (Red Teaming, Evaluation Framework, Safety Evaluation, Autonomous Agent) must state which risk levels its controls apply to, verified via the Cross-Reference Index maintained by Policy Counsel.

### Responsibilities
AI Governance Lead and Chief AI Safety Officer jointly own this policy; Policy Counsel maintains cross-reference mapping.

### Compliance Requirements
All model releases pass Safety Evaluation and AI Safety Framework gates.

### Enforcement
Governance Review Board blocks non-compliant releases.

### Reporting Process
safety@webspaceai.in

### Exceptions Process
Requires AI Safety Research Lead and Chief AI Governance Officer sign-off.

### Review Process
Every 6 months.

### Contact Information
safety@webspaceai.in

---

## 9. AI Usage Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Sets expectations for appropriate use of AnswerAI, WSAI CODE, Trainer One, and related capabilities.

### Scope
All end users, developers, and enterprise customers.

### Definitions
Generative Output.

### Policy Statements
Users must review outputs before relying on them in high-stakes contexts. Users may not misrepresent AI content as human-created where material, or operate autonomous agents without human checkpoints for consequential actions (see Autonomous Agent Policy, Doc. 20 for the now-precise definition of "consequential action"). Enterprise deployments must configure human-in-the-loop controls for high-risk workflows, and must expressly document any excluded high-risk use cases per the Acceptable Use Policy's foreseeable-use exclusion requirement.

### Responsibilities
Product and Trust & Safety own usage guidance.

### Compliance Requirements
Aligns with Responsible AI and Human Oversight Policies.

### Enforcement
Feature restriction or suspension for misuse.

### Reporting Process
trust@webspaceai.in

### Exceptions Process
enterprise@webspaceai.in approval required.

### Review Process
Every 6 months.

### Contact Information
trust@webspaceai.in

---

## 10. Content Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Defines standards for content generated, uploaded, or shared through Services.

### Scope
Text, image, audio, video, and code content.

### Definitions
Restricted Content.

### Policy Statements
Prohibits CSAM, non-consensual intimate imagery, credible threats of violence, and hate content. Restricted content permitted with age verification and safeguards. Synthetic media depicting real individuals follows the Synthetic Media Policy.

**[FIX — Multimodal Risk Coverage]** Content moderation classifiers now explicitly cover cross-modal jailbreak vectors: image-embedded text instructions, audio-based prompt injection, and video-frame manipulation designed to bypass text-based filters. See new Multimodal Risk Policy (Doc. 38) for detailed controls.

### Responsibilities
Trust & Safety and Content Moderation own enforcement; Engineering maintains multimodal classifier tooling.

### Compliance Requirements
Moderation systems audited quarterly, including multimodal-specific bias and accuracy testing.

### Enforcement
Removal; repeat violations lead to account action.

### Reporting Process
abuse@webspaceai.in

### Exceptions Process
Research/journalistic exceptions require Trust & Safety approval.

### Review Process
Quarterly.

### Contact Information
abuse@webspaceai.in

---

## 11. Security Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Defines security controls protecting WEBSPACEAI systems, infrastructure, and customer data.

### Scope
All infrastructure, employees, contractors, vendors.

### Definitions
Security Incident.

### Policy Statements
- **Encryption:** TLS 1.2+ in transit; AES-256 at rest.
- **Authentication:** MFA mandatory for employees/admins; SSO/SAML for enterprise.
- **Access Control:** RBAC, least privilege.
- **Logging & Monitoring:** Centralized, 24/7 automated. **[FIX]** Audit logs for agentic and administrative actions are now cryptographically signed (hash-chained) to ensure tamper-evidence, per the Autonomous Agent Policy enforcement upgrade.
- **Incident Response:** Documented IR plan with executive escalation.
- **Infrastructure Security:** Hardened, segmented, regularly pen-tested. **[FIX]** Mandatory penetration testing cadence increased to quarterly for agentic-feature infrastructure (WSAI CODE execution environments), semi-annual for other infrastructure.
- **Vendor Security:** Pre-onboarding assessments.
- **Employee Security:** Background checks, training, device management.
- **Data Protection:** Classification-based protection tiers.
- **Business Continuity:** Annual DR testing with defined RTO/RPO.

### Responsibilities
CISO owns this policy; all employees complete annual security training.

### Compliance Requirements
Aligned with SOC 2, ISO 27001, and ISO 42001 (AI management systems).

### Enforcement
Access revocation and disciplinary action for violations.

### Reporting Process
security@webspaceai.in

### Exceptions Process
CISO written approval with compensating controls.

### Review Process
Every 6 months and after major incidents.

### Contact Information
security@webspaceai.in | https://webspaceai.in/security

---

## 12. Abuse Reporting Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Establishes the process for reporting misuse or abuse of Services.

### Scope
All users, third parties, and employees.

### Definitions
Abuse.

### Policy Statements
Reports submitted via in-product tools or abuse@webspaceai.in. Severe harms (CSAM, violence threats) triaged within 24 hours; others within 5 business days. Anonymous reporting supported where legal; retaliation prohibited.

### Responsibilities
Trust & Safety owns triage; Legal engaged for law enforcement referrals.

### Compliance Requirements
Child safety reports referred to authorities (e.g., NCMEC) as legally required.

### Enforcement
Removal, restriction, or termination for confirmed abuse.

### Reporting Process
abuse@webspaceai.in

### Exceptions Process
Not applicable.

### Review Process
Quarterly.

### Contact Information
abuse@webspaceai.in

---

## 13. Accessibility Statement

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Describes WEBSPACEAI's commitment to accessible products.

### Scope
AnswerAI, WSAI CODE, Trainer One, and web properties.

### Definitions
WCAG. **[FIX]** VPAT (Voluntary Product Accessibility Template) — a standardized document reporting conformance level per product.

### Policy Statements
Targets WCAG 2.1 AA conformance. **[FIX — Ongoing Monitoring & VPAT]** WEBSPACEAI commits to: (a) continuous automated accessibility scanning integrated into CI/CD pipelines, not just design/QA-phase review; (b) publishing and updating a VPAT for each major product at the Trust Center, refreshed with each major release; (c) an annual third-party accessibility audit with public summary of findings and remediation status; (d) plain-language summaries of key policies (Privacy, Terms, AUP) published alongside full legal text, with a consumer/enterprise reading-level toggle on the Trust Center.

### Responsibilities
Product Design and Engineering implement accessibility and CI/CD scanning; Accessibility Lead coordinates audits and VPAT publication; Technical Writing produces plain-language summaries.

### Compliance Requirements
Annual third-party audits; VPATs published within 30 days of each major release.

### Enforcement
Features failing accessibility review blocked from release.

### Reporting Process
accessibility@webspaceai.in

### Exceptions Process
Temporary exceptions require documented remediation timeline, capped at 90 days.

### Review Process
Annual, plus VPAT refresh per major release.

### Contact Information
accessibility@webspaceai.in

---

## 14. Vulnerability Disclosure Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Establishes a safe process for researchers to report security vulnerabilities.

### Scope
All WEBSPACEAI-owned domains, APIs, and applications.

### Definitions
Vulnerability.

### Policy Statements
Good-faith testing authorized within scope. Reports to vuln@webspaceai.in privately; 90-day remediation window before public disclosure. No legal action against good-faith researchers acting within scope.

### Responsibilities
Security triages and remediates; CISO owns disclosure timelines.

### Compliance Requirements
Critical vulnerabilities remediated within 15 days; high within 30 days.

### Enforcement
Out-of-scope or malicious testing may result in legal action.

### Reporting Process
vuln@webspaceai.in (PGP available)

### Exceptions Process
Scope exceptions require prior written Security authorization.

### Review Process
Annual.

### Contact Information
vuln@webspaceai.in

---

## 15. Bug Bounty Program Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Governs WEBSPACEAI's paid bug bounty program.

### Scope
In-scope domains, APIs, and applications per published program page.

### Definitions
Eligible Report.

### Policy Statements
Rewards tiered by severity (CVSS-based): Critical, High, Medium, Low. Duplicate/out-of-scope reports ineligible. **[FIX]** Prompt injection and agent-permission-bypass vulnerabilities in WSAI CODE are now an explicitly in-scope, premium-reward category given their elevated risk profile.

### Responsibilities
Security administers program and payouts; Finance processes payments.

### Compliance Requirements
Program terms published and updated at the Security Center.

### Enforcement
Rule violators permanently disqualified.

### Reporting Process
bugbounty@webspaceai.in

### Exceptions Process
Reward disputes reviewed within 10 business days.

### Review Process
Annual.

### Contact Information
bugbounty@webspaceai.in

---

## 16. Model Release Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Governs release of models (Quasar, Next Omni families) to internal, restricted, enterprise, and public audiences.

### Scope
All foundation models, fine-tunes, and agentic systems.

### Definitions
Release Gate.

### Policy Statements
- **Internal Testing:** Dogfooding and capability assessment pre-external exposure.
- **Safety Reviews:** Must pass evaluations mapped explicitly to AI Safety Framework risk level (Levels 1-4).
- **Evaluation Requirements:** Per Evaluation Framework Policy, with domain-specific CBRN expert review for any model showing scientific/technical uplift (per Acceptable Use Policy Section on CBRN red lines).
- **Red Team Requirements:** Mandatory Level 2+; independent external red-teamers Level 3-4.
- **Risk Classification:** Assigned 1-4 prior to release, documented and cross-referenced in the Cross-Reference Index.
- **Approval Workflow:** Research leadership + AI Safety Research Lead; Governance Review Board for Level 3-4.
- **Release Criteria:** Capability, safety, reliability thresholds per tier, explicitly linked to Evaluation Framework and Benchmark Methodology metrics (no unlinked "threshold" references permitted).
- **Restricted Access Releases:** Level 3 to vetted partners under enhanced monitoring.
- **Public Releases:** Level 1-2 after standard gates.
- **Enterprise Releases:** Additional security/compliance review.
- **Rollback Procedures:** Revert to prior stable version within 4 hours.
- **Emergency Suspension:** Governance Review Board may suspend immediately upon critical safety discovery.

### Responsibilities
AI Governance Lead owns policy; Research leadership executes workflows; Safety/Security provide gate approvals.

### Compliance Requirements
No bypass of evaluation or red-teaming gates for assigned risk level.

### Enforcement
Unauthorized releases trigger rollback and investigation.

### Reporting Process
safety@webspaceai.in

### Exceptions Process
Emergency releases require joint CEO + AI Safety Research Lead approval, retroactive review within 72 hours, documented in the Exceptions Register with a fixed 5-business-day closure deadline.

### Review Process
Quarterly.

### Contact Information
safety@webspaceai.in

---

## 17. Safety Evaluation Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Defines mandatory safety evaluation procedures prior to model release.

### Scope
All models and agentic systems prior to deployment.

### Definitions
Safety Evaluation.

### Policy Statements
Evaluations cover harmful content, bias/fairness, cybersecurity uplift, biological/chemical uplift, autonomous replication risk, deception/manipulation, and jailbreak resistance.

**[FIX — Mandatory CBRN Expert Gate]** Any model demonstrating measurable uplift on biological, chemical, radiological, or nuclear benchmark categories automatically triggers mandatory external domain-expert review before any release decision, regardless of overall risk-level classification. This gate cannot be waived by internal sign-off alone.

**[FIX — Multimodal Evaluation]** Evaluation suites now include cross-modal jailbreak resistance testing (image/audio/video-embedded instruction injection) for all multimodal-capable models.

Results documented in a Safety Report per the Safety Report Template, reviewed by AI Safety Research Lead before gate advancement.

### Responsibilities
AI Safety Research Lead owns evaluation design; Research Engineering executes; Governance Review Board reviews Level 3-4 results; external CBRN experts engaged per the mandatory gate.

### Compliance Requirements
Results retained minimum 5 years for audit.

### Enforcement
Models failing thresholds blocked until remediated.

### Reporting Process
safety@webspaceai.in

### Exceptions Process
Reduced-scope evaluation for minor updates requires AI Safety Research Lead sign-off; CBRN gate has no exceptions.

### Review Process
Quarterly, updated as new risk categories emerge.

### Contact Information
safety@webspaceai.in

---

## 18. Red Teaming Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Establishes requirements for adversarial red teaming before release.

### Scope
Internal red teams, external contractors, third-party research partners.

### Definitions
Red Teaming.

### Policy Statements
Mandatory Level 2-4; independent external experts required Level 3-4. Testing covers jailbreaks, prompt injection, dangerous capability elicitation, and agentic misuse scenarios.

**[FIX — Prescriptive Technical Requirements]** Red teaming must specifically test: (a) privilege-escalation attempts against agent permission schemas; (b) multimodal/cross-modal injection vectors; (c) multi-turn manipulation sequences designed to erode safety behavior over long context windows; (d) CBRN-adjacent elicitation using both direct and obfuscated phrasing techniques. Findings are logged in a centralized tracker with CVSS-equivalent severity scoring, triaged, and remediated or accepted with documented residual risk before release approval.

### Responsibilities
AI Safety Research Lead owns program; external red-teamers operate under NDA.

### Compliance Requirements
Critical findings resolved before public release.

### Enforcement
Release proceeds only after Governance Review Board confirms closure of critical/high findings.

### Reporting Process
Internal tracker; escalations to safety@webspaceai.in.

### Exceptions Process
Residual risk acceptance requires joint AI Safety Research Lead + Chief AI Governance Officer sign-off, documented with expiration date requiring re-review.

### Review Process
Quarterly.

### Contact Information
safety@webspaceai.in

---

## 19. Prompt Injection Security Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Defines controls to mitigate prompt injection risks, particularly in agentic systems like WSAI CODE.

### Scope
All products processing untrusted external content within model context.

### Definitions
Prompt Injection.

### Policy Statements
**[FIX — Prescriptive Technical Mandates, replacing generic language]** Systems ingesting untrusted content must implement, at minimum:
- **Privilege separation:** Untrusted content is never granted the same instruction-authority as system or user prompts; a formal instruction hierarchy (system > developer > user > tool/retrieved-content) is enforced at the model and application layer.
- **Output filtering:** All agent outputs pass through an action-classifier before execution; outputs matching known injection patterns are blocked and logged.
- **Scoped, revocable permissions:** Agents receive time-boxed, task-scoped credentials rather than standing access; permissions expire automatically at task completion.
- **Mandatory penetration testing:** Every new tool integration undergoes dedicated prompt injection penetration testing before release, performed by a team independent of the feature's builders.
- **Cryptographically signed audit logs:** All agent actions are logged in a hash-chained, tamper-evident log reviewable during incident investigation.

### Responsibilities
Security and Research Engineering jointly own mitigation design; independent penetration testing team validates before release.

### Compliance Requirements
Prompt injection test suites run against all agentic feature releases; audit log integrity verified quarterly.

### Enforcement
Features failing injection resistance testing blocked from release.

### Reporting Process
security@webspaceai.in | vuln@webspaceai.in

### Exceptions Process
CISO + AI Safety Research Lead joint approval, time-limited to 30 days pending remediation.

### Review Process
Quarterly.

### Contact Information
security@webspaceai.in

---

## 20. Autonomous Agent Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Governs design, deployment, and oversight of autonomous agents, including WSAI CODE.

### Scope
All agentic systems taking multi-step actions with limited human intervention.

### Definitions
Autonomous Agent.

**[FIX — Rigorous Definition of "Consequential Action"]** A **Consequential Action** is any agent-initiated action that: (a) modifies data or systems outside a disposable sandbox (e.g., production deployments, database writes, repository merges to protected branches); (b) incurs financial cost or executes a transaction; (c) sends external communications (emails, API calls to third-party services, public posts); (d) modifies access permissions or credentials; or (e) cannot be trivially and fully reversed within 5 minutes. Any action meeting one or more criteria requires a Consequential Action Checkpoint.

### Policy Statements
**[FIX — Technical Enforcement Mandate]** Consequential Action Checkpoints must be implemented as a formal **API-level approval flow**: the agent cannot proceed past the checkpoint without an explicit, logged user or designated-approver confirmation returned through the platform API — checkpoints cannot be satisfied by the agent's own self-assessment. Each agent operates under a **formal permission schema** (a machine-readable manifest declaring exactly which actions, systems, and data scopes it may access) reviewed and approved by Security before deployment. All actions are logged in cryptographically signed, hash-chained audit logs (see Security Policy Doc. 11 and Prompt Injection Policy Doc. 19). Long-running agent loops are subject to resource/time limits and mandatory periodic human-on-the-loop check-ins (minimum every 30 minutes of continuous execution or 20 consequential-adjacent steps, whichever is sooner). Agentic features undergo mandatory penetration testing (see Doc. 19) before release and quarterly thereafter.

Agents must operate within sandboxed execution environments (e.g., WSAI CODE's dedicated cloud compute) and support emergency interruption at any point.

### Responsibilities
Research Engineering owns agent architecture and permission schemas; Security approves permission manifests pre-deployment; AI Safety Research Lead reviews new agent capabilities.

### Compliance Requirements
Agentic releases pass Autonomous Agent Risk Assessments under the AI Safety Framework; permission schemas re-certified quarterly.

### Enforcement
Agents exhibiting unsafe behavior or checkpoint bypass attempts are suspended pending investigation; repeated bypass attempts trigger automatic circuit-breaker shutdown.

### Reporting Process
safety@webspaceai.in

### Exceptions Process
Expanded autonomy permissions require Governance Review Board approval and a documented, time-limited pilot period with enhanced monitoring.

### Review Process
Quarterly.

### Contact Information
safety@webspaceai.in

---

## 21. Synthetic Media Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Governs generation and disclosure of AI-generated synthetic media.

### Scope
Image, audio, and video generation features.

### Definitions
Synthetic Media.

### Policy Statements
Media depicting real, identifiable individuals requires consent or contextual safeguards. C2PA-compatible provenance metadata is embedded where feasible (see Copyright & IP Policy, Doc. 5). Political deepfakes, non-consensual intimate imagery, and deceptive impersonation of public figures are prohibited.

**[FIX — Multimodal Risk Cross-Reference]** Detection and disclosure controls for cross-modal manipulation of synthetic media (e.g., steganographic instructions embedded in generated images/audio/video, or adversarial audiovisual content designed to bypass provenance checks) are governed jointly with the new Multimodal Risk Policy (Doc. 38), which this policy now explicitly cross-references to close the previously one-directional gap between the two documents.

### Responsibilities
Studio product team owns provenance implementation; Trust & Safety enforces restrictions.

### Compliance Requirements
Provenance standards reviewed against evolving C2PA norms.

### Enforcement
Removal and account suspension for violations.

### Reporting Process
abuse@webspaceai.in

### Exceptions Process
Creative/satirical exceptions require Trust & Safety review.

### Review Process
Quarterly.

### Contact Information
abuse@webspaceai.in

---

## 22. Hallucination Disclosure Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Establishes transparency requirements regarding model hallucination limitations.

### Scope
All generative outputs across AnswerAI, WSAI CODE, Trainer One.

### Definitions
Hallucination.

### Policy Statements
Known hallucination rates and limitations disclosed in model cards and in-product disclaimers. High-stakes domains display enhanced disclaimers. **[FIX]** Hallucination benchmark scores are now published as a standing metric in the Transparency Report (Doc. 29), tracked over time by model version, not disclosed only at release.

### Responsibilities
AI Safety Research Lead owns measurement methodology; Product implements UI disclosures.

### Compliance Requirements
Benchmarks re-evaluated with each major release and reported quarterly.

### Enforcement
Products failing to display disclaimers blocked from release.

### Reporting Process
safety@webspaceai.in

### Exceptions Process
Not applicable.

### Review Process
Per major release, plus quarterly metric refresh.

### Contact Information
safety@webspaceai.in

---

## 23. Human Oversight Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Defines requirements for meaningful human oversight throughout the AI lifecycle.

### Scope
Model development, deployment, and autonomous agent operation.

### Definitions
Human-in-the-Loop; Human-on-the-Loop.

### Policy Statements
High-risk behaviors and Consequential Actions (per Doc. 20's precise definition) require human-in-the-loop checkpoints enforced at the API level. Autonomous systems support human-on-the-loop dashboards and emergency interrupt controls. Internal governance retains override authority over any deployed model or agent.

### Responsibilities
AI Governance Lead owns oversight architecture; Product/Research Engineering implement control interfaces.

### Compliance Requirements
Oversight mechanisms validated during Safety Evaluation and Red Teaming.

### Enforcement
Systems lacking adequate controls blocked from release.

### Reporting Process
safety@webspaceai.in

### Exceptions Process
Reduced oversight for Level 1 features requires Product leadership sign-off.

### Review Process
Every 6 months.

### Contact Information
safety@webspaceai.in

---

## 24. AI Safety Framework

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Establishes WEBSPACEAI's comprehensive approach to identifying, assessing, and mitigating frontier AI risks.

### Scope
All foundation models, fine-tunes, and autonomous agents across Project Zero and product lines.

### Definitions
Frontier Risk.

### Policy Statements

**Governance Structure:** Governance Review Board, chaired by the Chief AI Governance Officer, includes the AI Safety Research Lead, CISO, and Chief Privacy Officer; holds release authority for Level 3-4 systems.

**Risk Classification System (now explicitly cross-referenced in every downstream governance policy):**

| Level | Risk | Controls | Review Cadence |
|---|---|---|---|
| Level 1 | Minimal Risk | Standard evaluation, Product-level approval | Semi-annual |
| Level 2 | Moderate Risk | Full safety evaluation, internal red teaming, AI Safety Research Lead approval | Quarterly |
| Level 3 | High Risk | External red teaming, restricted access, Governance Review Board approval, mandatory CBRN expert gate if applicable | Quarterly + post-incident |
| Level 4 | Critical Risk | Release paused pending mitigation; unanimous Governance Review Board + CEO approval; government consultation considered | Continuous |

**[FIX]** Every downstream policy (Red Teaming, Evaluation Framework, Prompt Injection, Autonomous Agent) must state explicitly which risk levels its mandatory controls apply to; Policy Counsel verifies this mapping in the Cross-Reference Index at each quarterly review.

- **Threat Modeling:** Structured, per model family, covering misuse, accident, and structural risks.
- **Cybersecurity Risk Assessments:** Offensive cyber capability uplift.
- **Biosecurity / Chemical Risk Assessments:** Conducted with external domain experts via the mandatory CBRN gate (Doc. 17).
- **Autonomous Agent Risk Assessments:** Self-replication, resource acquisition, goal-directed persistence, and Consequential Action checkpoint integrity (Doc. 20).
- **Misuse Risk Assessments:** Fraud, disinformation, harassment.
- **Prompt Injection Risk Assessments:** Per Doc. 19's prescriptive technical controls.
- **Multimodal Risk Assessments:** Per new Multimodal Risk Policy (Doc. 38).
- **Safety Testing Procedures:** Automated benchmarks, human expert review, adversarial probing.
- **Red Teaming Procedures:** Per Doc. 18, scaled to risk level.
- **Release Gates:** No advancement without documented gate approval.
- **Escalation Procedures:** Any team member may escalate directly to the AI Safety Research Lead or Governance Review Board.
- **Incident Management:** Per Incident Disclosure Policy (Doc. 33), now with explicit materiality thresholds.
- **Emergency Shutdown Procedures:** Governance Review Board or CISO may trigger immediate suspension.
- **Post-Deployment Monitoring:** Continuous monitoring for anomalous/harmful behavior.
- **Continuous Evaluation:** Periodic re-evaluation against updated benchmarks.
- **Audit Requirements:** Independent audits at least annually, reported to executive leadership; results summarized in the Transparency Report.

### Responsibilities
Governance Review Board owns this framework; AI Safety Research Lead operationalizes assessments; Policy Counsel maintains cross-referencing.

### Compliance Requirements
No Level 3-4 system deployed without full Governance Review Board sign-off.

### Enforcement
Non-compliant releases subject to immediate rollback and disciplinary review.

### Reporting Process
safety@webspaceai.in; escalations reviewed within 24 hours.

### Exceptions Process
Emergency exceptions require joint CEO + Governance Review Board approval with retroactive documentation within 72 hours.

### Review Process
Quarterly and after any Level 3-4 incident.

### Contact Information
safety@webspaceai.in

---

## 25. Model Retirement Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Governs deprecation and retirement of models and agent systems.

### Scope
All publicly and enterprise-released models.

### Definitions
Retirement.

### Policy Statements
Minimum 90-day deprecation notice with migration guidance. Retired weights and safety documentation archived minimum 5 years.

### Responsibilities
Research and Product leadership jointly approve schedules; Enterprise team manages communication.

### Compliance Requirements
Enterprise minimum-notice clauses honored.

### Enforcement
Premature retirement requires executive exception and customer remediation.

### Reporting Process
enterprise@webspaceai.in

### Exceptions Process
Emergency retirement for critical safety issues bypasses standard notice with immediate notification.

### Review Process
Annual.

### Contact Information
enterprise@webspaceai.in

---

## 26. Research Ethics Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Governs ethical standards for research, including model welfare and long-term alignment considerations.

### Scope
Internal research, external partnerships, publication activity.

### Definitions
Model Welfare. **[FIX]** Long-Term Alignment Risk — risk arising from potential divergence between highly capable future systems' behavior and intended human values, assessed independently of near-term misuse risk.

### Policy Statements
Human-subject research requires informed consent and privacy safeguards. Dual-use-risk research undergoes staged/redacted disclosure. **[FIX — Deepened Model Welfare & Alignment Coverage]** WEBSPACEAI Research's Model Welfare initiative now maintains a standing research agenda covering: indicators of model distress or preference (studied empirically, without asserting sentience), decision-making transparency for increasingly autonomous systems, and a dedicated Long-Term Alignment workstream that publishes internal position papers reviewed by the AI Safety Research Lead and an external advisory panel at least annually, feeding into the AI Safety Framework's risk classification criteria as capabilities scale.

### Responsibilities
Research Ethics Lead and AI Safety Research Lead jointly own this policy; external advisory panel reviews Long-Term Alignment output annually.

### Compliance Requirements
Pre-publication ethics and safety review required for all external publications.

### Enforcement
Non-compliant research paused pending ethics review.

### Reporting Process
research@webspaceai.in

### Exceptions Process
Expedited review for time-sensitive academic submissions with Research Ethics Lead approval.

### Review Process
Annual, plus external advisory review.

### Contact Information
research@webspaceai.in

---

## 27. Benchmark Methodology Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Establishes standards for benchmarking WEBSPACEAI models.

### Scope
All internal and publicly reported benchmark results.

### Definitions
Benchmark.

### Policy Statements
Results must disclose methodology, dataset composition, evaluation date, and limitations. No cherry-picked or non-reproducible results. Competitor comparisons use publicly documented, equivalent methodology. **[FIX]** All "threshold" or "benchmark" references in other policies (Model Release, Evaluation Framework, Safety Evaluation) must cite the specific benchmark version and dataset defined here — free-floating threshold references are no longer permitted per the Cross-Reference Index.

### Responsibilities
Research Evaluation team owns methodology; Communications reviews public claims.

### Compliance Requirements
Methodology documentation available on request.

### Enforcement
Non-compliant claims retracted and corrected publicly.

### Reporting Process
research@webspaceai.in

### Exceptions Process
Not applicable.

### Review Process
Per major benchmark update.

### Contact Information
research@webspaceai.in

---

## 28. Evaluation Framework Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Defines the standardized evaluation framework for capability and safety testing.

### Scope
All models prior to release under the Model Release Policy.

### Definitions
Evaluation Suite.

### Policy Statements
Four domains: capability, safety, robustness (including multimodal and prompt-injection resistance), and alignment. **[FIX]** Each domain's minimum passing thresholds are explicitly scaled to and cite the Risk Classification table in Doc. 24, and reference specific benchmark versions per the Benchmark Methodology Policy (Doc. 27). Results feed directly into the Model Card and Safety Report.

### Responsibilities
AI Safety Research Lead and Research Evaluation team jointly own the framework.

### Compliance Requirements
No model proceeds without a completed evaluation suite explicitly mapped to its risk level.

### Enforcement
Incomplete evaluations block release.

### Reporting Process
research@webspaceai.in

### Exceptions Process
Partial evaluation for minor patch updates requires AI Safety Research Lead approval.

### Review Process
Quarterly.

### Contact Information
research@webspaceai.in

---

## 29. Transparency Report Framework

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Governs WEBSPACEAI's periodic public transparency reporting.

### Scope
Company-wide disclosures on safety, content moderation, and government requests.

### Definitions
Transparency Report.

### Policy Statements
Annual Transparency Report covers content moderation volumes/actions, government/legal data requests, material security incidents, and model safety incident summaries.

**[FIX — Concrete Safety Metrics Commitment]** The report now additionally publishes, tracked over time by model version: refusal rates on safety benchmarks, hallucination benchmark scores (per Doc. 22), red-teaming finding closure rates, CBRN-gate trigger frequency (aggregated, non-sensitive), accessibility audit summaries and VPAT status, and sustainability metrics (per new Environmental Sustainability Policy, Doc. 39). Reports exclude information compromising security or individual privacy.

### Responsibilities
Policy Counsel and Trust & Safety jointly compile the report; Legal reviews for accuracy and privacy compliance.

### Compliance Requirements
Published within 90 days of each reporting period's close.

### Enforcement
Delayed publication requires executive-approved justification.

### Reporting Process
compliance@webspaceai.in

### Exceptions Process
Sensitive data aggregated or redacted with Legal approval.

### Review Process
Annual, with quarterly metric snapshots published to the Trust Center.

### Contact Information
compliance@webspaceai.in | https://webspaceai.in/trust

---

## 30. Model Card Template

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Standardizes documentation published alongside each model release.

### Scope
All publicly and enterprise-released models.

### Definitions
Model Card.

### Policy Statements
Each Model Card includes: Model Name, Family, Version, Release Date, Training Methodology, Intended Uses, **explicitly enumerated Out-of-Scope Uses (per the Acceptable Use Policy's foreseeable-use exclusion requirement)**, Capabilities, Limitations, Known Risks, Failure Modes, Benchmark Results (citing specific Benchmark Methodology Policy versions), Safety Evaluation Results (including CBRN-gate outcome where applicable), Security Considerations, Privacy Considerations (including training-data opt-out status), Environmental Impact (compute/energy footprint, per Doc. 39), and a Changelog.

### Responsibilities
Research Evaluation team drafts; AI Safety Research Lead and Technical Writing review before publication.

### Compliance Requirements
No public launch without a published Model Card.

### Enforcement
Missing/inaccurate Model Cards block public release.

### Reporting Process
research@webspaceai.in

### Exceptions Process
Enterprise-only/restricted releases may use abbreviated cards with Governance approval.

### Review Process
Updated with every model version release.

### Contact Information
research@webspaceai.in

---

## 31. System Card Template

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Standardizes documentation of integrated product systems (e.g., AnswerAI, WSAI CODE).

### Scope
Integrated products combining models, tools, and agentic capabilities.

### Definitions
System Card.

### Policy Statements
Each System Card describes: constituent models/versions; integrated tools and permissions, including the formal permission schema per the Autonomous Agent Policy (Doc. 20); safety mitigations; human oversight mechanisms and Consequential Action Checkpoint implementation; system-level risks; and system-level red teaming results.

### Responsibilities
Product and AI Safety Research Lead jointly author.

### Compliance Requirements
Required for all products enabling autonomous/agentic behavior before public release.

### Enforcement
Products lacking a current System Card restricted from new user segments.

### Reporting Process
research@webspaceai.in

### Exceptions Process
Not applicable for agentic products; mandatory.

### Review Process
Updated with each major system architecture change.

### Contact Information
research@webspaceai.in

---

## 32. Safety Report Template

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Standardizes internal and external safety reporting for model releases.

### Scope
All Level 2-4 model releases under the AI Safety Framework.

### Definitions
Safety Report.

### Policy Statements
Each report documents: risk classification rationale (citing Doc. 24's table); evaluation results across all four Evaluation Framework domains; red team findings and remediation status; CBRN-gate outcome where triggered; residual risk acceptance decisions with signatories and expiration dates; post-deployment monitoring plan.

### Responsibilities
AI Safety Research Lead owns compilation; Governance Review Board reviews before approval.

### Compliance Requirements
Required prior to any Level 2+ release gate approval.

### Enforcement
Releases without a completed report are blocked.

### Reporting Process
safety@webspaceai.in

### Exceptions Process
Not applicable; mandatory for qualifying releases.

### Review Process
Compiled per release; retained 5 years.

### Contact Information
safety@webspaceai.in

---

## 33. Incident Disclosure Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Governs disclosure of security, privacy, and AI safety incidents.

### Scope
All material incidents affecting user data, system availability, or AI safety.

### Definitions
**[FIX — Precise Materiality Definition]** A **Material AI Safety Incident** is any event meeting one or more of: (a) a model produces harmful output at scale (affecting more than 100 users or a single enterprise customer's production environment); (b) a jailbreak or prompt injection technique achieves reproducible bypass of a Level 2+ safety mitigation and is confirmed exploitable in production; (c) an autonomous agent executes an unauthorized Consequential Action (per Doc. 20's definition); (d) a CBRN-adjacent red line is breached in production, regardless of scale. Any incident not meeting these thresholds is logged internally but not subject to the public/regulatory disclosure timeline below.

### Policy Statements
Data breaches affecting personal data are disclosed to affected users and regulators within 72 hours of confirmation. Material AI Safety Incidents (per the definition above) are disclosed via the Trust Center within 5 business days with root-cause summaries. Severity is classified Low/Medium/High/Critical, driving notification timelines and executive escalation.

### Responsibilities
CISO and Chief Privacy Officer jointly own breach disclosure; AI Safety Research Lead owns safety incident disclosure and materiality determination.

### Compliance Requirements
Regulatory notification deadlines take precedence over internal review timelines; materiality determinations are logged and auditable.

### Enforcement
Failure to disclose within required timelines triggers internal audit and corrective action.

### Reporting Process
security@webspaceai.in; public disclosures at https://webspaceai.in/trust.

### Exceptions Process
Law enforcement holds may delay disclosure with documented legal basis.

### Review Process
After every material incident and quarterly otherwise.

### Contact Information
security@webspaceai.in

---

## 34. Trust Center Landing Page

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Introduces WEBSPACEAI's Trust Center as the central hub for security, privacy, and compliance information.

### Scope
All visitors seeking WEBSPACEAI's trust posture information.

### Definitions
Trust Center.

### Policy Statements
Provides access to: this documentation suite, security certifications, sub-processor lists, incident and transparency reports (including the new quarterly safety-metric snapshots per Doc. 29), VPATs (per Doc. 13), and direct contact channels. **[FIX]** Includes a plain-language summary layer for consumer visitors and a detailed technical/legal layer for enterprise, auditor, and regulator visitors, toggled at the top of the page.

### Responsibilities
Compliance Lead owns content accuracy; Engineering maintains the portal; Technical Writing maintains the plain-language layer.

### Compliance Requirements
Published certifications must reflect current audit status; expired certifications removed within 5 business days.

### Enforcement
Inaccurate content corrected immediately upon discovery.

### Reporting Process
compliance@webspaceai.in

### Exceptions Process
Not applicable.

### Review Process
Quarterly.

### Contact Information
compliance@webspaceai.in | https://webspaceai.in/trust

---

## 35. Security & Compliance Overview

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Summarizes WEBSPACEAI's security architecture and compliance posture for enterprise customers and auditors.

### Scope
WEBSPACEAI Cloud, AnswerAI, WSAI CODE, Trainer One infrastructure.

### Definitions
Compliance Posture.

### Policy Statements
Security controls aligned with SOC 2, ISO 27001, and ISO 42001. Compliance addresses GDPR, CCPA/CPRA, India's DPDP Act, and EU AI Act high-risk provisions where applicable. Certification status and audit reports available to enterprise customers under NDA.

### Responsibilities
CISO and Compliance Lead jointly own this overview.

### Compliance Requirements
Certification renewals occur before expiration.

### Enforcement
Non-conformance findings remediated per documented corrective action plans.

### Reporting Process
compliance@webspaceai.in

### Exceptions Process
Customer-specific requests handled via enterprise@webspaceai.in.

### Review Process
Annual and after each audit cycle.

### Contact Information
compliance@webspaceai.in | https://webspaceai.in/security

---

## 36. Government Request Policy

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Governs WEBSPACEAI's response to government and law enforcement data requests.

### Scope
All data requests from government agencies worldwide.

### Definitions
Legal Process.

### Policy Statements
Valid legal process required before disclosure, except documented imminent-risk-to-life emergencies. Users notified of requests unless prohibited by law or a valid non-disclosure order. Legal reviews requests for jurisdictional validity and proportionality.

### Responsibilities
Legal owns request review; Government Requests team manages intake and response.

### Compliance Requirements
Aggregate request statistics published in the annual Transparency Report.

### Enforcement
Requests lacking valid legal process are rejected.

### Reporting Process
government@webspaceai.in

### Exceptions Process
Emergency disclosure requires documented imminent-harm justification and post-hoc Legal review within 48 hours.

### Review Process
Annual.

### Contact Information
government@webspaceai.in

---

## 37. Enterprise Security Overview

**Version:** 2.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Details security assurances provided to enterprise customers.

### Scope
Enterprise customers of AnswerAI, WSAI CODE, Trainer One, WEBSPACEAI Cloud.

### Definitions
Enterprise Tenant.

### Policy Statements
Enterprise tenants receive: data isolation, configurable retention, SSO/SAML and RBAC, cryptographically signed audit logging with export, dedicated support, contractual DPA coverage, default training-data exclusion (per Doc. 6), and optional governing-law rider (per Doc. 2). Enterprise customers may request penetration test summaries under NDA.

### Responsibilities
Enterprise team and CISO jointly own this overview.

### Compliance Requirements
Enterprise SLAs documented in order forms consistent with this overview.

### Enforcement
SLA breaches trigger service credits per contract terms.

### Reporting Process
enterprise@webspaceai.in

### Exceptions Process
Custom security requirements negotiated with CISO sign-off.

### Review Process
Annual.

### Contact Information
enterprise@webspaceai.in | https://webspaceai.in/trust

---

## 38. Multimodal Risk Policy *(New)*

**Version:** 1.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
This new policy addresses risks specific to multimodal AI systems that process or generate combinations of text, image, audio, and video, closing the gap left by the Content and Synthetic Media Policies.

### Scope
All multimodal-capable models and features across AnswerAI, WSAI CODE, and WEBSPACEAI Studio.

### Definitions
- **Cross-Modal Injection** — malicious instructions embedded in a non-text modality (image, audio, video) intended to manipulate model behavior when processed.
- **Audiovisual Hallucination** — generated audio or video content that fabricates realistic but false depictions of real events or people.

### Policy Statements
Multimodal models must pass cross-modal jailbreak resistance testing (per Doc. 17 and Doc. 18) before release. Image and video inputs are scanned for embedded text/steganographic instructions before being passed to the model context. Audio inputs are transcribed and scanned through the same instruction-hierarchy enforcement as text (per Doc. 19). Audiovisual outputs depicting real people or events carry provenance metadata and, where realistic depiction of unverified events is detected, an in-product disclosure banner.

### Responsibilities
Research Engineering owns multimodal safety tooling; AI Safety Research Lead reviews new multimodal capabilities before release; Studio product team implements provenance and disclosure banners.

### Compliance Requirements
Cross-modal testing is mandatory for all Level 2+ multimodal releases; results documented in the Safety Report.

### Enforcement
Multimodal features failing cross-modal testing are blocked from release.

### Reporting Process
safety@webspaceai.in

### Exceptions Process
Requires AI Safety Research Lead approval, time-limited pending remediation.

### Review Process
Quarterly given the pace of multimodal threat evolution.

### Contact Information
safety@webspaceai.in

---

## 39. Environmental Sustainability Policy *(New)*

**Version:** 1.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** July 4, 2027

### Purpose
Establishes WEBSPACEAI's commitments to measuring and reducing the environmental footprint of training and inference at scale, elevating environmental disclosure from a Model Card footnote to a standalone governance commitment.

### Scope
All training and inference compute across WEBSPACEAI Cloud and Project Zero.

### Definitions
- **Compute Footprint** — estimated energy consumption and associated carbon emissions attributable to a training run or a defined volume of inference.

### Policy Statements
WEBSPACEAI measures and discloses per-model training compute footprint in each Model Card (Doc. 30) and aggregate inference footprint in the annual Transparency Report (Doc. 29). WEBSPACEAI prioritizes efficient model architectures and renewable-energy-sourced compute where commercially available, and sets a directional goal of year-over-year improvement in energy-per-inference-token efficiency.

### Responsibilities
WEBSPACEAI Cloud infrastructure team owns measurement methodology; Research owns architecture-efficiency roadmap; Policy Counsel reviews disclosure accuracy.

### Compliance Requirements
Measurement methodology is published and available on request; disclosures align with emerging regulatory expectations on AI environmental reporting.

### Enforcement
Inaccurate disclosures are corrected publicly upon discovery.

### Reporting Process
compliance@webspaceai.in

### Exceptions Process
Not applicable; disclosure is mandatory for qualifying training runs.

### Review Process
Annual.

### Contact Information
compliance@webspaceai.in

---

## 40. Training Data Provenance & Supply Chain Policy *(New)*

**Version:** 1.0
**Effective Date:** July 4, 2026 | **Last Updated:** July 4, 2026 | **Next Review:** January 4, 2027

### Purpose
Addresses the previously unaddressed gap in supply-chain risk: data poisoning, provenance, and copyrighted-material liability in pre-training and fine-tuning datasets.

### Scope
All datasets used for pre-training, fine-tuning, and evaluation of WEBSPACEAI models.

### Definitions
- **Data Poisoning** — deliberate insertion of malicious or misleading data into a training corpus intended to manipulate model behavior.
- **Dataset Provenance Record** — a maintained log of a dataset's source, licensing status, and collection method.

### Policy Statements
All training datasets require a Dataset Provenance Record documenting source, collection method, and licensing basis before use. Datasets are scanned for known data-poisoning signatures and anomalous outlier patterns before inclusion in training runs. Web-scraped data is filtered against a maintained exclusion list of sites that have opted out of AI training crawling (e.g., via robots.txt AI-training directives) and against known copyrighted-work fingerprints where feasible. Third-party and vendor-supplied datasets undergo a vendor security and provenance assessment (see Security Policy, Doc. 11) before integration.

### Responsibilities
Research Data team owns provenance recordkeeping and poisoning-detection tooling; Legal reviews licensing basis for significant datasets; Security assesses vendor-supplied data sources.

### Compliance Requirements
No dataset is used in training without a completed Dataset Provenance Record; poisoning-detection scans are logged and auditable.

### Enforcement
Datasets lacking provenance records or failing poisoning scans are excluded from training pending review.

### Reporting Process
research@webspaceai.in

### Exceptions Process
Time-limited exceptions for research-only, non-production training runs require AI Safety Research Lead approval.

### Review Process
Quarterly.

### Contact Information
research@webspaceai.in

---

## Appendix: Cross-Reference Index (Summary)

| Policy | Risk Levels Addressed | Key Cross-References |
|---|---|---|
| Model Release Policy | 1-4 | AI Safety Framework, Evaluation Framework, Red Teaming, Acceptable Use (CBRN) |
| Safety Evaluation Policy | 1-4 (CBRN gate: all levels) | AI Safety Framework, Benchmark Methodology, Multimodal Risk |
| Red Teaming Policy | 2-4 | AI Safety Framework, Autonomous Agent, Prompt Injection |
| Autonomous Agent Policy | 2-4 | Human Oversight, Security Policy, Prompt Injection |
| Prompt Injection Security Policy | 2-4 | Security Policy, Autonomous Agent, Multimodal Risk |
| Multimodal Risk Policy | 2-4 | Content Policy, Synthetic Media, Safety Evaluation |
| Incident Disclosure Policy | All (materiality-gated) | AI Safety Framework, Security Policy, Transparency Report |
| **[FIX — Added]** Content Policy | 1-4 | Multimodal Risk, Synthetic Media, Acceptable Use |
| **[FIX — Added]** Synthetic Media Policy | 1-4 | Multimodal Risk, Copyright & IP, Content Policy |
| **[FIX — Added]** Environmental Sustainability Policy | N/A (disclosure-only) | Model Card Template, Transparency Report Framework |
| **[FIX — Added]** Training Data Provenance & Supply Chain Policy | 1-4 (pre-training gate) | Security Policy, Privacy Policy, AI Safety Framework |

**[FIX — Completeness Note]** The three new v2.0-suite documents (Multimodal Risk Policy, Environmental Sustainability Policy, Training Data Provenance & Supply Chain Policy — Docs. 38-40) were omitted from this index in the prior revision despite being cross-referenced throughout the suite. All three are now included above.

This index is maintained and version-controlled by Policy Counsel and reviewed at every quarterly Governance Review Board meeting to prevent the recurrence of unmapped or inconsistently defined terms across the suite.
