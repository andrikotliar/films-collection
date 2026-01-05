import { Nomination } from '~/routes/films/$id/-components/awards/components/nomination/nomination';
import styles from './award.module.css';
import { type api, type ApiResponse } from '~/shared';
import { TrophyIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';

type AwardProps = {
  data: ApiResponse<typeof api.films.get>['awards'][number];
};

export const Award = ({ data }: AwardProps) => {
  return (
    <div className={styles.award_wrapper}>
      <Link to="/" search={{ awardId: data.award.id }} className={styles.award}>
        <TrophyIcon className={styles.award_icon} />
        <span className={styles.award_title}>{data.award.title}</span>
      </Link>
      <div className={styles.nominations_wrapper}>
        {data.nominations.map((nomination) => (
          <Nomination
            title={nomination.title}
            comment={nomination.comment}
            nominee={nomination.person}
            key={nomination.title}
          />
        ))}
      </div>
    </div>
  );
};
