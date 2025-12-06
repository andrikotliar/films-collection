import clsx from 'clsx';
import { type PropsWithChildren } from 'react';
import styles from './panel.module.css';

type PanelProps = {
  hasPaddings?: boolean;
  isFlexContainer?: boolean;
};

export const Panel = ({
  children,
  hasPaddings = true,
  isFlexContainer = false,
}: PropsWithChildren<PanelProps>) => {
  return (
    <div
      className={clsx(styles.panel, {
        [styles.panel_with_padding]: hasPaddings,
        [styles.flex_container]: isFlexContainer,
      })}
    >
      {children}
    </div>
  );
};
