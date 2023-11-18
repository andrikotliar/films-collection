import { PropsWithClassName } from '@/common';
import { FC } from 'react';

const FilmsCollectionLogo: FC<PropsWithClassName> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 424 206"
      className={className}
    >
      <path
        fill="#fff"
        d="M13.5 194V15.25h191v32.5h-151v49.5H185v32.5H53.5V194h-40Zm310.506 1.25c-33 0-58.25-7.583-75.75-22.75-17.5-15.333-26.25-38-26.25-68 0-29.833 8.75-52.417 26.25-67.75 17.5-15.333 42.75-22.917 75.75-22.75l90 .5v32h-87.25c-21.667 0-37.75 4.583-48.25 13.75s-15.75 23.917-15.75 44.25 5.25 35.167 15.75 44.5c10.5 9.167 26.583 13.75 48.25 13.75h89.75v32.5h-92.5Z"
      />
    </svg>
  );
};

export { FilmsCollectionLogo };
