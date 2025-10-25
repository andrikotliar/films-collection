import classNames from 'classnames';
import { type PropsWithChildren } from 'react';
import styles from './styles.module.css';

type Props = {
  hasPaddings?: boolean;
  isFlexContainer?: boolean;
};

export const Panel = ({
  children,
  hasPaddings = true,
  isFlexContainer = false,
}: PropsWithChildren<Props>) => {
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
