import { FC, PropsWithChildren } from 'react';
import styles from './section.module.css';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export const Section: FC<SectionProps> = ({ children, title }) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
