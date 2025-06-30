import styles from './dates.module.css';
import { ReleaseDate } from '../release-date/release-date';

type DatesProps = {
  releaseDate: string;
  finishedAt?: string;
};

export const Dates = ({ releaseDate, finishedAt }: DatesProps) => {
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
