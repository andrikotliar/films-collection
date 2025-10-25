import styles from './styles.module.css';
import clsx from 'clsx';
import { ComponentProps } from 'react';

type RootPageLayoutProps = ComponentProps<'div'>;

export const RootPageLayout = ({ children, className, ...rest }: RootPageLayoutProps) => {
  return (
    <div {...rest} className={clsx(styles.root_page_layout, className)}>
      {children}
    </div>
  );
};
