import styles from './form-array-field-wrapper.module.css';
import { Trash2Icon } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { Button } from '~/shared/components/button/button';

type FormArrayFieldWrapperProps = {
  onRemove: VoidFunction;
};

export const FormArrayFieldWrapper = ({
  children,
  onRemove,
}: PropsWithChildren<FormArrayFieldWrapperProps>) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputs}>{children}</div>
      <Button icon={<Trash2Icon />} variant="ghost" onClick={onRemove} />
    </div>
  );
};
