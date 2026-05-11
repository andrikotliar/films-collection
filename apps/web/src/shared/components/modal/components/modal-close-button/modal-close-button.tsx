import { XIcon } from 'lucide-react';
import styles from './modal-close-button.module.css';
import { defineCssProperties } from '~/shared/helpers';

type ModalCloseButtonProps = {
  onClick: VoidFunction;
  position?: Partial<{
    top: string;
    right: string;
  }>;
};

export const ModalCloseButton = ({ onClick, position }: ModalCloseButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={styles.close_button}
      style={defineCssProperties({
        '--close-button-top-position': position?.top,
        '--close-button-right-position': position?.right,
      })}
    >
      <XIcon size={15} />
    </button>
  );
};
