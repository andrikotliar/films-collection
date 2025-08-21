import type { FormValues, UnknownEntity } from '@/common';
import type { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './styles.module.css';

type FormProps<T extends FormValues<UnknownEntity>> = {
  children?: ReactNode;
  onSubmit?: (data: T) => Promise<void>;
};

export const Form = <T extends FormValues<UnknownEntity>>({ children, onSubmit }: FormProps<T>) => {
  const form = useFormContext<T>();

  return (
    <form className={styles.form} onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}>
      {children}
    </form>
  );
};
