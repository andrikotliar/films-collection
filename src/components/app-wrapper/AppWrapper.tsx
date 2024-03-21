import { FC, PropsWithChildren } from 'react';
import { Header, Container } from './components';

import styles from './AppWrapper.module.css';

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.app}>
      <Header />
      <Container>{children}</Container>
    </div>
  );
};

export { AppWrapper };
