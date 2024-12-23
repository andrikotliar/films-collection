import { FC } from 'react';
import styles from './LogoDecoration.module.css';

type LogoDecorationProps = {
  src: string;
  title: string;
};

export const LogoDecoration: FC<LogoDecorationProps> = ({ src, title }) => {
  return (
    <div className={styles.wrapper}>
      <img src={src} className={styles.decorationImage} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};
