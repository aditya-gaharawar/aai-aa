import React, { useState, useMemo } from 'react';
import { CapabilityRiskIcon, ThresholdsIcon, SafeguardsIcon, EvaluationIcon, GovernanceIcon, MonitoringIcon, ReportingIcon, ResearchIcon } from '../components/icons';

// ─────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────

const principles = [
    { title: 'Capability‑Risk Alignment', text: 'Safety requirements scale with model capability.', icon: CapabilityRiskIcon },
    { title: 'Clear Thresholds', text: 'Measurable triggers signal transitions to the next safety tier.', icon: ThresholdsIcon },
    { title: 'Layered Safeguards', text: 'Combine technical, procedural, and organizational measures.', icon: SafeguardsIcon },
    { title: 'Rigorous Evaluation', text: 'Formalize testing, including adversarial probes and red teaming.', icon: EvaluationIcon },
    { title: 'Accountable Governance', text: 'Establish oversight bodies to review and approve deployments.', icon: GovernanceIcon },
    { title: 'Continuous Monitoring', text: 'Deploy real‑time telemetry to track model behavior.', icon: MonitoringIcon },
    { title: 'Transparent Reporting', text: 'Document assessments, incidents, and mitigation steps.', icon: ReportingIcon },
    { title: 'Research Integration', text: 'Stay current with AI safety research and incorporate it.', icon: ResearchIcon }
];

const safetyLevels = [
  {
    "level": 1,
    "title": "Minimal Risk",
    "objective": "Standard evaluation and product approval for systems assessed as minimal risk.",
    "applicability": [
      "Systems classified as minimal risk under the published policy"
    ],
    "measures": [
      "Standard evaluation",
      "Product approval",
      "Semiannual review"
    ],
    "caseStudy": "An internal classification tool assessed as minimal risk would follow standard evaluation and product approval, with a semiannual review."
  },
  {
    "level": 2,
    "title": "Moderate Risk",
    "objective": "Full safety evaluation and internal red teaming before approval by the AI Safety Lead.",
    "applicability": [
      "Systems assessed as moderate risk"
    ],
    "measures": [
      "Full safety evaluation",
      "Internal red teaming",
      "AI Safety Lead approval",
      "Quarterly review"
    ],
    "caseStudy": "A proposed assistant assessed as moderate risk would undergo full safety evaluation and internal red teaming before the AI Safety Lead approves release."
  },
  {
    "level": 3,
    "title": "High Risk",
    "objective": "Restrict access and require external challenge and governance review for high-risk systems.",
    "applicability": [
      "Systems assessed as high risk",
      "CBRN-relevant capabilities require an applicable expert gate"
    ],
    "measures": [
      "External red teaming",
      "Restricted access",
      "Governance Review Board approval",
      "CBRN expert gate where applicable",
      "Quarterly and post-incident review"
    ],
    "caseStudy": "A system assessed as high risk would remain access-restricted while external red teaming and Governance Review Board review are completed. This example does not establish a current product classification."
  },
  {
    "level": 4,
    "title": "Critical Risk",
    "objective": "Pause release pending mitigation and require unanimous Governance Review Board and CEO approval.",
    "applicability": [
      "Systems assessed as critical risk"
    ],
    "measures": [
      "Release paused pending mitigation",
      "Unanimous Governance Review Board and CEO approval",
      "Consider government consultation",
      "Continuous review"
    ],
    "caseStudy": "If an evaluation identified critical risk, release would pause pending mitigation. The policy requires unanimous Governance Review Board and CEO approval, and consideration of government consultation."
  }
];

