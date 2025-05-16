import { FC } from 'react';

type LogoProps = {
  className?: string;
};

export const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 362 448"
      fill="none"
      className={className}
    >
      <g clipPath="url(#a)">
        <path
          fill="url(#b)"
          d="M0 403.584V40C0 17.909 17.909 0 40 0h280.044c32.578 0 51.493 36.862 32.493 63.327l-59.833 83.346c-10.009 13.941-10.009 32.713 0 46.654l59.833 83.346c19 26.465.085 63.327-32.493 63.327H165.357a40 40 0 0 0-30.415 14.02l-64.527 75.544C46.273 457.827 0 440.754 0 403.584Z"
        />
      </g>
      <defs>
        <linearGradient
          id="b"
          x1="4.275"
          x2="471.46"
          y1="2.5"
          y2="384.737"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#006DB7" />
          <stop offset="1" stopColor="#00B5C6" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h362v448H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
