import styles from './root-page-layout.module.css';
import classNames from 'classnames';
import { ComponentProps } from 'react';

type RootPageLayoutProps = ComponentProps<'div'>;

export const RootPageLayout = ({
  children,
  className,
  ...rest
}: RootPageLayoutProps) => {
  return (
    <div {...rest} className={classNames(styles.rootPageLayout, className)}>
      {children}
    </div>
  );
};
