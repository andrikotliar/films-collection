import styles from './scrollable-wrapper.module.css';
import { ComponentProps, forwardRef } from 'react';
import classNames from 'classnames';

type ScrollableWrapperProps = ComponentProps<'div'>;

export const ScrollableWrapper = forwardRef<
  HTMLDivElement,
  ScrollableWrapperProps
>(({ children, className }, ref) => {
  return (
    <div ref={ref} className={classNames(styles.customScroll, className)}>
      {children}
    </div>
  );
});
