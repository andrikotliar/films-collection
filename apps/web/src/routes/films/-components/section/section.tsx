import { type ReactNode } from 'react';
import styles from './section.module.css';

type SectionProps = {
  title: string;
  children?: ReactNode;
};

export const Section = ({ title, children }: SectionProps) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
