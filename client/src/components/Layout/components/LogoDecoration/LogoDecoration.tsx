import { FC } from 'react';
import styles from './LogoDecoration.module.css';
import { Link } from '@tanstack/react-router';

type LogoDecorationProps = {
  src: string;
  title: string;
  collectionId: string;
};

export const LogoDecoration: FC<LogoDecorationProps> = ({
  src,
  title,
  collectionId,
}) => {
  return (
    <Link
      to="/"
      search={{ collection: collectionId }}
      className={styles.wrapper}
    >
      <img src={src} className={styles.decorationImage} />
      <div className={styles.title}>{title}</div>
    </Link>
  );
};
