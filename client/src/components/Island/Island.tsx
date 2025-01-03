import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import styles from './Island.module.css';

type IslandProps = PropsWithChildren<{
  displayPadding?: boolean;
  flexContainer?: boolean;
  className?: string;
}>;

export const Island: FC<IslandProps> = ({
  children,
  displayPadding = true,
  flexContainer = false,
}) => {
  return (
    <div
      className={classNames(styles.island, {
        [styles.islandWithPadding]: displayPadding,
        [styles.flexContainer]: flexContainer,
      })}
    >
      {children}
    </div>
  );
};
