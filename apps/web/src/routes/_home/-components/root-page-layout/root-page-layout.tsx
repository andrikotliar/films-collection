import { type ComponentProps } from 'react';
import styles from "./root-page-layout.module.css";
import clsx from 'clsx';

type RootPageLayoutProps = ComponentProps<'div'>;

export const RootPageLayout = ({ children, className, ...rest }: RootPageLayoutProps) => {
  return (
    <div {...rest} className={clsx(styles.root_page_layout, className)}>
      {children}
    </div>
  );
};
