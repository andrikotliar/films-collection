import styles from './poster.module.css';
import { Image } from '@/components';

type PosterProps = {
  image: string;
  title: string;
};

export const Poster = ({ image, title }: PosterProps) => {
  return (
    <div className={styles.poster}>
      <Image
        isExternal
        src={image}
        alt={`Poster of "${title}"`}
        className={styles.image}
      />
    </div>
  );
};
