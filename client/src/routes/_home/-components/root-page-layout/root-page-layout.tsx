import styles from './root-page-layout.module.css';
import classNames from 'classnames';
import { ComponentProps, FC, PropsWithChildren } from 'react';

type RootPageLayoutProps = ComponentProps<'div'>;

export const RootPageLayout: FC<PropsWithChildren<RootPageLayoutProps>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={classNames(styles.rootPageLayout)}>
      {children}
    </div>
  );
};
