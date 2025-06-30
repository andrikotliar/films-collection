import styles from './logo-decoration.module.css';
import { Link } from '@tanstack/react-router';
import { Image } from '@/components/image/image';

type LogoDecorationProps = {
  src: string;
  title: string;
  collectionId: number;
};

export const LogoDecoration = ({
  src,
  title,
  collectionId,
}: LogoDecorationProps) => {
  return (
    <Link
      to="/"
      search={{ collectionId: String(collectionId) }}
      className={styles.wrapper}
    >
      <Image src={src} className={styles.decorationImage} isExternal />
      <div className={styles.title}>{title}</div>
    </Link>
  );
};
