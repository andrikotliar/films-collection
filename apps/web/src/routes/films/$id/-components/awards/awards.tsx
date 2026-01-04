import { TrophyIcon } from 'lucide-react';
import styles from './awards.module.css';
import { Link } from '@tanstack/react-router';
import { type api, type ApiResponse } from '~/shared';
import { Nomination } from '~/routes/films/$id/-components/awards/components';

type AwardsProps = {
  data: ApiResponse<typeof api.films.get>['awards'];
};

export const Awards = ({ data }: AwardsProps) => {
  return (
    <div className={styles.awards}>
      {data.map((award) => (
        <div key={award.award.id} className={styles.award_wrapper}>
          <Link to="/" search={{ awardId: award.award.id }} className={styles.award}>
            <TrophyIcon className={styles.award_icon} />
            <span className={styles.award_title}>{award.award.title}</span>
            <span className={styles.nominations_count}>{award.nominations.length}</span>
          </Link>
          <div className={styles.nominations_wrapper}>
            {award.nominations.map((nomination) => (
              <Nomination
                title={nomination.title}
                comment={nomination.comment}
                nominee={nomination.person}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
