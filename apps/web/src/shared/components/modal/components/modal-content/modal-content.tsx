import clsx from 'clsx';
import styles from './modal-content.module.css';
import { defineCssProperties } from '~/shared/helpers';

type Theme = 'light' | 'dark';

type ModalContentProps = {
  children: React.ReactNode;
  size?: Partial<{
    maxWidth: string;
    maxHeight: string;
  }>;
  theme?: Theme;
  withPaddings?: boolean;
};

export const ModalContent = ({
  children,
  theme = 'light',
  size,
  withPaddings = true,
}: ModalContentProps) => {
  return (
    <div
      className={clsx(styles.content, styles[theme], withPaddings && styles.withPaddings)}
      style={defineCssProperties({
        '--modal-content-max-width': size?.maxWidth,
        '--modal-content-max-height': size?.maxHeight,
      })}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};
