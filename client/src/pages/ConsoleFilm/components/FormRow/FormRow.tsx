import { FC, PropsWithChildren } from 'react';
import styles from './FormRow.module.css';

type FormRowProps = PropsWithChildren<{
  gap?: number;
  position?: 'start' | 'end' | 'center';
}>;

export const FormRow: FC<FormRowProps> = ({
  children,
  gap = 10,
  position = 'start',
}) => {
  return (
    <div className={styles.formRow} style={{ gap, justifyContent: position }}>
      {children}
    </div>
  );
};
