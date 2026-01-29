import clsx from 'clsx';
import styles from './panel.module.css';

type PanelProps = {
  hasPaddings?: boolean;
  isFlexContainer?: boolean;
  children?: React.ReactNode;
};

export const Panel = ({ children, hasPaddings = true, isFlexContainer = false }: PanelProps) => {
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
