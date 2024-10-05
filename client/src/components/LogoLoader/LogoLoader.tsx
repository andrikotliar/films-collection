import { FC } from 'react';
import { Logo } from '../Logo/Logo';
import styles from './LogoLoader.module.css';

const LogoLoader: FC = () => {
  return (
    <div className={styles.logoLoaderWrapper}>
      <Logo className={styles.logo} />
    </div>
  );
};

export { LogoLoader };
