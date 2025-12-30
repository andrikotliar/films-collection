import type { api, ApiResponse } from '~/shared';
import styles from './cast-and-crew.module.css';

import { RoleItem } from '~/routes/films/$id/-components/cast-and-crew/components';

type CastAndCrewProps = {
  data: ApiResponse<typeof api.films.get>['castAndCrew'];
};

export const CastAndCrew = ({ data }: CastAndCrewProps) => {
  return (
    <div className={styles.wrapper}>
      {data.map((personData) => (
        <RoleItem data={personData} key={personData.role} />
      ))}
    </div>
  );
};
