import { FC, PropsWithChildren } from 'react';
import styles from './FieldLabel.module.css';

type FieldLabelProps = PropsWithChildren;

export const FieldLabel: FC<FieldLabelProps> = ({ children }) => {
  return <span className={styles.label}>{children}</span>;
};
