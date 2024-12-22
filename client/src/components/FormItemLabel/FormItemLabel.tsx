import { FC, PropsWithChildren } from 'react';
import styles from './FormItemLabel.module.css';

type FormItemLabelProps = PropsWithChildren;

export const FormItemLabel: FC<FormItemLabelProps> = ({ children }) => {
  return <span className={styles.label}>{children}</span>;
};
