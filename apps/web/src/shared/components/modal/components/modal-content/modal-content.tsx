import clsx from 'clsx';
import styles from './modal-content.module.css';

type Theme = 'light' | 'dark';
type Size = 'form' | 'video' | 'message';

type ModalContentProps = {
  children: React.ReactNode;
  theme?: Theme;
  withPaddings?: boolean;
  size?: Size;
  flex?: boolean;
};

export const ModalContent = ({
  children,
  theme = 'light',
  withPaddings = true,
  size = 'form',
  flex,
}: ModalContentProps) => {
  return (
    <div
      className={clsx(
        styles.content,
        styles[theme],
        styles[size],
        withPaddings && styles.withPaddings,
        flex && styles.flex,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};
