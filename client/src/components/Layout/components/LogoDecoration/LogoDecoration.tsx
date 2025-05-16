import { FC } from 'react';
import styles from './LogoDecoration.module.css';
import { Link } from '@tanstack/react-router';
import { Image } from '@/components/Image/Image';

type LogoDecorationProps = {
  src: string;
  title: string;
  collectionId: number;
};

export const LogoDecoration: FC<LogoDecorationProps> = ({
  src,
  title,
  collectionId,
}) => {
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
