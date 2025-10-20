import styles from './styles.module.css';
import { Link } from '@tanstack/react-router';
import type { FilmAward } from '~/common';
import { Nomination } from '~/routes/films/-components/awards/components';

type AwardsProps = {
  data: FilmAward[];
};

export const Awards = ({ data }: AwardsProps) => {
  return (
    <div className={styles.awards}>
      {data.map(({ award, nominations }) => (
        <div key={award.id} className={styles.award_grid}>
          <div>
            <h3 className={styles.award_title}>
              <Link to="/" search={{ awardId: String(award.id) }}>
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
