import styles from "./loader.module.css";
import clsx from 'clsx';
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
      className={clsx(styles.loader_container, {
        [styles.full_page]: isFullPage,
      })}
    >
      <LoaderCircle
        className={clsx(styles.loader, {
          [styles.default_color]: !shouldInheritColor,
        })}
        size={size}
      />
    </div>
  );
};
