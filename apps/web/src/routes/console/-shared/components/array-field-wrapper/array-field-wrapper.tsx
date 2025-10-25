import styles from './styles.module.css';
import { type ReactNode } from 'react';
import { Trash2Icon } from 'lucide-react';
import { Button } from '~/common';

type ArrayFieldWrapperProps = {
  onRemove: VoidFunction;
  children?: ReactNode;
};

export const ArrayFieldWrapper = ({ children, onRemove }: ArrayFieldWrapperProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputs}>{children}</div>
      <Button
        icon={<Trash2Icon />}
        variant="ghost"
        onClick={onRemove}
        className={styles.removeButton}
      />
    </div>
  );
};
