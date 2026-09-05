import { type api, type ApiResponse } from '~/shared';
import { Award } from './components';
import styles from './awards.module.css';
import { ContentLayout } from '~/routes/film/$id/-components/content-layout/content-layout';

type Awards = ApiResponse<typeof api.films.getById>['awards'];

type AwardsProps = {
  data: Awards;
};

export const Awards = ({ data }: AwardsProps) => {
  return (
    <ContentLayout>
      <div className={styles.awards}>
        <div className={styles.title}>Awards</div>
        {data.map((award) => (
          <Award data={award} key={award.award.id} />
        ))}
      </div>
    </ContentLayout>
  );
};
