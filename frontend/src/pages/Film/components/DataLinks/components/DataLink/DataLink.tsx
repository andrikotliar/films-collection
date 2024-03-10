import { DataLinkType } from '@/common';
import { FC } from 'react';
import { buildLink } from '@/helpers';
import { Link } from 'react-router-dom';
import styles from './DataLink.module.css';

type Props = DataLinkType;

const DataLink: FC<Props> = ({ property, value, suffix }) => {
  return (
    <Link to={buildLink(property, value)} className={styles.dataLink}>
      {value} {suffix}
    </Link>
  );
};

export { DataLink };
