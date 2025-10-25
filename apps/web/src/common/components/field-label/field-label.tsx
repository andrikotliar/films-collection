import { type PropsWithChildren } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import type { PropsWithClassName } from '~/common';

export const FieldLabel = ({ children, className }: PropsWithChildren<PropsWithClassName>) => {
  return <span className={clsx(styles.label, className)}>{children}</span>;
};
