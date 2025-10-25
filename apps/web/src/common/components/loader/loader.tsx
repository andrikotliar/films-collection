import styles from './styles.module.css';
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
      className={classNames(styles.loader_container, {
        [styles.full_page]: isFullPage,
      })}
    >
      <LoaderCircle
        className={classNames(styles.loader, {
          [styles.default_color]: !shouldInheritColor,
        })}
        size={size}
      />
    </div>
  );
};
