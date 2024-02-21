import styles from './AppWrapper.module.css';
import { FC, PropsWithChildren } from 'react';
import { Header } from './components';

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.app}>
      <Header />
      {children}
    </div>
  );
};

export { AppWrapper };
