import React from 'react';

interface FixBadgeProps {
  text: string;
}

/**
 * Renders `[FIX — ...]` markers as styled inline pill badges.
 * Extracts the fix type from the bracket text and displays it
 * with an amber/yellow accent.
 */
export const FixBadge: React.FC<FixBadgeProps> = ({ text }) => {
  // Extract the label from patterns like "[FIX — Default Training Posture]" or "[FIX — Output Liability]"
  const match = text.match(/\[FIX\s*[—–-]\s*(.+?)\]/i);
  const label = match ? match[1].trim() : 'Updated in v2.0';

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded
        bg-black dark:bg-white
        text-white dark:text-black
        border border-transparent
        text-[10px] font-mono uppercase tracking-widest font-semibold
        leading-tight whitespace-nowrap align-middle"
    >
      <span className="text-[11px]" aria-hidden="true">⟳</span>
      {label}
    </span>
  );
};

export default FixBadge;
