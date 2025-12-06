import styles from "./console-title.module.css";
import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import type { PropsWithClassName } from '~/shared';

export const ConsoleTitle = ({ children, className }: PropsWithChildren<PropsWithClassName>) => {
  return <h1 className={clsx(styles.console_page_title, className)}>{children}</h1>;
};
