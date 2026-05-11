import styles from './modal-content.module.css';

type ModalContentProps = {
  children: React.ReactNode;
  size?: Partial<{
    maxWidth: string;
    maxHeight: string;
  }>;
};

export const ModalContent = ({ children }: ModalContentProps) => {
  return (
    <div className={styles.content} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
