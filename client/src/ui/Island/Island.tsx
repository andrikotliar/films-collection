import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import styles from './Island.module.css';

type IslandProps = PropsWithChildren<{
  hasPaddings?: boolean;
  isFlexContainer?: boolean;
  className?: string;
}>;

export const Island: FC<IslandProps> = ({
  children,
  hasPaddings = true,
  isFlexContainer = false,
}) => {
  return (
    <div
      className={classNames(styles.island, {
        [styles.islandWithPadding]: hasPaddings,
        [styles.flexContainer]: isFlexContainer,
      })}
    >
      {children}
    </div>
  );
};
