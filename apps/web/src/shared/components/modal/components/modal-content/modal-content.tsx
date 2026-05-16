import clsx from 'clsx';
import styles from './modal-content.module.css';

type Theme = 'light' | 'dark';
type Size = 'form' | 'video' | 'message';

type ModalContentProps = {
  children: React.ReactNode;
  theme?: Theme;
  withPaddings?: boolean;
  size?: Size;
};

export const ModalContent = ({
  children,
  theme = 'light',
  withPaddings = true,
  size = 'form',
}: ModalContentProps) => {
  return (
    <div
      className={clsx(
        styles.content,
        styles[theme],
        styles[size],
        withPaddings && styles.withPaddings,
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};
