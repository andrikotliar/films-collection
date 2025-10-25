import classNames from 'classnames';
import { XIcon } from 'lucide-react';
import styles from './styles.module.css';

type ModalCloseButtonProps = {
  className?: string;
  onClick: VoidFunction;
};

export const ModalCloseButton = ({ onClick, className }: ModalCloseButtonProps) => {
  return (
    <button onClick={onClick} className={classNames(styles.closeButton, className)}>
      <XIcon size={15} />
    </button>
  );
};
