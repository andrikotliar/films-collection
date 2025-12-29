import styles from './awards.module.css';
import { Link } from '@tanstack/react-router';
import { Nomination } from '~/routes/films/$id/-components/awards/components';
import type { api, ExtractResponseType } from '~/shared';

type AwardsProps = {
  data: ExtractResponseType<typeof api.films.get>['awards'];
};

export const Awards = ({ data }: AwardsProps) => {
  return (
    <div className={styles.awards}>
      {data.map(({ award, nominations }) => (
        <div key={award.id} className={styles.award_grid}>
          <div>
            <h3 className={styles.award_title}>
              <Link to="/" search={{ awardId: award.id }}>
                {award.title}
              </Link>
            </h3>
            <p className={styles.nominations_count}>
              {nominations.length} nomination
              {nominations.length > 1 && 's'}
            </p>
          </div>
          <div className={styles.nominations_list}>
            {nominations.map(({ title, person, comment }, index) => (
              <Nomination title={title} key={index} nominee={person} comment={comment} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