const gettingStartedSteps = [
    { title: 'Capability Assessment', text: 'Catalog your AI projects and map each to the corresponding safety level.' },
    { title: 'Gap Analysis', text: 'List required safety measures that are not yet implemented and prioritize them by risk.' },
    { title: 'Roadmap Development', text: 'Create a timeline for implementing missing safeguards, starting with the highest-risk projects.' },
    { title: 'Governance Structure', text: 'Establish safety review committees with clear roles, responsibilities, and decision-rights.' },
    { title: 'Measurement & Monitoring', text: 'Build dashboards to track key safety metrics and set up alerting thresholds.' },
    { title: 'Training & Culture', text: 'Educate all teams on the framework and foster a culture of "safety by design."' },
    { title: 'Iterate & Evolve', text: 'Review framework thresholds and measures quarterly, incorporating new safety research and lessons learned.' }
];

// ─────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────

const PrincipleCard: React.FC<{ principle: typeof principles[0] }> = ({ principle }) => {
    const Icon = principle.icon;
    return (
        <div className="flex gap-4 p-6 border border-gray-200 dark:border-[#222] rounded-xl bg-gray-50 dark:bg-[#0A0A0A] hover:bg-gray-100 dark:hover:bg-[#111] transition-colors duration-200">
            <div className="flex-shrink-0 mt-1 text-gray-500 dark:text-[#999]">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <h3 className="font-medium text-gray-900 dark:text-[#EDEDED] text-base mb-2">{principle.title}</h3>
                <p className="text-sm text-gray-600 dark:text-[#888] leading-relaxed">{principle.text}</p>
            </div>
        </div>
    );
};

