import React from 'react';

interface Props {
  text: string;
  maxLength?: number;
  className?: string;
}

const TruncatedTextWithTooltip: React.FC<Props> = ({ text, maxLength = 32, className = '' }) => {
  const trimmed = text?.trim() || '';
  const isTruncated = trimmed.length > maxLength;
  const displayText = isTruncated ? trimmed.slice(0, maxLength) + '...' : trimmed;

  return (
    <span className={`relative group/address ${className}`}>
      {/* Main visible truncated text */}
      <span>{displayText}</span>

      {/* Tooltip (only visible on hover) */}
      {isTruncated && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/address:block bg-gray-800 text-white text-xs rounded-md px-3 py-1 whitespace-nowrap z-10">
          {trimmed}
        </div>
      )}
    </span>
  );
};

export default TruncatedTextWithTooltip;
