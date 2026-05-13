import { XIcon } from 'lucide-react';
import styles from './modal-close-button.module.css';

type ModalCloseButtonProps = {
  onClick: VoidFunction;
};

export const ModalCloseButton = ({ onClick }: ModalCloseButtonProps) => {
  return (
    <button onClick={onClick} className={styles.close_button}>
      <XIcon size={15} />
    </button>
  );
};
