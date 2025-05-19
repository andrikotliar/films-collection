import classNames from 'classnames';
import { XIcon } from 'lucide-react';
import { FC } from 'react';
import styles from './modal-close-button.module.css';

type ModalCloseButtonProps = {
  className?: string;
  onClick: VoidFunction;
};

export const ModalCloseButton: FC<ModalCloseButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.closeButton, className)}
    >
      <XIcon size={15} />
    </button>
  );
};
