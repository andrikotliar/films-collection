import { PropsWithClassName } from '@/common';
import { FC } from 'react';

const FilmsCollectionLogo: FC<PropsWithClassName> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="none"
    >
      <g clipPath="url(#a)">
        <mask
          id="b"
          width="512"
          height="512"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'luminance' }}
        >
          <path
            fill="#fff"
            d="M464.496 324.853c-52.739 56.632-107.794 107.492-165.167 152.58-57.372 45.088-115.738 46.068-175.096 2.94-59.359-43.127-96.982-93.987-112.87-152.58-15.887-58.592-15.115-116.422 2.317-173.49 17.433-57.068 55.056-98.78 112.87-125.135C184.363 2.812 250.783-5.682 325.809 3.684 400.834 13.05 455.89 54.76 490.975 128.819c35.086 74.057 26.259 139.402-26.479 196.034Z"
          />
        </mask>
        <g mask="url(#b)">
          <path
            fill="url(#c)"
            d="M464.496 324.853c-52.739 56.632-107.794 107.492-165.167 152.58-57.372 45.088-115.738 46.068-175.096 2.94-59.359-43.127-96.982-93.987-112.87-152.58-15.887-58.592-15.115-116.422 2.317-173.49 17.433-57.068 55.056-98.78 112.87-125.135C184.363 2.812 250.783-5.682 325.809 3.684 400.834 13.05 455.89 54.76 490.975 128.819c35.086 74.057 26.259 139.402-26.479 196.034Z"
          />
        </g>
        <g filter="url(#d)">
          <path
            fill="#fff"
            d="M255.75 175.75V322.5c0 2.167.417 3.833 1.25 5 1 1.167 2.25 2 3.75 2.5 1.5.333 3.167.583 5 .75 1.833.167 3.667.25 5.5.25h4.25v10h-91.25v-10h2.25c3.5 0 6.417-.583 8.75-1.75 2.5-1.167 3.75-3.583 3.75-7.25V182.5c0-3.667-1.25-6.083-3.75-7.25-2.333-1.167-5.25-1.75-8.75-1.75h-2.25v-10H326v47h-10.75l-5-23.5c-.667-3-2-5.333-4-7-1.833-1.667-4.417-2.75-7.75-3.25-3.333-.667-7.333-1-12-1h-30.75Zm-5.75 70.5c8.333-.333 15.833-.833 22.5-1.5a936.998 936.998 0 0 0 19-2.5c6-1 11.667-2.167 17-3.5v25.5c-5.333-1.333-11-2.5-17-3.5-5.833-1-12.167-1.833-19-2.5-6.667-.667-14.167-1.167-22.5-1.5v-10.5Z"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="c"
          x1="0"
          x2="512"
          y1="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#006DB7" />
          <stop offset="1" stopColor="#00B5C6" />
        </linearGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h512v512H0z" />
        </clipPath>
        <filter
          id="d"
          width="161.75"
          height="197.5"
          x="176.25"
          y="157.5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx="2" dy="4" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1_14" />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_1_14"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export { FilmsCollectionLogo };
