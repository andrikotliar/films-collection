import styles from './AppWrapper.module.css';
import { FC, PropsWithChildren } from 'react';
import { Header } from './components';
import { Container } from '@/components/Container';

const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.app}>
      <Header />
      <Container>{children}</Container>
    </div>
  );
};

export { AppWrapper };
