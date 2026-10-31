import React from 'react';

interface ViewToggleProps {
  mode: 'plain' | 'technical';
  onToggle: (mode: 'plain' | 'technical') => void;
}

/**
 * Plain-language / Technical toggle for the Trust Center landing page.
 * Matches the SafetyPage segmented control style.
 */
export const ViewToggle: React.FC<ViewToggleProps> = ({ mode, onToggle }) => {
  return (
    <div
      className="inline-flex p-1 bg-gray-100 dark:bg-[#111]
        border border-gray-200 dark:border-[#333]
        rounded-xl"
    >
      <ToggleButton
        label="Plain Language"
        isActive={mode === 'plain'}
        onClick={() => onToggle('plain')}
      />
      <ToggleButton
        label="Technical / Legal"
        isActive={mode === 'technical'}
        onClick={() => onToggle('technical')}
      />
    </div>
  );
};

const ToggleButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 focus:outline-none ${
      isActive
        ? 'text-black dark:text-white bg-white dark:bg-black shadow-sm border border-gray-200 dark:border-[#333]'
        : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border border-transparent'
    }`}
  >
    {label}
  </button>
);

export default ViewToggle;
