import { FC } from 'react';
import { Logo } from '../logo/logo';
import styles from './logo-loader.module.css';

export const LogoLoader: FC = () => {
  return (
    <div className={styles.logoLoaderWrapper}>
      <Logo className={styles.logo} />
    </div>
  );
};
