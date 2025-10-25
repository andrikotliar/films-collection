import styles from './styles.module.css';
import { XCircleIcon } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

type Props = {
  label: string;
  title: string;
  description?: string | null;
};

export const InfoBlock = ({ label, title, description }: Props) => {
  const navigate = useNavigate();

  const handleClearFilter = () => {
    navigate({ to: '/', replace: true });
  };

  return (
    <div className={styles.infoBlock}>
      <div className={styles.data}>
        <div className={styles.label}>{label}</div>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <button className={styles.removeButton} onClick={handleClearFilter}>
        <XCircleIcon size={20} />
      </button>
    </div>
  );
};
