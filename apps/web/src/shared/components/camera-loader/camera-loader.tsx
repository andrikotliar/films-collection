import clsx from 'clsx';
import styles from './camera-loader.module.css';

type CameraLoaderProps = {
  isFullPage?: boolean;
};

export const CameraLoader = ({ isFullPage }: CameraLoaderProps) => {
  return (
    <div className={clsx(isFullPage && styles.full_page)}>
      <div className={styles.wrapper}>
        <svg viewBox="0 0 500 380" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_89_2)">
            <rect y="180" width="350" height="200" rx="50" fill="#0088cc" />
            <path
              d="M360 238.423C360 224.657 369.369 212.658 382.724 209.319L462.724 189.319C481.658 184.585 500 198.906 500 218.423V341.577C500 361.094 481.658 375.415 462.724 370.681L382.724 350.681C369.369 347.342 360 335.343 360 321.577V238.423Z"
              fill="#0088cc"
            />
            <g
              clipPath="url(#clip1_89_2)"
              className={styles.circle}
              style={{ transformOrigin: '248px 85px' }}
            >
              <circle cx="248" cy="85" r="85" fill="#0088cc" />
              <circle cx="248" cy="85" r="10" fill="white" />
              <circle cx="248" cy="42" r="25" fill="white" />
              <circle cx="205" cy="85" r="25" fill="white" />
              <circle cx="291" cy="85" r="25" fill="white" />
              <circle cx="248" cy="128" r="25" fill="white" />
            </g>
            <g
              clipPath="url(#clip2_89_2)"
              className={styles.circle}
              style={{ transformOrigin: '83px 110px' }}
            >
              <circle cx="83" cy="110" r="60" fill="#0088cc" />
              <circle cx="83" cy="110" r="7.05882" fill="white" />
              <circle cx="83" cy="79.6471" r="17.6471" fill="white" />
              <circle cx="52.6471" cy="110" r="17.6471" fill="white" />
              <circle cx="113.353" cy="110" r="17.6471" fill="white" />
              <circle cx="83" cy="140.353" r="17.6471" fill="white" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
