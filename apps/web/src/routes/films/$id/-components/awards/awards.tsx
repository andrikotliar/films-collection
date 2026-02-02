import styles from './awards.module.css';
import { type api, type ApiResponse } from '~/shared';
import { Award } from '~/routes/films/$id/-components/awards/components';

type AwardsProps = {
  data: ApiResponse<typeof api.films.get>['awards'];
};

export const Awards = ({ data }: AwardsProps) => {
  return (
    <div className={styles.awards}>
      <h2 className={styles.title}>Awards</h2>
      <div className={styles.grid}>
        {data.map((award) => (
          <Award data={award} key={award.award.id} />
        ))}
      </div>
    </div>
  );
};
