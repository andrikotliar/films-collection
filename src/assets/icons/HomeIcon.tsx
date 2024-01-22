import { IconType } from '@/common';
import { FC } from 'react';

const HomeIcon: FC<IconType> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M27 29H5V17H3.235c-1.138 0-1.669-1.419-.812-2.168L14.131 3.745a2.716 2.716 0 0 1 3.737 0l11.707 11.087c.858.748.327 2.168-.812 2.168H27v12z"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M20 29h-8v-6a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v6z"
      />
    </svg>
  );
};

export { HomeIcon };
