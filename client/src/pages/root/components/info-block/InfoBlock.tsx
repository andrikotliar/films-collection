import { FC } from 'react';
import styles from './InfoBlock.module.css';
import { XCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type InfoBlockProps = {
  imagePath?: string;
  imageAlt?: string;
  label: string;
  title: string;
  description?: string;
};

const InfoBlock: FC<InfoBlockProps> = ({
  imagePath,
  imageAlt,
  label,
  title,
  description,
}) => {
  const navigate = useNavigate();

  const handleClearFilter = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.wrapper}>
      {imagePath && (
        <img src={imagePath} alt={imageAlt} className={styles.image} />
      )}
      <div className={styles.data}>
        <div className={styles.label}>{label}</div>
        <h2 className={styles.title}>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <button className={styles.removeButton} onClick={handleClearFilter}>
        <XCircleIcon size={20} />
      </button>
    </div>
  );
};

export { InfoBlock };
