import { IconType } from '@/common';
import { FC } from 'react';

const PlayIconOutline: FC<IconType> = ({ color = '#000', className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={className}
    >
      <path d="m5 3 14 9-14 9V3z" />
    </svg>
  );
};

export { PlayIconOutline };
