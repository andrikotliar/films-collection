import clsx from 'clsx';
import styles from './modal-content.module.css';

type ModalContentProps = {
  children: React.ReactNode;
  className?: string;
};

export const ModalContent = ({ children, className }: ModalContentProps) => {
  return (
    <div className={clsx(styles.content, className)} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
