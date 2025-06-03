import { FC } from 'react';
import styles from './poster.module.css';
import { Image } from '@/components';

type MediaProps = {
  image: string;
  title: string;
};

export const Poster: FC<MediaProps> = ({ image, title }) => {
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
