import { FC, PropsWithChildren } from 'react';
import { Header } from './components';

import styles from './AppWrapper.module.css';

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.app}>
      <Header />
      {children}
    </div>
  );
};

export { AppWrapper };
