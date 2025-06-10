import styles from './loader.module.css';
import classNames from 'classnames';
import { LoaderCircle } from 'lucide-react';

export type LoaderProps = {
  isFullPage?: boolean;
  size?: number;
  shouldInheritColor?: boolean;
};

export const Loader = ({
  isFullPage = false,
  size = 60,
  shouldInheritColor = false,
}: LoaderProps) => {
  return (
    <div
      className={classNames(styles.loaderContainer, {
        [styles.fullPage]: isFullPage,
      })}
    >
      <LoaderCircle
        className={classNames(styles.loader, {
          [styles.defaultColor]: !shouldInheritColor,
        })}
        size={size}
      />
    </div>
  );
};
