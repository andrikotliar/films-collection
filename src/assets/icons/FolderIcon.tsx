import { IconType } from '@/common';
import { FC } from 'react';

const FolderIcon: FC<IconType> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <defs></defs>
      <g>
        <path
          fill="currentColor"
          d="M4 28a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h7a1 1 0 0 1 .77.36L14.8 8H27a1 1 0 0 1 0 2H14.33a1 1 0 0 1-.76-.36L10.53 6H4a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1 1 1 0 0 1 0 2Z"
        />
        <path
          fill="currentColor"
          d="M25.38 28H4a1 1 0 0 1-1-1.21l3-14A1 1 0 0 1 7 12h23a1 1 0 0 1 1 1.21l-2.68 12.42A3 3 0 0 1 25.38 28ZM5.24 26h20.14a1 1 0 0 0 1-.79L28.76 14h-21Z"
        />
      </g>
    </svg>
  );
};

export { FolderIcon };
