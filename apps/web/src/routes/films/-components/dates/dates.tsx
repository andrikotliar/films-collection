import styles from './styles.module.css';
import { ReleaseDate } from '../release-date/release-date';

type Props = {
  releaseDate: string;
  finishedAt?: string;
};

export const Dates = ({ releaseDate, finishedAt }: Props) => {
  return (
    <div className={styles.dates}>
      <ReleaseDate value={releaseDate} />
      {typeof finishedAt === 'string' && (
        <>
          <span>—</span>
          <ReleaseDate value={finishedAt} />
        </>
      )}
    </div>
  );
};
