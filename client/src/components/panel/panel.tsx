import classNames from 'classnames';
import { ReactNode } from 'react';
import styles from './panel.module.css';

type PanelProps = {
  children?: ReactNode;
  hasPaddings?: boolean;
  isFlexContainer?: boolean;
};

export const Panel = ({
  children,
  hasPaddings = true,
  isFlexContainer = false,
}: PanelProps) => {
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
