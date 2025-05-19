import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import styles from './panel.module.css';

type PanelProps = PropsWithChildren<{
  hasPaddings?: boolean;
  isFlexContainer?: boolean;
}>;

export const Panel: FC<PanelProps> = ({
  children,
  hasPaddings = true,
  isFlexContainer = false,
}) => {
  return (
    <div
      className={classNames(styles.panel, {
        [styles.panelWithPadding]: hasPaddings,
        [styles.flexContainer]: isFlexContainer,
      })}
    >
      {children}
    </div>
  );
};
