import styles from './styles.module.css';
import { type PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export const Section = ({ title, children }: SectionProps) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