const SafetyPage: React.FC = () => {
    const [activeLevel, setActiveLevel] = useState<number>(3);

    const currentLevelData = useMemo(() => safetyLevels.find(l => l.level === activeLevel) || safetyLevels[0], [activeLevel]);

    return (
        <main className="min-h-screen bg-white dark:bg-[#050505] relative overflow-hidden font-sans text-gray-900 dark:text-[#EDEDED] selection:bg-black/10 dark:selection:bg-white/20 pt-24 pb-32 transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 xl:px-24 relative z-10">
                
                {/* ── SECTION A: HERO ── */}
                <div className="mb-32 text-center flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tighter text-black dark:text-white mb-6 leading-tight max-w-[800px]">
                        The AI Safety Framework
                    </h1>
                    <p className="text-gray-600 dark:text-[#888] text-lg md:text-xl leading-relaxed max-w-[700px]">
                        Four risk levels from the published policy, with increasing evaluation, approval, and review requirements. Classification depends on assessment; the selected level is an example.
                    </p>
                </div>

                {/* ── SECTION B: THE LEVELS (INTERACTIVE) ── */}
                <div className="mb-40 flex flex-col items-center">
                    
                    {/* Segmented Toggle */}
                    <div className="inline-flex flex-wrap p-1 bg-gray-100 dark:bg-[#050505] border border-gray-200 dark:border-[#222] rounded-xl dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] mb-12">
                        {safetyLevels.map((level) => {
                            const isActive = activeLevel === level.level;
                            return (
                                <button
                                    key={level.level}
                                    onClick={() => setActiveLevel(level.level)}
                                    aria-pressed={activeLevel === level.level}
                                    className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 flex items-center gap-2 ${
                                        isActive 
                                            ? 'text-black dark:text-[#EDEDED] bg-white dark:bg-gradient-to-b dark:from-[#2a2a2a] dark:to-[#1a1a1a] shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_2px_4px_rgba(0,0,0,0.5)] border border-gray-200 dark:border-[#444]' 
                                            : 'text-gray-500 dark:text-[#999] hover:text-gray-900 dark:hover:text-[#AAA] border border-transparent hover:bg-white/50 dark:hover:bg-[#111]'
                                    }`}
                                >
                                    Level {level.level}
                                    
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Level Content */}
                    <div className="w-full bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#222] rounded-2xl p-8 md:p-12 relative overflow-hidden text-left transition-colors duration-300">
                        
                        {/* Subtle background element for active level */}
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.02] text-[200px] font-black leading-none select-none pointer-events-none text-black dark:text-white">
                            0{activeLevel}
                        </div>
                        
                        <div className="relative z-10">
                            <div className="mb-12 pb-12 border-b border-gray-200 dark:border-[#222]">
                                <h3 className="text-3xl font-semibold tracking-tight text-black dark:text-white mb-4 flex items-center gap-4">
                                    {currentLevelData.title}
                                    
                                </h3>
                                <p className="text-gray-600 dark:text-[#888] leading-relaxed text-lg max-w-[800px]">
                                    {currentLevelData.objective}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 mb-12">
                                <div>
                                    <h4 className="text-xs font-mono text-gray-500 dark:text-[#888] uppercase tracking-widest mb-6">Applicability</h4>
                                    <ul className="space-y-4">
                                        {currentLevelData.applicability.map(item => (
                                            <li key={item} className="flex items-start gap-4 text-sm text-gray-700 dark:text-[#AAA]">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-[#444] flex-shrink-0"></span>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs font-mono text-gray-500 dark:text-[#888] uppercase tracking-widest mb-6">Measures</h4>
                                    <ul className="space-y-4">
                                        {currentLevelData.measures.map(item => (
                                            <li key={item} className="flex items-start gap-4 text-sm text-gray-700 dark:text-[#AAA]">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black dark:bg-[#EDEDED] flex-shrink-0 dark:shadow-[0_0_10px_rgba(255,255,255,0.3)]"></span>
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#050505] border border-gray-200 dark:border-[#222] rounded-xl p-6 md:p-8 relative transition-colors duration-300">
                                <div className="absolute top-0 left-8 -translate-y-1/2 bg-white dark:bg-[#050505] px-3 text-[11px] font-mono uppercase tracking-widest text-gray-500 dark:text-[#999] transition-colors duration-300">Illustrative scenario</div>
                                <p className="text-sm text-gray-600 dark:text-[#888] leading-relaxed italic">
                                    "{currentLevelData.caseStudy}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SECTION C: CORE PRINCIPLES ── */}
                <div className="mb-40">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white mb-4">Core Principles</h2>
                        <p className="text-gray-600 dark:text-[#888] text-base max-w-[600px] mx-auto">
                            The eight foundational pillars that guide responsible AI deployment across all capability levels.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {principles.map(p => (
                            <PrincipleCard key={p.title} principle={p} />
                        ))}
                    </div>
                </div>

                {/* ── SECTION D: IMPLEMENTATION ROADMAP ── */}
                <div className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white mb-4">Implementation Roadmap</h2>
                        <p className="text-gray-600 dark:text-[#888] text-base max-w-[600px] mx-auto">
                            A structured, step-by-step approach to integrating the safety framework into your organization.
                        </p>
                    </div>
                    
                    <div className="max-w-3xl mx-auto border border-gray-200 dark:border-[#222] bg-gray-50 dark:bg-[#0A0A0A] rounded-2xl overflow-hidden transition-colors duration-300">
                        {gettingStartedSteps.map((step, index) => (
                            <div key={step.title} className="flex gap-6 p-6 md:p-8 border-b border-gray-200 dark:border-[#222] last:border-0 hover:bg-gray-100 dark:hover:bg-[#111] transition-colors duration-200">
                                <div className="flex-shrink-0">
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#050505] border border-gray-300 dark:border-[#333] text-gray-500 dark:text-[#AAA] text-sm font-mono dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] transition-colors duration-300">
                                        0{index + 1}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 dark:text-[#EDEDED] text-base mb-2">{step.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-[#888] leading-relaxed">{step.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── FOOTER ── */}
                <div className="mt-20 pt-8 pb-12 text-center text-gray-400 dark:text-[#888] text-[11px] font-mono uppercase tracking-widest flex flex-col items-center justify-center gap-3 border-t border-gray-200 dark:border-[#111]">
                    <div className="flex items-center gap-2">
                        <span>■</span> End of Framework Documentation
                    </div>
                </div>

            </div>
        </main>
    );
};

export default SafetyPage;
