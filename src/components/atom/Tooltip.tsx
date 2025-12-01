'use client';

import { useState } from 'react';

export const Tooltip = ({
  content,
  children,
  position = 'top',
}: {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}) => {
  const [visible, setVisible] = useState(false);

  if (!content) return <>{children}</>;

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </span>
      {visible && (
        <span
          className={`absolute z-50 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap
            ${position === 'top' ? 'bottom-full mb-1 left-1/2 -translate-x-1/2' : ''}
            ${position === 'bottom' ? 'top-full mt-1 left-1/2 -translate-x-1/2' : ''}
            ${position === 'left' ? 'right-full mr-1 top-1/2 -translate-y-1/2' : ''}
            ${position === 'right' ? 'left-full ml-1 top-1/2 -translate-y-1/2' : ''}
          `}
        >
          {content}
          <span
            className={`absolute w-2 h-2 bg-gray-800 transform rotate-45
              ${position === 'top' ? 'bottom-[-2px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'bottom' ? 'top-[-2px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'left' ? 'right-[-2px] top-1/2 -translate-y-1/2' : ''}
              ${position === 'right' ? 'left-[-2px] top-1/2 -translate-y-1/2' : ''}
            `}
          />
        </span>
      )}
    </span>
  );
};