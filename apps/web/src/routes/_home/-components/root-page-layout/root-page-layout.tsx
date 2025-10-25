import styles from './styles.module.css';
import classNames from 'classnames';
import { ComponentProps } from 'react';

type RootPageLayoutProps = ComponentProps<'div'>;

export const RootPageLayout = ({ children, className, ...rest }: RootPageLayoutProps) => {
  return (
    <div {...rest} className={classNames(styles.root_page_layout, className)}>
      {children}
    </div>
  );
};
