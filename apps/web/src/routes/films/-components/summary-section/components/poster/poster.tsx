import styles from './styles.module.css';
import { Image } from '~/common';

type Props = {
  image: string;
  title: string;
};

export const Poster = ({ image, title }: Props) => {
  return (
    <div className={styles.poster}>
      <Image isExternal src={image} alt={`Poster of "${title}"`} />
    </div>
  );
};
